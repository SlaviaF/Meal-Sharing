import React, {useState} from 'react'
import { TiArrowBack } from "react-icons/ti"
import { useHistory } from 'react-router';
import CheckAvailableReservations from "./CheckAvailableReservations";
import ReviewForm from "./ReviewForm";

const ReviewReservationVisibility = ({id, singleMeal}) => {
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [isReservationFormVisible, setIsReservationFormVisible] = useState(false);
    const history = useHistory()
    return (
        <>
        <div>
        <div>
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
                <div className="gobackDiv">
                  <button className="goBackBtn" onClick={()=>history.goBack()}>Go Back<TiArrowBack size={20} color={"blue"}/></button>

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
  
        </>
    )
}

export default ReviewReservationVisibility
