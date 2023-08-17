from fastapi import FastAPI, HTTPException
from langchain.chat_models import ChatOpenAI
from uuid import UUID, uuid4
from app.models import User, Chat, Product
from app.utils import process_product_item_data
from engine.agents import WalBotGPT
from engine.search import search_product_by_name

app = FastAPI()
active_sessions = {}


@app.get("/start/user/{user_id}")
async def user_login(user_id: UUID):
    session_id = str(uuid4())
    return {
        "sessionId": session_id
    }


@app.post("/seed/user/{user_id}/session/{session_id}")
async def initiate_user_new_session(user_id: UUID, session_id: UUID, user: User):
    llm = ChatOpenAI(temperature=user.temperature)
    if (user_id, session_id) in active_sessions:
        del active_sessions[(user_id, session_id)]
    active_sessions[(user_id, session_id)] = WalBotGPT.from_llm(
        llm = llm,
        verbose = False,
    )
    agent_response = active_sessions[(user_id, session_id)].seed_agent()
    print(f"current active sessions: \n{active_sessions}")
    return {
        "agentUtterance": agent_response
    }


@app.post("/reply/user/{user_id}/session/{session_id}")
async def get_agent_reply(user_id: UUID, session_id: UUID, chat: Chat):
    if (user_id, session_id) not in active_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    user_message = chat.userUtterance
    active_sessions[(user_id, session_id)].human_step(user_message)
    agent_response, product_names = active_sessions[(user_id, session_id)].step()
    return {
        "agentUtterance": agent_response,
        "productSearchNames" : product_names 
    }

@app.post("/search")
async def search_products_by_name(product: Product):
    product_search_name = product.searchName
    product_data, review_data = search_product_by_name(product_search_name)
    product_list = process_product_item_data(product_data, review_data)
    return {
        "productItemsList": product_list
    }

@app.post("/ask/product/{product_id}")
async def ask_question_for_product(product_id: str, chat: Chat):
    answer = "test3"
    return {
        "agent_utterance": answer
    }

@app.get("/review/product/{product_id}")
async def get_product_overall_review(product_id: str):
    review = "test4"
    return {
        "agent_utterance": review
    }

@app.get("/compare/product1/{product_id_1}/product2/{product_id_2}")
async def compare_two_products(product_id_1: str, product_id_2: str):
    comparison = "test5"
    return {
        "agent_utterance": comparison
    }