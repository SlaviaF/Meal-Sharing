import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CheckAvailableReservations from './CheckAvailableReservations';

const Meal = () => {
    let {id} = useParams();
    const[meal, setMeal] = useState([])
    const[loading, setLoading] = useState(false)

    const fetchMealWithId = async()=>{
        setLoading(true)
        const response = await fetch(`http://localhost:5000/api/meals/${id}`)
        const mealData = await response.json()
        setMeal(mealData)
        setLoading(false)
    }
  
    useEffect(()=>{
        fetchMealWithId()
        
    }, [])

    return (
        <>
      <CheckAvailableReservations mealId={id} />
       <div className="common-container">
            <div>
            {loading && <div>Loading...</div>}
           <div className="single_meal">{meal[0] && meal[0].title}</div>
           </div> 
        </div> 
                           
        </>
    )
}

export default Meal

