import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CheckAvailableReservations from './CheckAvailableReservations';
import ReviewForm from './ReviewForm';
const Meal = () => {
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
    let {id} = useParams();
    const[meal, setMeal] = useState([])
    const[loading, setLoading] = useState(false)

    const fetchMealWithId = async()=>{
    try{
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/meals/${id}`)
        if(!response.ok) {
            const message =`An error has occured : ${response.statusText}`
            throw Error(message)
        }
        else{
            const mealData = await response.json()
            setMeal(mealData)
            setLoading(false)
        }
        
    }
    catch(error) {
        setLoading(false)
        setError(error.message)
    }
}
    useEffect(()=>{
        fetchMealWithId()
        
    }, [])

    return (
        <>
       <div className="common-container common-bg">
           <div className="meal-container">
            <div className="single-meal-container">
            {loading && <div>Loading...</div>}
           <div className="single_meal">
               {meal[0] &&  <div className="single_meal_inner"> 
                            <ul>
                                <li><img src={`/public/images/${id}.png`} alt={meal.title}/></li> 
                                <li className="heading">{meal[0].title}</li>
                                <li>{meal[0].description}</li>
                                <li>{meal[0].price}</li>
                            </ul>
                            </div> 
                            }
                            <button className="review-button" onClick={()=>{setIsReviewFormVisible(!isReviewFormVisible)}}>Review this meal</button>

               </div>
               </div> 
           <div className="reservation-review-container">
           {isReviewFormVisible && <div className="review-form"><ReviewForm mealId={id}/></div>}
           <CheckAvailableReservations mealId={id} />
           </div>
           </div>
        </div> 
        </>
    )
}

export default Meal

