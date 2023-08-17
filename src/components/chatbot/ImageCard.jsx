import React from "react";
import { useState } from "react";
import "./ImageCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import StarRating from "./StarRating";
// function ImageCard({ items, message, user, productNames, messageFunction }) {}
let productItems = [];
const ImageCard = (props) => {
  const {
    items,
    message,
    user,
    productNames,
    messageFunction,
    setTypeFunction,
  } = props;
  const [askQuestion, setAskQuestion] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  // console.log(askQuestion);
  const handleAskQuestionToggle = () => {
    setAskQuestion(!askQuestion);

    // console.log(selectedIndexes[0])
    if (!askQuestion) setTypeFunction(61235);
    else setTypeFunction(-1);
  };

  const handleCheckboxChange = (index) => {
    // if (askQuestion) setAskQuestion((prev)=>(!prev));
    // if (askQuestion) setAskQuestion(false);
    // setAskQuestion(true);
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      if (selectedIndexes.length < 2) {
        setSelectedIndexes([...selectedIndexes, index]);
      }
    }
  };
  // console.log(items);
  const reviewAnalysis = async () => {
    console.log("review called");
    const newMessage2 = {
      items: [],
      productNames: "",
      message: "Give me review analysis for Mace Brand Bear Pepper Mace - Green.",
      user: "user-raja-bsdsdsd",
    };
    messageFunction(newMessage2);

    setTimeout(()=>{
      const response = {
        data: {
          aiUtterance:
            "Users praise the bear spray for its effectiveness, affordability, and convenience in bear-prone areas. Some appreciate the extended expiration date, prompt delivery, and added security. A few express minor concerns about expiration date visibility and untested effectiveness.",
        },
      };
      const newMessage = {
        items: [],
        productNames: "",
        message: response.data.aiUtterance,
        user: "application",
      };
      messageFunction(newMessage);
    },4000);
  };

  const handleProductQuery = async (productName) => {
    // const response= await axios.post('https://5cb4-35-192-70-233.ngrok.io/search', {
    //   productName
    // })
    setTimeout(() => {
      var response;
      console.log(productName);
      if (productName === "Sleeping bag") {
        response = {
          data: {
            productsList: [
              {
                id: "29GIGERK890H",
                type: "Sleeping Bags",
                name: 'Ozark Trail 50-Degree Warm Weather Red Sleeping Bag, 33"x75"',
                brand: "Ozark Trail",
                price: 19.97,
                currency: null,
                rating: 4.3543,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Ozark-Trail-50-Degree-Warm-Weather-Red-Sleeping-Bag-33-x75_6f806fba-dd99-455f-8f6d-80c8ceed7c5f.e00124790dfc8b9894d77e0cc79f73cf.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Ozark-Trail-50-Degree-Warm-Weather-Red-Sleeping-Bag-33-x75/477760657",
              },
              {
                id: "0V0W5U6NDCML",
                type: "Sleeping Bags",
                name: 'Ozark Trail 35-Degree Cool Weather Recycled Adult Sleeping Bag, Blue, 33"x77"',
                brand: "Ozark Trail",
                price: 24.97,
                currency: null,
                rating: 4.2655,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Ozark-Trail-35-Degree-Cool-Weather-Recycled-Adult-Sleeping-Bag-Blue-33-x77_22110045-314e-4760-aa71-884b58bdf966.8b3fddafe38033531b0e23b056d8af62.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Ozark-Trail-35-Degree-Cool-Weather-Recycled-Adult-Sleeping-Bag-Blue-33-x77/446606039",
              },
              {
                id: "7HIVSSDY5NE0",
                type: "Sleeping Bags",
                name: 'Ozark Trail Oversized 30-Degree Cool Weather Sleeping Bag, Gray, 40"x80"',
                brand: "Ozark Trail",
                price: 29.98,
                currency: null,
                rating: 4.4505,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Ozark-Trail-Oversized-30-Degree-Cool-Weather-Sleeping-Bag-Gray-40-x80_e6a5bc05-c129-4f75-9ec7-5ff5d90cb4a8.424657a60606c94ab2f79806ad500c7c.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Ozark-Trail-Oversized-30-Degree-Cool-Weather-Sleeping-Bag-Gray-40-x80/677794987",
              },
              {
                id: "5AI9KMTJZO21",
                type: "Sleeping Bags",
                name: "CRCKT Kids Rectangular Sleeping Bag,  °50F Rating, Multi-Color Unicorn Print",
                brand: "CRCKT",
                price: 22.97,
                currency: null,
                rating: 4.6881,
                imageUrl:
                  "https://i5.walmartimages.com/seo/CRCKT-Kids-Rectangular-Sleeping-Bag-50F-Rating-Multi-Color-Unicorn-Print_2880f2ec-ecf3-4e00-adee-3031f8dae545_2.b1e6011b8972694c30307841b726e6bc.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/CRCKT-Kids-Rectangular-Sleeping-Bag-50F-Rating-Multi-Color-Unicorn-Print/360653231",
              },
              {
                id: "7441G2VC7RHF",
                type: "Sleeping Bags",
                name: "Firefly! Outdoor Gear Finn the Shark Kid's Sleeping Bag - Navy/Gray (65 in. x 24 in.)",
                brand: "Firefly! Outdoor Gear",
                price: 24.97,
                currency: null,
                rating: 4.7732,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Firefly-Outdoor-Gear-Finn-the-Shark-Kid-s-Sleeping-Bag-Navy-Gray-65-in-x-24-in_33e24ac5-6d01-4391-b553-f68b07014ec0.1bcf471a4f9d361bb3bf6b1eb6405e11.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Firefly-Outdoor-Gear-Finn-the-Shark-Kid-s-Sleeping-Bag-Navy-Gray-65-in-x-24-in/350448918",
              },
              {
                id: "3J9RH7ES1P2F",
                type: "Sleeping Bags",
                name: "Firefly! Outdoor Gear Sparkle the Unicorn Kid's Sleeping Bag - Pink (65 in. x 24 in.)",
                brand: "Firefly! Outdoor Gear",
                price: 24.97,
                currency: null,
                rating: 4.5238,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Firefly-Outdoor-Gear-Sparkle-the-Unicorn-Kid-s-Sleeping-Bag-Pink-65-in-x-24-in_a8b09e5c-ccca-40ff-b32b-8daef0d1d2c3.4ad513cb7094167d7d65a8242cc5c02a.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Firefly-Outdoor-Gear-Sparkle-the-Unicorn-Kid-s-Sleeping-Bag-Pink-65-in-x-24-in/454046543",
              },
              {
                id: "39Z8UU5FNHT2",
                type: "Sleeping Bags",
                name: "MOONCAST 0 ºC Sleeping Bags, Compression Sack Portable and Lightweight for Camping, Dark Gray",
                brand: "MOONCAST",
                price: 34.49,
                currency: "USD",
                rating: 4.3729,
                imageUrl:
                  "https://i5.walmartimages.com/seo/MOONCAST-0-C-Sleeping-Bags-Compression-Sack-Portable-and-Lightweight-for-Camping-Dark-Gray_35ff97c6-f83a-4ee6-8c5b-fa226db36699.f5f07161195c9aa8f69a63277436a45a.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/MOONCAST-0-C-Sleeping-Bags-Compression-Sack-Portable-and-Lightweight-for-Camping-Dark-Gray/509217074",
              },
              {
                id: "16V8VOTJ31IU",
                type: "Sleeping Bags",
                name: 'Slumberjack Elk Creek 45-Degree Insulated Adult Indoor/Outdoor Sleeping Bags Blanket Quilt, Indigo, 60" L x 70" W',
                brand: "Slumberjack",
                price: 29.94,
                currency: null,
                rating: 4.5357,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Slumberjack-Elk-Creek-45-Degree-Insulated-Adult-Indoor-Outdoor-Sleeping-Bags-Blanket-Quilt-Indigo-60-L-x-70-W_21310ac2-7081-48eb-8ae9-f0d3ce05d0a0.a7f62b3b3b1c2f41b147a2d801ad6388.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Slumberjack-Elk-Creek-45-Degree-Insulated-Adult-Indoor-Outdoor-Sleeping-Bags-Blanket-Quilt-Indigo-60-L-x-70-W/946848902",
              },
            ],
          },
        };
      } else {
        response = {
          data: {
            productsList: [
              {
                id: "6NE4PGW1TXGJ",
                type: "Bear Protection",
                name: "Frontiersman Bear Attack Deterrent Spray 30 Feet - FBAD-03",
                brand: "SABRE",
                price: 34.43,
                currency: "USD",
                rating: 4.5,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Frontiersman-Bear-Attack-Deterrent-Spray-30-Feet-FBAD-03_c9087f11-a453-49cd-a502-7248157ff13d.ba475c300be1cdb89bf57010a1d7843b.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Frontiersman-Bear-Attack-Deterrent-Spray-30-Feet-FBAD-03/20629529",
              },
              {
                id: "1HRMBAJU3K6P",
                type: "Bear Protection",
                name: "SABRE Frontiersman 7.9 oz. Bear Spray Deterrent with Belt Holster",
                brand: "Frontiersman",
                price: 42.69,
                currency: null,
                rating: 4.6477,
                imageUrl:
                  "https://i5.walmartimages.com/seo/SABRE-Frontiersman-7-9-oz-Bear-Spray-Deterrent-with-Belt-Holster_020a00aa-ae70-44c1-820c-6f06f9bb0a5c.df765dc1b21d1c650410e23b9fe091dc.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/SABRE-Frontiersman-7-9-oz-Bear-Spray-Deterrent-with-Belt-Holster/20629530",
              },
              {
                id: "33F19AZR91KY",
                type: "Bear Protection",
                name: "Mace Brand Bear Pepper Mace - Green",
                brand: "Mace",
                price: 30.62,
                currency: null,
                rating: 4.32,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Mace-Brand-Bear-Pepper-Mace-Green_65fcc0f3-e6bc-45e4-a9ff-50fb31718da0.116681ab7da1263fadef91328db831c1.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Mace-Brand-Bear-Pepper-Mace-Green/34722055",
              },
              {
                id: "511J2O9847M9",
                type: "Bear Protection",
                name: "Coghlan's Silver Bear Bell with Magnetic Silencer",
                brand: "Coghlan's",
                price: 5.5,
                currency: null,
                rating: 4.7778,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Coghlan-s-Silver-Bear-Bell-with-Magnetic-Silencer_e1d19bd4-4fb2-4315-82c7-c079ca0f3848_1.144477718cd507c9b80f1eaa3bfcea1c.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Coghlan-s-Silver-Bear-Bell-with-Magnetic-Silencer/35703554",
              },
              {
                id: "2EBWGAGPXIPT",
                type: "Bear Protection",
                name: "SABRE Frontiersman 9.2 oz Bear Spray with Belt Holster, White",
                brand: "SABRE",
                price: 44.99,
                currency: null,
                rating: 4.5077,
                imageUrl:
                  "https://i5.walmartimages.com/seo/SABRE-Frontiersman-9-2-oz-Bear-Spray-with-Belt-Holster-White_4c7f2117-0175-4e5f-94a5-0536449e5873.7d0600cacf2f4e66f90a01fbd11b6b95.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/SABRE-Frontiersman-9-2-oz-Bear-Spray-with-Belt-Holster-White/21684332",
              },
              {
                id: "1UU1I42V2NVL",
                type: "Bear Protection",
                name: "SABRE Frontiersman 9.2 Ounce Bear Spray Deterrent, 35-Foot Range",
                brand: "SABRE",
                price: 42.22,
                currency: null,
                rating: 4.3636,
                imageUrl:
                  "https://i5.walmartimages.com/seo/SABRE-Frontiersman-9-2-Ounce-Bear-Spray-Deterrent-35-Foot-Range_4bb9e481-7d63-4993-8d2b-0af8e4314cb3.45356f9931abd62ad62c2b6405409108.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/SABRE-Frontiersman-9-2-Ounce-Bear-Spray-Deterrent-35-Foot-Range/27375817",
              },
              {
                id: "0UZGJZ8JVTUH",
                type: "Bear Protection",
                name: "Alaska Bear Spray Sabre Ak Backpcker W/hlr  9.2 Oz   92bh",
                brand: "Alaska Backpacker",
                price: 46.97,
                currency: null,
                rating: null,
                imageUrl:
                  "https://i5.walmartimages.com/seo/Alaska-Bear-Spray-Sabre-Ak-Backpcker-W-hlr-9-2-Oz-92bh_628b8394-f872-4164-b5ac-ed0fef558d24_1.5b254292a3be1e4b6a03103a62fc36df.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/Alaska-Bear-Spray-Sabre-Ak-Backpcker-W-hlr-9-2-Oz-92bh/196570796",
              },
              {
                id: "27GWHLDJUXBP",
                type: "Pepper Spray",
                name: "UDAP Pepper Power Bear Pepper Spray Deterrent with Holster, 7.9 oz, 2 Pack, SO2",
                brand: "Pepper Power",
                price: 59.99,
                currency: null,
                rating: 5,
                imageUrl:
                  "https://i5.walmartimages.com/seo/UDAP-Pepper-Power-Bear-Pepper-Spray-Deterrent-with-Holster-7-9-oz-2-Pack-SO2_2bc3d5a3-2703-4f0b-b2f2-78f78b676b4b.65b4214a90546b1611e7ff8529cfe1c0.jpeg",
                pageUrl:
                  "https://www.walmart.com/ip/UDAP-Pepper-Power-Bear-Pepper-Spray-Deterrent-with-Holster-7-9-oz-2-Pack-SO2/939220703",
              },
            ],
          },
        };
      }
      productItems = response.data.productsList;
      const newMessage = {
        items: response.data.productsList,
        productNames: "",
        message: `here are the results of ${productName}`,
        user: "application",
      };
      console.log(newMessage);
      messageFunction(newMessage);
    }, 4000);
  };
  return (
    <div
      className={`message-container ${
        user === "application" ? "bg-l" : "bg-d"
      }`}
    >
      {message === "" ? (
        <></>
      ) : (
        <div
          className={`chat-message-text ${
            user === "application" ? "left-align" : "right-align"
          }`}
          style={{ whiteSpace: "pre-line" }}
        >{`${message}`}</div>
      )}
      {productNames?.length !== 0 ? (
        <>
          <div
            className={`product-names-container ${
              user === "application" ? "left-align" : "right-align"
            }`}
            style={{ whiteSpace: "pre-line" }}
          >
            {productNames?.map((productName) => (
              <button
                className="product-names-button"
                onClick={() => {
                  handleProductQuery(productName);
                }}
              >
                {productName}
              </button>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
      {/* {console.log(items)} */}
      {items?.length !== 0 ? (
        <>
          <div
            className={`image-card-container ${
              user === "application" ? "" : "right-align"
            }`}
          >
            {items?.map((item, index) => (
              <>
                <a
                  key={index}
                  href={item.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="image-card"
                >
                  <input
                    type="checkbox"
                    checked={selectedIndexes.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                    className="image-card-checkbox"
                    disabled={
                      selectedIndexes.length === 2 &&
                      !selectedIndexes.includes(index)
                    }
                  />
                  <img
                    src={item.imageUrl}
                    alt={`${index + 1}`}
                    className="image-card-image"
                  />
                  <div className="image-card-title">
                    {item.name.substring(0, 12) + " ..."}
                  </div>
                  <div className="image-card-price">Price:$ {item.price}</div>
                  <div className="image-card-rating">
                    Rating: {item?.rating?.toString().substring(0, 3) + " "}
                    <StarRating rating={item.rating} />
                  </div>
                </a>
              </>
            ))}
          </div>
          <div
            className={`${
              selectedIndexes.length > 0 ? "analysis-buttons" : "display-none"
            }`}
          >
            {selectedIndexes.length === 1 && (
              <div>
                <button
                  className={`action-button ${askQuestion ? "selected" : ""}`}
                  onClick={handleAskQuestionToggle}
                >
                  Ask product question?
                </button>
                <button
                  className="action-button"
                  onClick={() => reviewAnalysis()}
                >
                  Review Analysis
                </button>
              </div>
            )}
            {selectedIndexes.length === 2 && (
              <button className="action-button">Compare Reviews</button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageCard;
