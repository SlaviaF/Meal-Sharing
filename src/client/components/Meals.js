import React, {useState, useEffect} from 'react'
import Meal from './Meal';
import {
    BrowserRouter as Router,
    Route, 
    Switch, 
    Link,
    useRouteMatch
  } from "react-router-dom";

const Meals = () => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    let {path, url} = useRouteMatch();


    useEffect(()=>{
        fetchMealsApi()
    }, [])

    const fetchMealsApi =   async() =>{
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/meals/")
        const mealsData = await response.json()
        setMeals(mealsData)
        setLoading(false)
    }

    return (
        <>
        <div className="common-container">
            <div className="meals-container">
                {loading && <div>Loading...</div>}
                   
                        {meals.map(meal=>{
                            return(
                                <>
                                <div className="meal_items" key={meal.id} >
                                     <Link to={`${url}/${meal.id}`} >
                                    <div className="meal_display" > 
                                    <h5 className="meal_title">{meal.title}</h5>
                                    <p>Price: {meal.price}</p>
                                    <p>Location: {meal.location}</p>
                                </div>
                                </Link>   
                            </div>   
                            
                            </>    
                                )
                         })} 

                                <Switch>
                                 <Route path={`${path}/:id`}>
                                   <Meal meals={meals}/>
                                 </Route>
                               </Switch>    
                             
        </div>
        </div>
  </>
    )
                      
}

export default Meals
