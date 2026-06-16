import os
import chromadb
from chromadb import Schema, SparseVectorIndexConfig, K, Search, Knn, Rrf
from chromadb.utils.embedding_functions import ChromaCloudSpladeEmbeddingFunction
import uuid
from typing import List

def get_chroma_client():
    api_key = os.getenv("CHROMA_API_KEY", "")
    
    # We use CloudClient instead of HttpClient for Chroma Cloud
    client = chromadb.CloudClient(
        tenant=os.getenv("CHROMA_TENANT", "default_tenant"),
        database=os.getenv("CHROMA_DATABASE", "default_database"),
        api_key=api_key
    )
    return client

class MemoryManager:
    def __init__(self, collection_name: str = "user_memory"):
        self.client = get_chroma_client()
        self.collection_name = collection_name
        
        # Define Schema with Sparse Vector Index for Hybrid Search
        self.schema = Schema()
        try:
            sparse_ef = ChromaCloudSpladeEmbeddingFunction(api_key=os.getenv("CHROMA_API_KEY", ""))
            self.schema.create_index(
                config=SparseVectorIndexConfig(
                    source_key=K.DOCUMENT,
                    embedding_function=sparse_ef
                ),
                key="sparse_embedding"
            )
        except Exception as e:
            print(f"Warning: Could not initialize sparse embedding function: {e}")

        # Create or get collection
        try:
            self.collection = self.client.get_or_create_collection(
                name=self.collection_name,
                schema=self.schema
            )
        except Exception as e:
            print(f"Warning: Could not initialize Chroma collection: {e}")
            self.collection = None

    def add_memory(self, user_id: str, document: str, metadata: dict = None, chunk_id: str = None):
        """Adds a single memory chunk to Chroma Cloud."""
        if not self.collection:
            return
            
        if not metadata:
            metadata = {}
        metadata["user_id"] = user_id
        
        if not chunk_id:
            chunk_id = str(uuid.uuid4())

        self.collection.add(
            documents=[document],
            metadatas=[metadata],
            ids=[chunk_id]
        )

    def retrieve_user_memory(self, user_id: str, query: str, n_results: int = 5) -> List[str]:
        """Retrieves relevant memory for a specific user using Hybrid Search with RRF."""
        if not self.collection:
            return []
            
        # Hybrid Search with RRF (Dense + Sparse)
        hybrid_rank = Rrf(
            ranks=[
                Knn(query=query, return_rank=True, limit=50), # Dense semantic search
                Knn(query=query, key="sparse_embedding", return_rank=True, limit=50) # Sparse keyword search
            ],
            weights=[0.7, 0.3], # 70% semantic, 30% keyword
            k=60
        )
        
        search = (Search()
            .where(K("user_id") == user_id)
            .rank(hybrid_rank)
            .limit(n_results)
            .select(K.DOCUMENT, K.SCORE)
        )
        
        try:
            results = self.collection.search(search)
            if not results or not results.rows():
                return []
            rows = results.rows()[0]
            return [row['document'] for row in rows]
        except Exception as e:
            print(f"Hybrid search failed: {e}")
            return []

memory_manager = MemoryManager()
