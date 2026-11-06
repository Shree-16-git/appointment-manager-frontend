import {useState, useEffect} from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App(){
  const [appointments, setAppointments] = useState([]);
  const [title, setTitle] = useState()
  const [date, setDate] = useState()

  useEffect(() => {
    fetch(`${API_URL}/appointments`)
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, [])

  const onDelete = async (id) =>{
    try{
      fetch(`${API_URL}/appointments/${id}`, {method: "DELETE"})
      setAppointments(appointments.filter(each => each._id !== id))
    } catch(e){
      console.log(`Failed to delete: ${e.message}`)
    }

    
  }

  const onAdd = async (e) => {
    e.preventDefault()

    const appointmentDetails = {
      title,
      date
    }
    const options = {
      method: "POST",
      headers: {"Content-type" : "application/json"},
      body: JSON.stringify(appointmentDetails),
    }

    try{
      const res = await fetch(`${API_URL}/appointments`, options)
      const newAppointment = await res.json()
      setAppointments([...appointments, newAppointment])
      setTitle("")
      setDate("")
    } catch{
      console.log("Failed to fetch")
    }
    

  }

  return(
    <div className="container">
      <h1 className='heading'>Appointment App</h1>
      <form onSubmit={onAdd} className='form'>
        <input className='input' type='text' placeholder='Title' value = {title} onChange={(e) => setTitle(e.target.value)}/>
        <input className='input' type='date' value = {date} onChange={(e) => setDate(e.target.value)}/>
        <button className='add-btn' type='submit'>Add</button>
      </form>
      <ul className='list'>
        {appointments.map(eachItem => (
          <li key = {eachItem._id} className='item'>
            <p>{eachItem.title} - {eachItem.date}</p>
            <button className='delete-btn' onClick = {() => onDelete(eachItem._id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default App