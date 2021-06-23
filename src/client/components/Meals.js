import React, {useState, useEffect} from 'react'
import Meal from './Meal';
import CreateMeal from './CreateMeal';
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
    const [error, setError] = useState(null)
    let {path, url} = useRouteMatch();

    useEffect(()=>{
        fetchMealsApi()
    }, [])

    const fetchMealsApi = async() =>{
        try {
        setLoading(true)
            const response = await fetch("http://localhost:5000/api/meals/")
                if(!response.ok) {
                    const message =`An error has occured : ${response.statusText}`
                    throw Error(message)
                }
                else{
                    const mealsData = await response.json()
                    setMeals(mealsData)
                    setLoading(false)
                }
            }
        catch(error) {
            setLoading(false)
            setError(error.message)
        }
    }

    
    return (
        <>
        <div className="common-container">
            <div className="meals-container">
                {error && <h2>{error}</h2>}
                {loading && <div>Loading...</div>}
                        {meals.map(meal=>{
                            return(
                                <>
                                <div key={meal.id} className="meal_items">
                                     <Link to={`${url}/${meal.id}`} >
                                    <div className="meal_display" > 
                                    {meal.id > 18 ? <img src={`/public/images/19.png`} alt={meal.title} className="meal-images"/> : <img src={`/public/images/${meal.id}.png`} alt={meal.title} className="meal-images"/>}
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
