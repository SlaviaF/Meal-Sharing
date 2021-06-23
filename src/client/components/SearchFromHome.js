import React, {useState, useEffect} from 'react'
import useDebounce from './useDebounce'

const SearchFromHome = () => {
    const[query, setQuery] = useState("")
    const[meals, setMeals]= useState([])
    const debouceValue = useDebounce(query)
  
    const fetchSearchedMeals = async() =>{
        if(query){
            const response = await fetch(`http://localhost:5000/api/meals?title=${debouceValue}`)
            const searchedMeals = await response.json()
            console.log(searchedMeals)
            setMeals(searchedMeals)
        }
    }
  
    useEffect(()=>{
        if(debouceValue.length>0){
            fetchSearchedMeals()
        }
    }, [debouceValue])
    console.log(query)
    return (
    <>
        <div className="home-search">
            <input type="text" placeholder="search your meal"className="home_input"value={query} onChange={(e)=>setQuery(e.target.value)} />
            <ul>
            {query && meals.map(meal=><li key={meal.id}>{meal.title}</li>)}
       
            </ul>
        </div>
        </>
    )
}

export default SearchFromHome
