import React from "react";
import { useState } from "react";
import "./ImageCard.css";
function ImageCard({ imageLinks, message, user }) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
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
  const [askQuestion, setAskQuestion] = useState(false);
  const handleAskQuestionToggle = () => {
    setAskQuestion(!askQuestion);
  };
  console.log(imageLinks);
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
      {imageLinks.length !== 0 ? (
        <>
          <div
            className={`image-card-container ${
              user === "application" ? "" : "right-align"
            }`}
          >
            {imageLinks?.map((link, index) => (
              <>
                <a
                  key={index}
                  href={link}
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
                    src={link}
                    alt={`${index + 1}`}
                    className="image-card-image"
                  />
                  <div className="image-card-title">Title</div>
                  <div className="image-card-price">Price: ₹1000</div>
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
