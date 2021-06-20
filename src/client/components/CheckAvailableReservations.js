import React, {useState, useEffect} from 'react'
 import Forms from './Forms'

const CheckAvailableReservations = (props) => {
    console.log(props.mealId)
   const[reservations, setReservations] = useState([])
    const[loading, setLoading] = useState(true)
    const[isReservationFormVisible, setIsReservationFormVisible] = useState(false)
    useEffect(()=>{
        fetchAvailableReservations()
    }, [])

    const fetchAvailableReservations = async() => {
        setLoading(true)
        const response = await fetch("http://localhost:5000/api/meals?availableReservations=true")
        const availableReservations = await response.json()
        console.log(availableReservations)
        setReservations(availableReservations)
        setLoading(false)
    
    }

   
     const getReservationForMeal = async() => {
            const reservationForMeal = await reservations.find(reservation=>reservation.id === Number(props.mealId))
            const total_reservations = await reservationForMeal.total_reservations
            const max_reservations = await reservationForMeal.max_reservations
            console.log(total_reservations)
            console.log(max_reservations)
            if(max_reservations<=total_reservations){
                setIsReservationFormVisible(false)
            }else {
                setIsReservationFormVisible(true)
            }
            return
        }
    
        getReservationForMeal()
                             
    return (
        <>
        <div className="common-container">       
        {isReservationFormVisible && <Forms mealId={props.mealId}/>}
        </div>

        </>
    )
}

export default CheckAvailableReservations
