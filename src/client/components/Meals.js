import React, { useState, useEffect } from "react";
import Meal from "./Meal";
import images from "./images";
import common from "../assets/images/common.png";

import { Route, Switch, Link, useRouteMatch } from "react-router-dom";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  let { path, url } = useRouteMatch();

  useEffect(() => {
    fetchMealsApi();
  }, []);

  const fetchMealsApi = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/meals/");
      if (!response.ok) {
        const message = `An error has occured : ${response.statusText}`;
        throw Error(message);
      } else {
        const mealsData = await response.json();
        setMeals(mealsData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const filteredMeals = meals.filter((meal) =>
    meal.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <div className="common-container">
        <div className="meals_input_container">
          <input
            type="text"
            className="meals_input"
            placeholder="Find a meal here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {!filteredMeals.length && (
            <div>
              <h2 className="no_meal_message">
                {query} is not available. Try looking for something else
              </h2>
            </div>
          )}
        </div>

        <div className="meals-container">
          {error && <h2>{error}</h2>}
          {loading && <div>Loading...</div>}

          {query
            ? filteredMeals.map((meal) => {
                const imageForMeal = images.find((img) => img.id === meal.id);
                console.log(images)
                console.log(imageForMeal)
                return (
                  <>
                    <div key={meal.id} className="meal_items">
                      <Link to={`${url}/${meal.id}`}>
                        <div className="meal_display">
                          {meal.id > 175 ? (
                            <img
                              src={common}
                              alt={meal.title}
                              className="meal-images"
                            />
                          ) : (
                            <img
                              src={imageForMeal.img}
                              alt={meal.title}
                              className="meal-images"
                            />
                          )}
                          <h5 className="meal_title">{meal.title}</h5>
                          <p>Price: {meal.price}</p>
                          <p>Location: {meal.location}</p>
                        </div>
                      </Link>
                    </div>
                  </>
                );
              })
            : meals.map((meal) => {
                const imageForMeal = images.find((img) => img.id === meal.id);
                return (
                  <>
                    <div key={meal.id} className="meal_items">
                      <Link to={`${url}/${meal.id}`}>
                        <div className="meal_display">
                          {meal.id > 175 ? (
                            <img
                              src={common}
                              alt={meal.title}
                              className="meal-images"
                            />
                          ) : (
                            <img
                              src={imageForMeal.img}
                              alt={meal.title}
                              className="meal-images"
                            />
                          )}
                          <h5 className="meal_title">{meal.title}</h5>
                          <p>Price: {meal.price}</p>
                          <p>Location: {meal.location}</p>
                        </div>
                      </Link>
                    </div>
                  </>
                );
              })}

          <Switch>
            <Route path={`${path}/:id`}>
              <Meal meals={meals} />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Meals;
