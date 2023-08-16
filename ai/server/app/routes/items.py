from fastapi import APIRouter
from app.models.item import Item

router = APIRouter()

@router.post("/")
async def create_item(item: Item):
    item_name = item.name
    return {"message": "item created successfully", "name": item_name}
