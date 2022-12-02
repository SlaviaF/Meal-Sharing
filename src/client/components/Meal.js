import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewReservationVisibility from "./ReviewReservationVisibility";
import images from "./images";

const Meal = () => {
  const [error, setError] = useState(null);
  let { id } = useParams();
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMealWithId = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/meals/${id}`);
      if (!response.ok) {
        const message = `An error has occured : ${response.statusText}`;
        throw Error(message);
      } else {
        const mealData = await response.json();
        setMeal(mealData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchMealWithId();
  }, []);

  const singleMeal = meal[0];
  const imageForMeal = images.find((img) => img.id == id);

  return (
    <>
      <div className="common-container common-bg">
        <div className="meal-container">
          <div className="single-meal-container">
            {loading && <div>Loading...</div>}
            <div className="single_meal">
              {singleMeal && (
                <div className="single_meal_inner">
                  <ul>
                    <li>
                      <img src={imageForMeal.img} alt={meal.title} />
                    </li>
                    <li className="heading">{singleMeal.title}</li>
                  </ul>
                </div>
              )}
              <div className="desc-container">
                <div>
                  <div className="inner-desc">
                    <strong>{singleMeal && singleMeal.title}</strong>
                  </div>
                  <br />
                  <div>{singleMeal && singleMeal.description}</div> <br />
                  <div>
                    <strong>
                      {singleMeal && `Price: ${(singleMeal.price).split(".").join(",")} kr`}
                    </strong>
                  </div>
                </div>
                <ReviewReservationVisibility id={id} singleMeal={singleMeal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meal;
