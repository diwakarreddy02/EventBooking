import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RatingReview.css";

export default function RateAndReview() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const submitReview = () => {
    // You can send the rating and reviewText to your server here.
    console.log("Rating:", rating);
    console.log("Review Text:", reviewText);

    // Redirect the user to the SportsSearch page
    navigate("/SportSearch");
  };

  return (
    <div className="rate-review-wrapper">
      <h1>Rate and Review</h1>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`rating-star${value <= rating ? " active" : ""}`}
            onClick={() => handleRatingClick(value)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="review-textarea"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={handleReviewTextChange}
      ></textarea>
      <button className="submit-review-button" onClick={submitReview}>
        Submit Review
      </button>
    </div>
  );
}
