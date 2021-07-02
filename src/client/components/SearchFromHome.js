import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import { useHistory } from "react-router-dom";

const SearchFromHome = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const history = useHistory();
  const debouceValue = useDebounce(query);

  const fetchSearchedMeals = async () => {
    if (query) {
      const response = await fetch(`/api/meals?title=${debouceValue}`);
      const searchedMeals = await response.json();
      setMeals(searchedMeals);
    }
  };
  const handleInfoClick = () => {
    if (meals.length === 1 && meals !== undefined) {
      return history.push(`meals/${meals[0].id}`);
    }
  };

  useEffect(() => {
    if (debouceValue.length > 0) {
      fetchSearchedMeals();
    }
  }, [debouceValue]);

  return (
    <>
      <div className="home-search">
        <input
          type="text"
          placeholder="search a meal"
          className="home_input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleInfoClick}>Info</button>
        <ul>
          {query &&
            meals.map((meal) => (
              <li key={meal.id} onClick={() => setQuery(meal.title)}>
                {meal.title}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SearchFromHome;
