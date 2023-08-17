from pydantic import BaseModel


class User(BaseModel):
    firstName: str = "John"
    temperature: int = 0.7

class Chat(BaseModel):
    userUtterance: str

class Product(BaseModel):
    searchName: str