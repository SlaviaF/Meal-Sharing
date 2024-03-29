import React, { useState } from "react";

const CreateMeal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [maxReservations, setMaxReservations] = useState("");
  const [price, setPrice] = useState("");
  const [eventDate, setEventDate] = useState(eventday);
  let eventday = new Date().toISOString().slice(0, -8);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        max_reservations: maxReservations,
        event_day: eventDate,
        price: price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          alert("You meal was not created");
        } else {
          alert("Thank you for being a part of our meal sharing community");
          setTitle("")
          setDescription("")
          setLocation("")
          setMaxReservations("")
          setPrice("")
          setEventDate("")
        }

      });
  };
  return (
    <div className="common-container common-bg">
      <div className="center-content">
        <div className="host-form">
          <div className="host">
            <h3>Be a host</h3>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Your Meal</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter your dish"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Describe in short"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  className="form-control"
                  placeholder="Enter you location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventday">Event Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="eventday"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="max_reservations">Guests Count</label>
                <input
                  type="text"
                  className="form-control"
                  id="max_reservations"
                  placeholder="How many guest"
                  value={maxReservations}
                  onChange={(e) => setMaxReservations(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <button>Confirm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeal;
