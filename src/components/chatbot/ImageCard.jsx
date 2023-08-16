import React from "react";
import { useState } from "react";
import "./ImageCard.css";
function ImageCard({ items, message, user, productNames }) {
  const [askQuestion, setAskQuestion] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  
  const handleAskQuestionToggle = () => {
    setAskQuestion(!askQuestion);
  };

  const handleCheckboxChange = (index) => {
    if (askQuestion) setAskQuestion(false);
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      if (selectedIndexes.length < 2) {
        setSelectedIndexes([...selectedIndexes, index]);
      }
    }
  };
  // console.log(items);
  const handleProductQuery = (productName)=>
  {

  }
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
      {productNames?.length!==0?(
        <>
          <div className={`product-names-container ${
            user === "application" ? "left-align" : "right-align"
          }`}
          style={{ whiteSpace: "pre-line" }}>
            {productNames?.map((productName)=>(
              <button className="product-names-button" onClick={()=>handleProductQuery(productName)}>
                {productName}
              </button>
            ))}
          </div>
        </>
      ):(
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
                  href={item.redirectUrl}
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
                    src={item.imageLink}
                    alt={`${index + 1}`}
                    className="image-card-image"
                  />
                  <div className="image-card-title">{item.title}</div>
                  <div className="image-card-price">Price: {item.price}</div>
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
                <button className="action-button">Review Analysis</button>
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
}

export default ImageCard;
