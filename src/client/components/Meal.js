import React, { useState, useEffect } from "react";
import { TiArrowBack } from "react-icons/ti"
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CheckAvailableReservations from "./CheckAvailableReservations";
import ReviewForm from "./ReviewForm";
import images from "./images";

const Meal = () => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [isReservationFormVisible, setIsReservationFormVisible] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
  let { id } = useParams();
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMealWithId = async () => {
    try {
      setLoading(true);
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
                  <div>
                    <strong>{singleMeal && singleMeal.title}</strong>
                  </div>
                  <br />
                  <div>{singleMeal && singleMeal.description}</div> <br />
                  <div>
                    <strong>
                      {singleMeal && `Price: ${singleMeal.price} DKK`}
                    </strong>
                  </div>
                </div>
                <div className="btn-container">
                  <button
                    onClick={() => {
                      setIsReviewFormVisible(!isReviewFormVisible);
                    }}
                  >
                    Review this meal
                  </button>
                  <button
                    onClick={() => {
                      setIsReservationFormVisible(!isReservationFormVisible);
                    }}
                  >
                    Reserve this meal
                  </button>
              
                </div>
                <div>
                  <button className="goBackBtn" onClick={()=>history.goBack()}>Go Back<TiArrowBack size={20} color={"blue"}/></button>

                  </div>
              </div>
            </div>
          </div>
          <div className="reser-review coontainer">
            <div className="review-container">
              {isReviewFormVisible && (
                <div className="review-form">
                  <ReviewForm
                    mealId={id}
                    isReviewFormVisible={isReviewFormVisible}
                    setIsReviewFormVisible={setIsReviewFormVisible}
                  />
                </div>
              )}
            </div>
            <div className="reservation-container">
              {isReservationFormVisible && (
                <CheckAvailableReservations
                  mealId={id}
                  isReservationFormVisible={isReservationFormVisible}
                  setIsReservationFormVisible={setIsReservationFormVisible}
                  singleMeal={singleMeal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meal;
