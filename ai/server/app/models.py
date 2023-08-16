from pydantic import BaseModel


class User(BaseModel):
    first_name: str

class Chat(BaseModel):
    user_utterance: str
    temperature: int = 0.5

class Product(BaseModel):
    product_name: str