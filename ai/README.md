- FastAPI is used spin up API-server providing endpoints for backend ai services
- Ngrok is used to create secure tunnels to localhost for exposing local servers over the public internet.
- ScrapeOps
- LangChain
- OpenAI


## Run Locally
```bash
cd ai/server
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```


## External APIs Required:
- ngrok : https://dashboard.ngrok.com/get-started/your-authtoken
- scrapeops : https://scrapeops.io/app/dashboard
- openai : https://platform.openai.com/account/api-keys

## REST API Docs

<details>
    <summary><code>GET</code> <code><b>/start/user/{userId}</b></code> <code>(setup event for user with userId)</code></summary>

##### Parameters

> | name     |  type      | data type      | description                                          |
> |----------|------------|----------------|------------------------------------------------------|
> | `userId` |  required  | string         | The specific user unique identifier                  |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | setup successful for the user, returning fresh session id           |
> | `400`         | `application/json`                | `{"code": "400","message": "Bad Request"}`                          |
> | `500`         | `application/json`                | `{"code": "500","message": "Internal Server Error"}`                |
> | `503`         | `application/json`                | `{"code": "503","message": "Service Unavailable"}`                  |

##### Example cURL

```javascript
curl -X GET -H "Content-Type: application/json" http://localhost:8000/start/user/8bf3c61b-3d97-46ba-987d-87cf1060b3ef
```

##### Example response json

```json
{
    "sessionId": "d88f9792-04c7-4837-bfa0-b00fddd9d903"
}
```

</details>

<details>
    <summary><code>POST</code> <code><b>/seed/user/{userId}/session/{sessionId}</b></code> <code>(initiate fresh user session with userId and sessionId)</code></summary>

##### Parameters

> | name        |  type      | data type      | description                                          |
> |-------------|------------|----------------|------------------------------------------------------|
> | `userId`    |  required  | string         | specific user unique identifier                      |
> | `sessionId` |  required  | string         | specific session unique identifier                   |
> | `firstName` |  optional  | string         | first name of the user                               |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | fresh session started successfully for the user, returning introductory bot utterance    |
> | `400`         | `application/json`                | `{"code": "400","message": "Bad Request"}`                          |
> | `500`         | `application/json`                | `{"code": "500","message": "Internal Server Error"}`                |
> | `503`         | `application/json`                | `{"code": "503","message": "Service Unavailable"}`                  |

##### Example cURL

```javascript
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "firstName": "Syed" 
    }' \
    http://localhost:8000/seed/user/8bf3c61b-3d97-46ba-987d-87cf1060b3ef/session/d88f9792-04c7-4837-bfa0-b00fddd9d903
```

##### Example response json

```json
{
    "agentUtterance": "Hi Syed! How may I assist you today?"
}
```

</details>

<details>
    <summary><code>POST</code> <code><b>/reply/user/{userId}/session/{sessionId}</b></code> <code>(reply to the previous ai utterance in the conversation with a user utterance)</code></summary>

##### Parameters

> | name            |  type      | data type      | description                                          |
> |-----------------|------------|----------------|------------------------------------------------------|
> | `userId`        |  required  | string         | specific user unique identifier                      |
> | `sessionId`     |  required  | string         | specific session unique identifier                   |
> | `userUtterance` |  required  | string         | user utterance in response to last ai utterance      |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | ai response generated successfully for the current dialogue turn    |
> | `400`         | `application/json`                | `{"code": "400","message": "Bad Request"}`                          |
> | `500`         | `application/json`                | `{"code": "500","message": "Internal Server Error"}`                |
> | `503`         | `application/json`                | `{"code": "503","message": "Service Unavailable"}`                  |

##### Example cURL

```javascript
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "userUtterance": "I need to find a birthday gift for my younger sister. She really liked the barbie movie so suggest something related to that" 
    }' \
    http://localhost:8000/reply/user/8bf3c61b-3d97-46ba-987d-87cf1060b3ef/session/d88f9792-04c7-4837-bfa0-b00fddd9d903
```

##### Example response json

```json
{
    "aiUtterance": "Of course! Since your younger sister enjoyed the Barbie movie, here are a few gift ideas related to Barbie that she might love:
1. **Barbie Dolls:** Consider getting her a Barbie doll from her favorite Barbie movie. There are various characters and themes available, so you can choose one that resonates with her the most.
2. **Barbie Movie DVDs or Blu-rays:** If she enjoyed a specific Barbie movie, you could gift her the DVD or Blu-ray of that movie so she can watch it again anytime she wants.
3. **Barbie Playsets:** Look for playsets that are inspired by scenes from the Barbie movies. These can include things like castles, palaces, houses, and more.
4. **Barbie Books or Activity Sets:** You can find storybooks, coloring books, sticker books, and activity sets that are related to the Barbie movies. These can provide entertainment and educational value.
5. **Barbie Fashion and Accessories:** Barbie-themed clothing, accessories like bags, hats, or jewelry, and even dress-up costumes can make for great gifts.
6. **Barbie Art and Craft Kits:** If she's into arts and crafts, consider getting her a Barbie-themed craft kit that allows her to create her own Barbie-related projects.
7. **Barbie Puzzles and Games:** Look for puzzles, board games, or card games featuring Barbie characters or movie themes. These can be both fun and educational.
8. **Barbie Bedding or Room Decor:** If she's a big fan, consider decorating her room with Barbie-themed bedding, wall decals, posters, or other room decor items.
9. **Barbie Collector Items:** If she's a bit older or appreciates collecting, you could consider getting her a special edition or collector's Barbie doll.
10. **Barbie Movie Merchandise:** Look for merchandise related to the specific Barbie movie she enjoyed, such as t-shirts, backpacks, water bottles, and more.
Remember to consider her preferences and interests while selecting the gift. Whether it's a physical item or an experience related to Barbie, the thoughtfulness behind the gift will surely make her birthday special.",
    "productNames": [
        "Barbie Dolls", "Barbie Movie DVDs or Blu-rays", "Barbie Playsets", "Barbie Books or Activity Sets", "Barbie Fashion and Accessories", "Barbie Art and Craft Kits", "Barbie Puzzles and Games", "Barbie Bedding or Room Decor", "Barbie Collector Items", "Barbie Movie Merchandise"
    ]
}
```

</details>

<details>
    <summary><code>POST</code> <code><b>/search</b></code> <code>(search a product by its name)</code></summary>

##### Parameters

> | name            |  type      | data type      | description                                          |
> |-----------------|------------|----------------|------------------------------------------------------|
> | `productName`   |  required  | string         | name of the product to search                        |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | list of (max 10) items details for the input product                |
> | `400`         | `application/json`                | `{"code": "400","message": "Bad Request"}`                          |
> | `500`         | `application/json`                | `{"code": "500","message": "Internal Server Error"}`                |
> | `503`         | `application/json`                | `{"code": "503","message": "Service Unavailable"}`                  |

##### Example cURL

```javascript
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "productName": "Barbie Dolls" 
    }' \
    http://localhost:8000/search
```

##### Example response json

```json
{
    "productItems": [
        {
            "id": "1XWYB8MIUJ6L",
            "type": "Dolls",
            "name": "Barbie Color Reveal Scented Sweet Fruit Fashion Doll with Accessories & Color Change (Styles May Vary)",
            "brand": "Barbie",
            "price": 12.99,
            "currency": "USD",
            "rating": 4.6444,
            "imageUrl": "https://i5.walmartimages.com/seo/Barbie-Color-Reveal-Scented-Sweet-Fruit-Fashion-Doll-with-Accessories-Color-Change-Styles-May-Vary_5d1db589-2a32-4ee9-a489-d2aac9cd116f.496e326cfb827deef347709760ec0f8c.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Barbie-Color-Reveal-Scented-Sweet-Fruit-Fashion-Doll-with-Accessories-Color-Change-Styles-May-Vary/1618685574"
        }
    ]
}
```

</details>

<details>
    <summary><code>POST</code> <code><b>/ask/product/{productId}</b></code> <code>(ask a question based on a specific product)</code></summary>

</details>

<details>
    <summary><code>GET</code> <code><b>/review/product/{productId}</b></code> <code>(request a comprehensive product review based on top customer reviews)</code></summary>

</details>

<details>
    <summary><code>GET</code> <code><b>/compare/product1/{productId1}/product2/{productId2}</b></code> <code>(request an extensive comparison between two products based on description and customer reviews)</code></summary>

</details>




## Sample
<hr>

```bash
/seed/user/d88f9792-04c7-4837-bfa0-b00fddd9d903/session/b71fd28b-1dc7-4488-8ec6-bad2cdc13a04
```
```json
{}
```
```json
{
    "agentUtterance": "Hello! I'm an AI Sales Assistant at WalBot. How may I assist you today?"
}
```
<hr>

```bash
reply/user/d88f9792-04c7-4837-bfa0-b00fddd9d903/session/b71fd28b-1dc7-4488-8ec6-bad2cdc13a04
```
```json
{
    "userUtterance": "I am going camping to alaska this summer. what things should i buy"
}
```
```json
{
    "agentUtterance": "That sounds like a great adventure! When going camping in Alaska, it's important to be prepared for the outdoors and varying weather conditions. Here are a few essentials you should consider buying:\n\n1. Tent: Look for a sturdy and waterproof tent that can withstand the elements.\n2. Sleeping bag: Choose one that provides enough insulation for colder temperatures.\n3. Camping stove: A portable stove will allow you to cook meals during your trip.\n4. Warm clothing: Pack layers, including thermal underwear, fleece jackets, and waterproof outerwear.\n5. Hiking boots: Invest in comfortable and durable footwear for hiking and exploring.\n6. Camping mattress or sleeping pad: This will provide insulation and comfort while sleeping.\n7. Cooking utensils: Bring lightweight and versatile cookware, such as a pot, pan, and utensils.\n8. First aid kit: It's always important to have a well-stocked first aid kit for any emergencies.\n9. Insect repellent: Alaska can have mosquitoes and other bugs, so bring effective repellent.\n10. Camping accessories: Don't forget items like a headlamp, multitool, and camping chairs.\n\nThese are just a few suggestions to get you started. Is there anything else you would like assistance with? Are you satisfied with this information? ",
    "productSearchNames": [
        "Tent",
        "Sleeping bag",
        "Camping stove",
        "Warm clothing",
        "Hiking boots",
        "Camping mattress or sleeping pad",
        "Cooking utensils",
        "First aid kit",
        "Insect repellent",
        "Camping accessories"
    ]
}
```
<hr>

```bash
/search
```

```json
{
    "searchName": "Warm sleeping bag"
}
```

```json
{
    "productsList": [
        {
            "id": "29GIGERK890H",
            "type": "Sleeping Bags",
            "name": "Ozark Trail 50-Degree Warm Weather Red Sleeping Bag, 33\"x75\"",
            "brand": "Ozark Trail",
            "price": 19.97,
            "currency": null,
            "rating": 4.3543,
            "imageUrl": "https://i5.walmartimages.com/seo/Ozark-Trail-50-Degree-Warm-Weather-Red-Sleeping-Bag-33-x75_6f806fba-dd99-455f-8f6d-80c8ceed7c5f.e00124790dfc8b9894d77e0cc79f73cf.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Ozark-Trail-50-Degree-Warm-Weather-Red-Sleeping-Bag-33-x75/477760657"
        },
        {
            "id": "0V0W5U6NDCML",
            "type": "Sleeping Bags",
            "name": "Ozark Trail 35-Degree Cool Weather Recycled Adult Sleeping Bag, Blue, 33\"x77\"",
            "brand": "Ozark Trail",
            "price": 24.97,
            "currency": null,
            "rating": 4.2655,
            "imageUrl": "https://i5.walmartimages.com/seo/Ozark-Trail-35-Degree-Cool-Weather-Recycled-Adult-Sleeping-Bag-Blue-33-x77_22110045-314e-4760-aa71-884b58bdf966.8b3fddafe38033531b0e23b056d8af62.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Ozark-Trail-35-Degree-Cool-Weather-Recycled-Adult-Sleeping-Bag-Blue-33-x77/446606039"
        },
        {
            "id": "7HIVSSDY5NE0",
            "type": "Sleeping Bags",
            "name": "Ozark Trail Oversized 30-Degree Cool Weather Sleeping Bag, Gray, 40\"x80\"",
            "brand": "Ozark Trail",
            "price": 29.98,
            "currency": null,
            "rating": 4.4505,
            "imageUrl": "https://i5.walmartimages.com/seo/Ozark-Trail-Oversized-30-Degree-Cool-Weather-Sleeping-Bag-Gray-40-x80_e6a5bc05-c129-4f75-9ec7-5ff5d90cb4a8.424657a60606c94ab2f79806ad500c7c.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Ozark-Trail-Oversized-30-Degree-Cool-Weather-Sleeping-Bag-Gray-40-x80/677794987"
        },
        {
            "id": "5AI9KMTJZO21",
            "type": "Sleeping Bags",
            "name": "CRCKT Kids Rectangular Sleeping Bag,  °50F Rating, Multi-Color Unicorn Print",
            "brand": "CRCKT",
            "price": 22.97,
            "currency": null,
            "rating": 4.6881,
            "imageUrl": "https://i5.walmartimages.com/seo/CRCKT-Kids-Rectangular-Sleeping-Bag-50F-Rating-Multi-Color-Unicorn-Print_2880f2ec-ecf3-4e00-adee-3031f8dae545_2.b1e6011b8972694c30307841b726e6bc.jpeg",
            "pageUrl": "https://www.walmart.com/ip/CRCKT-Kids-Rectangular-Sleeping-Bag-50F-Rating-Multi-Color-Unicorn-Print/360653231"
        },
        {
            "id": "7441G2VC7RHF",
            "type": "Sleeping Bags",
            "name": "Firefly! Outdoor Gear Finn the Shark Kid's Sleeping Bag - Navy/Gray (65 in. x 24 in.)",
            "brand": "Firefly! Outdoor Gear",
            "price": 24.97,
            "currency": null,
            "rating": 4.7732,
            "imageUrl": "https://i5.walmartimages.com/seo/Firefly-Outdoor-Gear-Finn-the-Shark-Kid-s-Sleeping-Bag-Navy-Gray-65-in-x-24-in_33e24ac5-6d01-4391-b553-f68b07014ec0.1bcf471a4f9d361bb3bf6b1eb6405e11.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Firefly-Outdoor-Gear-Finn-the-Shark-Kid-s-Sleeping-Bag-Navy-Gray-65-in-x-24-in/350448918"
        },
        {
            "id": "3J9RH7ES1P2F",
            "type": "Sleeping Bags",
            "name": "Firefly! Outdoor Gear Sparkle the Unicorn Kid's Sleeping Bag - Pink (65 in. x 24 in.)",
            "brand": "Firefly! Outdoor Gear",
            "price": 24.97,
            "currency": null,
            "rating": 4.5238,
            "imageUrl": "https://i5.walmartimages.com/seo/Firefly-Outdoor-Gear-Sparkle-the-Unicorn-Kid-s-Sleeping-Bag-Pink-65-in-x-24-in_a8b09e5c-ccca-40ff-b32b-8daef0d1d2c3.4ad513cb7094167d7d65a8242cc5c02a.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Firefly-Outdoor-Gear-Sparkle-the-Unicorn-Kid-s-Sleeping-Bag-Pink-65-in-x-24-in/454046543"
        },
        {
            "id": "39Z8UU5FNHT2",
            "type": "Sleeping Bags",
            "name": "MOONCAST 0 ºC Sleeping Bags, Compression Sack Portable and Lightweight for Camping, Dark Gray",
            "brand": "MOONCAST",
            "price": 34.49,
            "currency": "USD",
            "rating": 4.3729,
            "imageUrl": "https://i5.walmartimages.com/seo/MOONCAST-0-C-Sleeping-Bags-Compression-Sack-Portable-and-Lightweight-for-Camping-Dark-Gray_35ff97c6-f83a-4ee6-8c5b-fa226db36699.f5f07161195c9aa8f69a63277436a45a.jpeg",
            "pageUrl": "https://www.walmart.com/ip/MOONCAST-0-C-Sleeping-Bags-Compression-Sack-Portable-and-Lightweight-for-Camping-Dark-Gray/509217074"
        },
        {
            "id": "16V8VOTJ31IU",
            "type": "Sleeping Bags",
            "name": "Slumberjack Elk Creek 45-Degree Insulated Adult Indoor/Outdoor Sleeping Bags Blanket Quilt, Indigo, 60\" L x 70\" W",
            "brand": "Slumberjack",
            "price": 29.94,
            "currency": null,
            "rating": 4.5357,
            "imageUrl": "https://i5.walmartimages.com/seo/Slumberjack-Elk-Creek-45-Degree-Insulated-Adult-Indoor-Outdoor-Sleeping-Bags-Blanket-Quilt-Indigo-60-L-x-70-W_21310ac2-7081-48eb-8ae9-f0d3ce05d0a0.a7f62b3b3b1c2f41b147a2d801ad6388.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Slumberjack-Elk-Creek-45-Degree-Insulated-Adult-Indoor-Outdoor-Sleeping-Bags-Blanket-Quilt-Indigo-60-L-x-70-W/946848902"
        }
    ]
}
```

<hr>

```bash
reply/user/d88f9792-04c7-4837-bfa0-b00fddd9d903/session/b71fd28b-1dc7-4488-8ec6-bad2cdc13a04
```
```json
{
    "userUtterance": "I have heard that bears are quite notorious there. How can I protect myself from getting attacked"
}
```
```json
{
    "agentUtterance": "When camping in bear country, it's important to take precautions to protect yourself from potential bear encounters. Here are a few tips to keep in mind:\n1. Store your food properly: Bears are attracted to the smell of food, so it's crucial to store your food in a bear-resistant container or hang it from a tree branch at least 10 feet off the ground and 4 feet away from the trunk.\n2. Use bear spray: Carry bear spray with you at all times and know how to use it. Bear spray is a non-lethal deterrent that can help deter a bear if it gets too close.\n3. Make noise: Bears are more likely to avoid humans if they are aware of your presence. Make noise while hiking, such as talking loudly or clapping your hands, to alert bears of your presence.\n4. Camp in open areas: Avoid camping in dense vegetation, as it can make it harder to see and hear bears approaching your campsite.\n5. Keep a clean camp: Clean up all food scraps and trash, as they can attract bears. Dispose of them properly in designated bear-proof containers or by packing them out.\nRemember, while these precautions can help minimize the risk of bear encounters, it's important to be aware of your surroundings and follow any additional safety guidelines provided by local authorities. Have a great camping trip! Is there anything else I can assist you with? <END_OF_TURN>",
    "productSearchNames": [
        "Bear-resistant container or bear bag",
        "Bear spray",
        "Whistle",
        "Food storage containers",
        "Trash bags"
    ]
}
```
<hr>

```bash
/search
```

```json
{
    "searchName": "Bear spray"
}
```
```json
{
    "productItemsList": [
        {
            "id": "6NE4PGW1TXGJ",
            "type": "Bear Protection",
            "name": "Frontiersman Bear Attack Deterrent Spray 30 Feet - FBAD-03",
            "brand": "SABRE",
            "price": 34.43,
            "currency": "USD",
            "rating": 4.5,
            "imageUrl": "https://i5.walmartimages.com/seo/Frontiersman-Bear-Attack-Deterrent-Spray-30-Feet-FBAD-03_c9087f11-a453-49cd-a502-7248157ff13d.ba475c300be1cdb89bf57010a1d7843b.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Frontiersman-Bear-Attack-Deterrent-Spray-30-Feet-FBAD-03/20629529"
        },
        {
            "id": "1HRMBAJU3K6P",
            "type": "Bear Protection",
            "name": "SABRE Frontiersman 7.9 oz. Bear Spray Deterrent with Belt Holster",
            "brand": "Frontiersman",
            "price": 42.69,
            "currency": null,
            "rating": 4.6477,
            "imageUrl": "https://i5.walmartimages.com/seo/SABRE-Frontiersman-7-9-oz-Bear-Spray-Deterrent-with-Belt-Holster_020a00aa-ae70-44c1-820c-6f06f9bb0a5c.df765dc1b21d1c650410e23b9fe091dc.jpeg",
            "pageUrl": "https://www.walmart.com/ip/SABRE-Frontiersman-7-9-oz-Bear-Spray-Deterrent-with-Belt-Holster/20629530"
        },
        {
            "id": "33F19AZR91KY",
            "type": "Bear Protection",
            "name": "Mace Brand Bear Pepper Mace - Green",
            "brand": "Mace",
            "price": 30.62,
            "currency": null,
            "rating": 4.32,
            "imageUrl": "https://i5.walmartimages.com/seo/Mace-Brand-Bear-Pepper-Mace-Green_65fcc0f3-e6bc-45e4-a9ff-50fb31718da0.116681ab7da1263fadef91328db831c1.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Mace-Brand-Bear-Pepper-Mace-Green/34722055"
        },
        {
            "id": "511J2O9847M9",
            "type": "Bear Protection",
            "name": "Coghlan's Silver Bear Bell with Magnetic Silencer",
            "brand": "Coghlan's",
            "price": 5.5,
            "currency": null,
            "rating": 4.7778,
            "imageUrl": "https://i5.walmartimages.com/seo/Coghlan-s-Silver-Bear-Bell-with-Magnetic-Silencer_e1d19bd4-4fb2-4315-82c7-c079ca0f3848_1.144477718cd507c9b80f1eaa3bfcea1c.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Coghlan-s-Silver-Bear-Bell-with-Magnetic-Silencer/35703554"
        },
        {
            "id": "2EBWGAGPXIPT",
            "type": "Bear Protection",
            "name": "SABRE Frontiersman 9.2 oz Bear Spray with Belt Holster, White",
            "brand": "SABRE",
            "price": 44.99,
            "currency": null,
            "rating": 4.5077,
            "imageUrl": "https://i5.walmartimages.com/seo/SABRE-Frontiersman-9-2-oz-Bear-Spray-with-Belt-Holster-White_4c7f2117-0175-4e5f-94a5-0536449e5873.7d0600cacf2f4e66f90a01fbd11b6b95.jpeg",
            "pageUrl": "https://www.walmart.com/ip/SABRE-Frontiersman-9-2-oz-Bear-Spray-with-Belt-Holster-White/21684332"
        },
        {
            "id": "1UU1I42V2NVL",
            "type": "Bear Protection",
            "name": "SABRE Frontiersman 9.2 Ounce Bear Spray Deterrent, 35-Foot Range",
            "brand": "SABRE",
            "price": 42.22,
            "currency": null,
            "rating": 4.3636,
            "imageUrl": "https://i5.walmartimages.com/seo/SABRE-Frontiersman-9-2-Ounce-Bear-Spray-Deterrent-35-Foot-Range_4bb9e481-7d63-4993-8d2b-0af8e4314cb3.45356f9931abd62ad62c2b6405409108.jpeg",
            "pageUrl": "https://www.walmart.com/ip/SABRE-Frontiersman-9-2-Ounce-Bear-Spray-Deterrent-35-Foot-Range/27375817"
        },
        {
            "id": "0UZGJZ8JVTUH",
            "type": "Bear Protection",
            "name": "Alaska Bear Spray Sabre Ak Backpcker W/hlr  9.2 Oz   92bh",
            "brand": "Alaska Backpacker",
            "price": 46.97,
            "currency": null,
            "rating": null,
            "imageUrl": "https://i5.walmartimages.com/seo/Alaska-Bear-Spray-Sabre-Ak-Backpcker-W-hlr-9-2-Oz-92bh_628b8394-f872-4164-b5ac-ed0fef558d24_1.5b254292a3be1e4b6a03103a62fc36df.jpeg",
            "pageUrl": "https://www.walmart.com/ip/Alaska-Bear-Spray-Sabre-Ak-Backpcker-W-hlr-9-2-Oz-92bh/196570796"
        },
        {
            "id": "27GWHLDJUXBP",
            "type": "Pepper Spray",
            "name": "UDAP Pepper Power Bear Pepper Spray Deterrent with Holster, 7.9 oz, 2 Pack, SO2",
            "brand": "Pepper Power",
            "price": 59.99,
            "currency": null,
            "rating": 5,
            "imageUrl": "https://i5.walmartimages.com/seo/UDAP-Pepper-Power-Bear-Pepper-Spray-Deterrent-with-Holster-7-9-oz-2-Pack-SO2_2bc3d5a3-2703-4f0b-b2f2-78f78b676b4b.65b4214a90546b1611e7ff8529cfe1c0.jpeg",
            "pageUrl": "https://www.walmart.com/ip/UDAP-Pepper-Power-Bear-Pepper-Spray-Deterrent-with-Holster-7-9-oz-2-Pack-SO2/939220703"
        }
    ]
}
```
<hr>

```bash
/ask/product/6NE4PGW1TXGJ
```
```json
{
    "userUtterance": "how far can this spray?"
}
```
```json
{
    "agentUtterance": "The Frontiersman Bear Attack Deterrent Spray has a maximum spray range of 30 feet (9 meters). This means you can deploy the spray from a distance of up to 30 feet to create a protective barrier between you and an aggressive bear. This range is designed to provide you with more time to react to a charging bear and to help keep you safe during outdoor adventures."
}
```
<hr>

```bash
/review/product/33F19AZR91KY
```

```json
{
    "agentUtterance": "Users praise the bear spray for its effectiveness, affordability, and convenience in bear-prone areas. Some appreciate the extended expiration date, prompt delivery, and added security. A few express minor concerns about expiration date visibility and untested effectiveness."
}
```