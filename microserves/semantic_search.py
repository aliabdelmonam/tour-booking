from pinecone import Pinecone
from fastapi import FastAPI
from pydantic import BaseModel
# Initialize Pinecone


app = FastAPI()

pc = Pinecone(api_key="pcsk_3SVALu_3KiyxeVKQcWDFYGu36PPRgmeXXUzQQJgz1jaau4oASexr3DT35mFBvxiVD5HoZD")

# Connect to your index
index = pc.Index("semantic-search")

class ReviewRequest(BaseModel):
    review: str
    user_id: str
    rating: int

@app.post('/upsert_review')
def upsert_review_to_pinecone(payload: ReviewRequest):
    try:
        record_id = f"{payload.user_id}_review_id"  # This is your ID
        index.upsert_records(
            "",  # namespace argument, empty string if no namespace
            records=[{
            "id" : record_id,
            "text": payload.review,  # Changed key from 'review' to 'text' to match Pinecone field mapping
            "rating": payload.rating,
            "type" : 'review'
            }]
        )
        print("Upsert successful!")
    except Exception as e:
        print("5555555 Error during upsert:", e)

"""
how to run this code:
uvicorn semantic_search:app --host 0.0.0.0 --port 8000 --reload
port 8000 is important as it reflects the port and its used in reviewController.js
"""