import React, {useState, useEffect} from 'react'

const Reviews = () => {
    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[meal, setMeal] = useState("")
    const[loading, setLoading] = useState(true)
   // const[stars, setstars] = useState("")Data
console.log(meal)
   const fetchReviews = async() => {
       setLoading(false)
       if(meal!==""&& !null){
        const response = await fetch(`http://localhost:5000/api/meals?title=${meal}`)
        const mealsData = await response.json()
        console.log(mealsData)
        setLoading(false)
       }
      
       }
 
      //  const mealsTitle = mealsData.
   

   useEffect(()=>{
        fetchReviews()
   }, [])

   // const onSubmit = () =>{
      /*  e.preventDefault()
        fetch('http://localhost:5000/api/reviews'),{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                title:title,
                description:description
             //  meals_id:, 
            //get mealid from the meal above
             })
             .then(response => response.json())
             .then(data => {
                 if(data){
                    alert("Thank you for your feedback")       
                 }
                })
      
    }}*/
    return (
        <div className="common-container">
           <form>
           <label htmlFor="title">Title</label>
           <input type="text"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <input type="text"
                id="descrioption"
                placeholder="Say something"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />

            <label htmlFor="meal">Meal</label>
            <input type="text"
                id="meal"
                placeholder="Enter meal"
                value={meal}
                onChange={(e)=>setMeal(e.target.value)}
            />

       
            <button>Click</button>
       </form>
   
        </div>
    )
}

export default Reviews
