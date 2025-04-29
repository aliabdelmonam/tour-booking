from fastapi.encoders import jsonable_encoder
from pinecone import Pinecone
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
# from fastapi.encoders import jsonable_encoder
from fastapi import Query
import os
from dotenv import load_dotenv
from pathlib import Path

# Initialize Pinecone


app = FastAPI()
parent_dir = Path(__file__).parent.parent
env_path = parent_dir / "config.env"
load_dotenv(dotenv_path=env_path)
pc = Pinecone(api_key=os.getenv("PINE_CONE_API"))

# Connect to your index
index = pc.Index("semantic-search")

class ReviewRequest(BaseModel):
    review: str
    user_id: str
    rating: int

@app.post('/upsert_review')
async def upsert_review_to_pinecone(payload: ReviewRequest):
    try:
        record_id = f"{payload.user_id}_review_id"  # This is your ID
        combined_text =f"{payload.review} {payload.rating}"
        index.upsert_records(
            "",  # namespace argument, empty string if no namespace
            records=[{
            "id" : record_id,
            "text": combined_text,  # Changed key from 'review' to 'text' to match Pinecone field mapping
            "rating": payload.rating,
            "type" : 'review'
            }]
        )
        print("Upsert successful!")
    except Exception as e:
        print("Error during upsert:", e)

"""
how to run this code:
uvicorn semantic_search:app --host 0.0.0.0 --port 8000 --reload
port 8000 is important as it reflects the port and its used in reviewController.js
"""

class TourRequest(BaseModel):
    name: str
    description: str
    duration: int
    guide: str
    tour_id: str
@app.post('/upsert_tour')
async def upsert_tour_to_pinecone(payload: TourRequest):
    try:
        record_id = f"{payload.tour_id}_tour_id"  # This is your ID
        # print("record_id", record_id)
        combined_text =f"{payload.name} {payload.description} {payload.duration}  {payload.guide}"
        index.upsert_records(
            "",  # namespace argument, empty string if no namespace
            records=[{
            "id" : record_id,
            "text": combined_text,  # Changed key from 'review' to 'description' to match Pinecone field mapping
            "duration": payload.duration,
            "guide": payload.guide,
            "type" : 'tour'
            }]
        )
        print("Upsert successful!")
    except Exception as e:
        print("Error during upsert:", e)



class UserRequest(BaseModel):
    name: str
    dateOdBirth: str
    nationality: str
    residence : str
    email: str
    user_id: str
@app.post('/upsert_user')
async def upsert_user_to_pinecone(payload: UserRequest):
    try:
        record_id = f"{payload.user_id}_user_id"  # This is your ID
        # print("record_id", record_id)
        combined_text =f"{payload.name} {payload.dateOdBirth} {payload.nationality} {payload.residence} {payload.email}"
        print("combined_text", combined_text)
        index.upsert_records(
            "",  # namespace argument, empty string if no namespace
            records=[{
            "id" : record_id,
            "text": combined_text,
            "name": payload.name,  # Changed key from 'description' to 'name' to match Pinecone field mapping
            "dateOdBirth": payload.dateOdBirth,
            "nationality": payload.nationality,
            "residence": payload.residence,
            "email": payload.email,
            "type" : 'user'
            }]
        )
        print("Upsert successful!")
    except Exception as e:
        print("Error during upsert:", e)



class QueryRequest(BaseModel):
    query: str
    type: Optional[str] = None  # 'review', 'tour', or 'user'
@app.get('/search')
async def search_pinecone(query: str = Query(...), type: Optional[str] = Query(None)):
    # search?query=europe
    try:
        print(f"Received search query: {query}")
        filter = {"type": type} if type else {}

        results =  index.search(
            namespace="", 
            query={
                "inputs": {"text": query},
                "top_k": 5,
                "filter": filter
            },
        )
    
        results = results.to_dict()
        return {
            "status":"success", 
           "data": results,
        }

    except Exception as e:
        print(f"Error in search_pinecone: {e}")
        return {"error": str(e)}
