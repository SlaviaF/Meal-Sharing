import React, { useState } from "react";
const RerservationForm = ({mealId, isReservationFormVisible, setIsReservationFormVisible, singleMeal}) => {
  const [custname, setCustName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");

  const onSubmit = (e) => {
 
    e.preventDefault();
    fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_name: custname,
        contact_phonenumber: phone,
        contact_email: email,
        number_of_guests: guests,
        meals_id: mealId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          throw "Reservation not successfull. try again";
        } else {
          alert("Your reservation is complete");
        
        }
      });
  };
  if (guests < 0) {
    alert("Please add a valid number");
  }

  return (
    <div className="form-container">
      <h3>
        Reserve <strong>{singleMeal.title}</strong> here
      </h3>
      <form onSubmit={onSubmit}>
        <button
          className="closeIcon btn"
          onClick={() => setIsReservationFormVisible(!isReservationFormVisible)}
        >
          X
        </button>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={custname}
            onChange={(e) => setCustName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            className="form-control"
            id="phone"
            placeholder="Enter your mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter you email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Guest Count</label>
          <input
            type="number"
            id="number_of_guests"
            className="form-control"
            placeholder="Enter guest count"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          />
        </div>
        <button>Click</button>
      </form>
    </div>
  );
};

export default RerservationForm;
