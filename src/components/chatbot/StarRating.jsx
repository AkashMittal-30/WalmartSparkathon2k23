import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import './StarRating.css'; // Import your CSS file

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color="yellow" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<span key={i} className="half-filled-star"></span>);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} color="white" />);
    }
  }

  return (
    <div className="star-rating">
      {stars}
    </div>
  );
};

export default StarRating;
