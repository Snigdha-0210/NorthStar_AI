import os
import sys
import chromadb
from chromadb import Schema, SparseVectorIndexConfig, K
from chromadb.utils.embedding_functions import ChromaCloudSpladeEmbeddingFunction
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env.local'))

def migrate():
    print("Starting ChromaDB Migration to Chroma Cloud...")
    
    # 1. Connect to Local Chroma (Source)
    # Assuming local chroma is running on localhost:8000
    try:
        local_client = chromadb.HttpClient(host="localhost", port=8000)
        local_collection = local_client.get_collection("user_memory")
        print("Connected to local ChromaDB.")
    except Exception as e:
        print(f"Could not connect to local ChromaDB. It may be empty or not running: {e}")
        return

    # 2. Connect to Chroma Cloud (Destination)
    api_key = os.getenv("CHROMA_API_KEY")
    if not api_key:
        print("CHROMA_API_KEY is missing. Cannot migrate to Cloud.")
        return
        
    cloud_client = chromadb.CloudClient(
        tenant=os.getenv("CHROMA_TENANT", "default_tenant"),
        database=os.getenv("CHROMA_DATABASE", "default_database"),
        api_key=api_key
    )
    print("Connected to Chroma Cloud.")

    # 3. Setup Schema with Sparse Embeddings
    schema = Schema()
    sparse_ef = ChromaCloudSpladeEmbeddingFunction(api_key=api_key)
    schema.create_index(
        config=SparseVectorIndexConfig(
            source_key=K.DOCUMENT,
            embedding_function=sparse_ef
        ),
        key="sparse_embedding"
    )

    cloud_collection = cloud_client.get_or_create_collection(
        name="user_memory",
        schema=schema
    )
    print("Cloud collection 'user_memory' initialized with hybrid search schema.")

    # 4. Fetch and Migrate Data
    data = local_collection.get()
    
    if not data or not data["documents"]:
        print("No documents found in local collection to migrate.")
        return

    docs = data["documents"]
    metadatas = data["metadatas"]
    ids = data["ids"]
    
    print(f"Migrating {len(docs)} documents...")
    
    # Implement Chunking Strategy for long documents (>16KB)
    # In this basic migration, we assume docs are already chunked or small enough.
    # We add them to cloud collection. Sparse embeddings are automatically generated.
    
    batch_size = 100
    for i in range(0, len(docs), batch_size):
        batch_docs = docs[i:i+batch_size]
        batch_meta = metadatas[i:i+batch_size]
        batch_ids = ids[i:i+batch_size]
        
        # Ensure 'source_document_id' is in metadata for GroupBy deduplication later
        for meta, doc_id in zip(batch_meta, batch_ids):
            if "source_document_id" not in meta:
                meta["source_document_id"] = doc_id

        cloud_collection.add(
            documents=batch_docs,
            metadatas=batch_meta,
            ids=batch_ids
        )
        print(f"Migrated batch {i//batch_size + 1}")

    print("Migration complete!")

if __name__ == "__main__":
    migrate()
