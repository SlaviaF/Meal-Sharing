import React, {useState} from 'react'


const Forms = (props) => {

console.log(props.mealId)
const[custname, setCustName] = useState('name')
const[phone, setPhone] = useState('')
const[email, setEmail] = useState('email@email.com')
const[guests, setGuests] = useState('')

const onSubmit=(e)=>{
    e.preventDefault()
    fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            contact_name:custname,
            contact_phonenumber:phone, 
            contact_email:email, 
            number_of_guests:guests,
            meals_id:props.mealId
         })
    })
    .then(response =>response.json())
    .then(data =>{
        if(!data){
            throw "Reservation not successfull. try again"
        }
        else{
         //   setReservationInfo(data)
            alert("Your reservation is done")
        }

    })
   
}

    return (
      
       <form onSubmit={onSubmit}>
           <label htmlFor="name">Name</label>
           <input type="text"
                id="name"
                placeholder="Enter your name"
                value={custname}
                onChange={(e)=>setCustName(e.target.value)}
            />

            <label htmlFor="phone">Phone</label>
            <input type="number"
                id="phone"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input type="email"
                id="email"
                placeholder="Enter you email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <label htmlFor="">Guest Count</label>
            <input type="number"
                id="number_of_guests"
                placeholder="Enter guest count"
                value={guests}
                onChange={(e)=>setGuests(e.target.value)}
            />
            <button>Click</button>
       </form>
  
                 
    )
}

export default Forms
