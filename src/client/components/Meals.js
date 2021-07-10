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
  let API_URL = "";
  useEffect(() => {
    if (query) {
      API_URL = `/api/meals?title=${query}`;
   
    } else {
      API_URL = "/api/meals/";
    }
    fetchMealsApi();
  }, [query]);


  const fetchMealsApi = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
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

 
  return (
    <>
      <div className="common-container">
        <div className="meal_outer_container">
        <div className="meals_input_container">
          <input
            type="text"
            className="meals_input"
            placeholder="Find a meal here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="autocomplete-div">
            {query &&
            meals.map((meal) => (
              <div key={meal.id} onClick={()=>setQuery(meal.title)}>
                {meal.title}
              </div>
            ))}
          </div>
          </div>
          <div className="meals-container">
            {error && <h2>{error}</h2>}
            {loading && (
              <div>
                <h4>Loading...</h4>
              </div>
            )}
            {meals.map((meal) => {
              const imageForMeal = images.find((img) => img.id === meal.id);
              
              return (
                
                <>

                <div key={meal.id} className = {`meal_items ${meals.length==1 && "display-meal-center"}`}>
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
                        <p>Price: {(meal.price).split(".").join(",")} kr</p>
                        <p>Location: {meal.location}</p>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
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
