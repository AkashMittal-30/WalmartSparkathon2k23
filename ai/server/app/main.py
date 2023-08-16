from fastapi import FastAPI, HTTPException
from uuid import UUID, uuid4
from app.models import User, Chat, Product

app = FastAPI()



@app.get("/start/user/{user_id}")
async def user_login(user_id: UUID):
    """
    creates a user login event
    if user is already logged in, returns the current session_id
    if user is not logged in, then logs in the user and returns a fresh session_id
    """
    session_id = str(uuid4())
    return {
        "session_id": session_id
    }

@app.post("/seed/user/{user_id}/session/{session_id}")
async def initiate_user_new_session(user_id: UUID, session_id: UUID, user: User):
    ai_utterance = "test1"
    return {
        "ai_utterance": ai_utterance
    }


@app.post("/reply/user/{user_id}/session/{session_id}")
async def get_bot_reply(user_id: UUID, session_id: UUID, chat: Chat):
    reply = "test2"
    product_names = []
    return {
        "ai_utterance": reply,
        "product_names" : product_names 
    }

@app.post("/search")
async def search_products_by_name(product: Product):
    return {
        "products_list": []
    }

@app.post("/ask/product/{product_id}")
async def ask_question_for_product(product_id: str, chat: Chat):
    answer = "test3"
    return {
        "ai_utterance": answer
    }

@app.get("/review/product/{product_id}")
async def get_product_overall_review(product_id: str):
    review = "test4"
    return {
        "ai_utterance": review
    }

@app.get("/compare/product1/{product_id_1}/product2/{product_id_2}")
async def compare_two_products(product_id_1: str, product_id_2: str):
    comparison = "test5"
    return {
        "ai_utterance": comparison
    }