import os
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlencode


def create_walmart_product_search_page_url(key_word: str, page_num: int):
    payload = {'q': key_word, 'sort': 'best_seller', 'page': page_num, 'affinityOverride': 'default'}
    return 'https://www.walmart.com/search?' + urlencode(payload)

def create_walmart_product_item_page_url(product):
    return 'https://www.walmart.com' + product.get('canonicalUrl', '').split('?')[0]

def get_proxy_url(url, residential='false'):
    payload = {'api_key': os.environ.get('SCRAPEOPS_API_KEY'), 'url': url, 'residential': residential, 'country': 'us'}
    proxy_url = 'https://proxy.scrapeops.io/v1/?' + urlencode(payload)
    return proxy_url

headers={"User-Agent": "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"}

def get_product_url_list(product_keyword: str, num_pages: int = 1) -> list:
    product_url_list = []
    for page in range(1, num_pages+1):
        try:
            walmart_search_url = create_walmart_product_search_page_url(product_keyword, page)
            print(f"scraping page {page} at url: {walmart_search_url}")
            response = requests.get(get_proxy_url(walmart_search_url, residential='true'))
            # print(response)
            if response.status_code == 200:
                html_response = response.text
                soup = BeautifulSoup(html_response, "html.parser")
                script_tag = soup.find("script", {"id": "__NEXT_DATA__"})
                if script_tag is not None:
                    json_blob = json.loads(script_tag.get_text())
                    product_list = json_blob["props"]["pageProps"]["initialData"]["searchResult"]["itemStacks"][0]["items"]
                    product_urls = [create_walmart_product_item_page_url(product) for product in product_list]
                    product_url_list.extend(product_urls)
                    if len(product_urls) == 0:
                        break
            else:
                print(response.status_code)
        except Exception as ex:
            print("Error: ", ex)

    return product_url_list

def get_review_data(review_item: dict, product_id) -> dict:
    return {
        'id': review_item.get('reviewId'),
        'productId': product_id,
        'rating': review_item.get('rating'),
        'submissionDate': review_item.get('reviewSubmissionTime'),
        'reviewTitle': review_item.get('reviewTitle'),
        'reviewText': review_item.get('reviewText'),
        'reviewAuthor': review_item.get('userNickname')
    }

def get_product_item_data(items_url_list: list, num_items: int = 3):
    product_data_list = []
    review_data_list = []
    for url in items_url_list[:num_items]:
        try:
            print(f"scraping product item data from url: {url}")
            response = requests.get(get_proxy_url(url, residential='false'))
            if response.status_code == 200:
                html_response = response.text
            soup = BeautifulSoup(html_response, "html.parser")
            script_tag = soup.find("script", {"id": "__NEXT_DATA__"})
            if script_tag is not None:
                json_blob = json.loads(script_tag.get_text())
                raw_product_data = json_blob["props"]["pageProps"]["initialData"]["data"]["product"]
                product_id = raw_product_data.get('id') 
                imageInfo = raw_product_data['imageInfo'] if raw_product_data.get('imageInfo') is not None else {}
                priceInfo = raw_product_data['priceInfo'] if raw_product_data.get('priceInfo') is not None else {}
                currentPrice = priceInfo['currentPrice'] if priceInfo.get('currentPrice') is not None else {}
                wasPrice = priceInfo['wasPrice'] if priceInfo.get('wasPrice') is not None else {}
                returnPolicy = raw_product_data['returnPolicy'] if raw_product_data.get('returnPolicy') is not None else {}
                returnWindow = returnPolicy['returnWindow'] if returnPolicy.get('returnWindow') is not None else {}
                product_metadata = {}
                product_metadata.update({
                    'id':  product_id,
                    'url': url,
                    'type':  raw_product_data.get('type'),
                    'name':  raw_product_data.get('name'),
                    'brand':  raw_product_data.get('brand'),
                    'manufacturerName':  raw_product_data.get('manufacturerName'),
                    'sellerName': raw_product_data.get('sellerName'),
                    'sellerAverageRating': raw_product_data.get('sellerAverageRating'),
                    'thumbnailUrl':  imageInfo.get('thumbnailUrl'),
                    'currentPrice':  currentPrice.get('price'),
                    'printPrice': wasPrice.get('price'),
                    'currencyUnit':  wasPrice.get('currencyUnit'),
                    'giftingEligibility': raw_product_data.get('giftingEligibility'),
                    'returnable': returnPolicy.get('returnable'),
                    'returnWindow': returnWindow.get('value'),
                    'returnPolicy': returnPolicy.get('returnPolicyText'),
                })
                raw_review_data = json_blob["props"]["pageProps"]["initialData"]["data"]["reviews"]
                for item in raw_review_data.get('customerReviews', []):
                    review_data_list.append(get_review_data(item, product_id))
                if raw_review_data.get('topPositiveReview') is not None:
                    review_data_list.append(get_review_data(raw_review_data.get('topPositiveReview'), product_id))
                    product_metadata.update({'topPostiveReviewId': raw_review_data['topPositiveReview'].get('reviewId')})
                else:
                    product_metadata.update({'topPostiveReviewId': None})
                if raw_review_data.get('topNegativeReview') is not None:
                    review_data_list.append(get_review_data(raw_review_data.get('topNegativeReview'), product_id))
                    product_metadata.update({'topNegativeReviewId': raw_review_data['topNegativeReview'].get('reviewId')})
                else:
                    product_metadata.update({'topNegativeReviewId': None})
                product_metadata.update({
                    'averageOverallRating': raw_review_data.get('averageOverallRating'),
                    'ratingValueFiveCount': raw_review_data.get('ratingValueFiveCount'),
                    'ratingValueFourCount': raw_review_data.get('ratingValueFourCount'),
                    'ratingValueThreeCount': raw_review_data.get('ratingValueThreeCount'),
                    'ratingValueTwoCount': raw_review_data.get('ratingValueTwoCount'),
                    'ratingValueOneCount': raw_review_data.get('ratingValueOneCount'),
                    'totalReviewCount': raw_review_data.get('totalReviewCount'),
                })
                raw_description_data = json_blob["props"]["pageProps"]["initialData"]["data"]["idml"]
                long_description = raw_description_data.get('longDescription')
                if raw_description_data.get('productHighlights'):
                    full_description = "Product Description: \n" + str(long_description) + "\nProduct Highlights: \n"
                    for item in raw_description_data.get('productHighlights', []):
                        full_description += f"{item.get('name')}: {item.get('value')},\n"
                else:
                    full_description = "Product Description: \n" + str(long_description)
                product_metadata.update({
                    'shortDescription': raw_description_data.get('shortDescription'),
                    'fullDescription': full_description
                })
                product_data_list.append(product_metadata)


        except Exception as ex:
            print('Error: ', ex)

    return product_data_list, review_data_list


def search_product_by_name(product_keyword: str, num_items: int = 8, num_pages: int = 1):
    url_list = get_product_url_list(product_keyword, num_pages)
    product_data_list, review_data_list = get_product_item_data(url_list, num_items)
    return product_data_list, review_data_list