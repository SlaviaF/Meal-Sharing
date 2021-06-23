import React, {useState} from 'react'
import ReactStars from "react-rating-stars-component";

const ReviewForm = ({mealId}) => {
    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")
    const[stars, setStars] = useState(1)
   
     const onSubmit = (e) =>{
         console.log("reviews")
       e.preventDefault()
        fetch('http://localhost:5000/api/reviews',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                title:title,
                description:description,
                meals_id:mealId, 
                stars:stars
             })
            })
             .then(response =>response.json())
             .then(data => {
                 console.log({data})
                 if(!data){
                    alert("You review was not posted. Kindly try again")       
                 }
                 else{
                     alert("Thank you for your feedback")
                 }
                })
    }
    console.log({stars})
    
    if(stars > 5){
        setStars(5)
    }
    else if(stars <= 0){
        setStars(1)
    }

    
    return (
        
            <div className="form-container">
            <form onSubmit={onSubmit}>
                <div><h3>Tell us your experience!!!</h3></div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"
                            className="form-control"
                            id="title"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text"
                        className="form-control"
                        id="descrioption"
                        placeholder="Say something"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stars">stars</label>
                    <input type="number"
                        className="form-control"
                        id="number"
                        value={stars}
                        onChange={(e)=>setStars(e.target.value)}
                    />
                </div>
      
                <button type="submit">Click</button>
           </form>
       
            </div>
            )
        }

export default ReviewForm
