import React from "react";
import SearchFromHome from "./SearchFromHome";

const Home = () => {
  return (
    <div className="center-content home">
      <div className="position-input">
        <SearchFromHome />
      </div>
      <div>
        <h3>
          Sitting down and sharing a meal together combines two of my favorite
          loves: eating great food and talking about great food
        </h3>
        <p>Homaro Cantu</p>
      </div>
    </div>
  );
};

export default Home;
