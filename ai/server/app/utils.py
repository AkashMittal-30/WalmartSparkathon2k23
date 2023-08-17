


def process_product_item_data(
        product_data: list[dict], 
        review_data: list[dict]
    ) -> list[dict]:

    return_list = []
    for item in product_data:
        price = item.get("currentPrice")
        if price is None:
            price = item.get("printPrice")
        item_info = {
            "id": item.get("id"),
            "type": item.get("type"),
            "name": item.get("name"),
            "brand": item.get("brand"),
            "price": price,
            "currency": item.get("currencyUnit"),
            "rating": item.get("averageOverallRating"),
            "imageUrl": item.get("thumbnailUrl"),
            "pageUrl": item.get("url")
        }
        return_list.append(item_info)
    return return_list