import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";

const CheckAvailableReservations = (props) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReservationFormVisible, setIsReservationFormVisible] =
    useState(false);
  useEffect(() => {
    fetchAvailableReservations();
  }, []);

  const fetchAvailableReservations = async () => {
    setLoading(true);
    const response = await fetch("/api/meals?availableReservations=true");
    const availableReservations = await response.json();
    setReservations(availableReservations);
    setLoading(false);
  };

  const getReservationForMeal = async () => {
    const reservationForMeal = await reservations.find(
      (reservation) => reservation.id === Number(props.mealId)
    );
   if (reservationForMeal === undefined) {
      setIsReservationFormVisible(false);
    } else {
      const total_reservations = await reservationForMeal.total_reservations;
      const max_reservations = await reservationForMeal.max_reservations;
      if (max_reservations <= total_reservations) {
        setIsReservationFormVisible(false);
      } else {
        setIsReservationFormVisible(true);
      }
    }
    return;
  };

  getReservationForMeal();

  return (
    <>
      <div className="common-container">
        {loading && <div>Loading...</div>}
        
        {isReservationFormVisible && (
          <ReservationForm
            mealId={props.mealId}
            isReservationFormVisible={props.isReservationFormVisible}
            setIsReservationFormVisible={props.setIsReservationFormVisible}
            singleMeal={props.singleMeal}
          />
        )}
        {isReservationFormVisible == false && (
          <div className="reservation-full-msg">
            <h3>
              Sorry we have no revervations left for this meal. Try something
              else
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckAvailableReservations;
