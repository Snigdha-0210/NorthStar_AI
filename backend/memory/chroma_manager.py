import os
import chromadb
from chromadb.config import Settings
from typing import List

# Initialize Chroma Cloud Client
# We use the tenant and database configurations provided by the user.
def get_chroma_client():
    api_key = os.getenv("CHROMA_API_KEY")
    if not api_key:
        raise ValueError("CHROMA_API_KEY environment variable is missing.")

    client = chromadb.HttpClient(
        host=os.getenv("CHROMA_HOST", "api.trychroma.com"),
        headers={"x-chroma-token": api_key},
        tenant=os.getenv("CHROMA_TENANT", "default_tenant"),
        database=os.getenv("CHROMA_DATABASE", "default_database"),
        settings=Settings(anonymized_telemetry=False)
    )
    return client

class MemoryManager:
    def __init__(self, collection_name: str = "user_memory"):
        self.client = get_chroma_client()
        # Create or get collection
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )

    def add_memory(self, user_id: str, document: str, metadata: dict = None, chunk_id: str = None):
        """
        Adds a single memory chunk to Chroma Cloud.
        """
        if not metadata:
            metadata = {}
        metadata["user_id"] = user_id
        
        # Use provided chunk_id or generate one
        if not chunk_id:
            import uuid
            chunk_id = str(uuid.uuid4())

        self.collection.add(
            documents=[document],
            metadatas=[metadata],
            ids=[chunk_id]
        )

    def retrieve_user_memory(self, user_id: str, query: str, n_results: int = 5) -> List[str]:
        """
        Retrieves relevant memory for a specific user using dense search.
        For hybrid search with Chroma Cloud Splade/Qwen, appropriate embedding functions would be registered.
        """
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results,
            where={"user_id": user_id}
        )
        
        if results and results["documents"] and len(results["documents"]) > 0:
            return results["documents"][0]
        return []

memory_manager = MemoryManager()
