import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ mealId, isReviewFormVisible,setIsReviewFormVisible}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        meals_id: mealId,
        stars: stars,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        if (!data) {
          alert("You review was not posted. Kindly try again");
        } else {
          alert("Thank you for your feedback");
          setTitle("");
          setDescription("");
          setStars("");
        }
      });

    if (title === "" && description === "" && stars === null) {
      alert("Please enter a review");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <button
          className="closeIcon"
          onClick={() => setIsReviewFormVisible(!isReviewFormVisible)}
        >
          X
        </button>
        <div>
          <h3>Tell us your experience!!!</h3>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="descrioption"
            placeholder="Say something"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label>
              <input
                className="star-radio"
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setStars(ratingValue)}
              />
              <FaStar
                size={50}
                color={ratingValue <= stars ? "yellow" : "grey"}
              />
            </label>
          );
        })}
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default ReviewForm;
