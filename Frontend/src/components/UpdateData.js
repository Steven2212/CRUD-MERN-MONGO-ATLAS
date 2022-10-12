import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdateData = () => {
  
  const params = useParams()
  const navigate = useNavigate()
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [contactnum, setContactnum] = useState("")
const [email, setEmail] = useState("")
const [state, setState] = useState("")
const [city, setCity] = useState("")

useEffect(() => {
  updateBtn();
}, [])


const updateBtn = async ()=>{
  let result = await fetch(`http://localhost:5000/userdata/${params.id}`)
  result = await result.json()
  console.log(result)
  setName(result.name) //to fill the name automatically in the input field when clicked on update in product list page.
  setDescription(result.description)
  setContactnum(result.contactnum)
  setEmail(result.email)
  setState(result.state)
  setCity(result.city)
  }

const updatedata = async ()=>{

  let result = await fetch(`http://localhost:5000/updatedata/${params.id}`,{
        method:'PUT',
        body:JSON.stringify({name,description,contactnum,email,state,city}),
        headers:{'Content-Type':'application/json'}
    })
    result=await result.json()    
    console.log(result);
    navigate('/') //once update is done, we will be navigated to the homepage.
}






  return ( 
    <>
    
    <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className='inputBox' placeholder='Enter Company name' />
        {/* {error && !name && <span className="invalid-input"> Enter valid name.</span>} */}
        {/* in the above code if default error is false (which means we are entering newly) and name is not there then it will send this error. */}
       
        <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}  className='inputBox' placeholder='Enter description' />
        {/* {error && !description && <span className="invalid-input"> Enter valid description.</span>} */}

        <input type="text" onChange={(e)=>setContactnum(e.target.value)} value={contactnum}  className='inputBox' placeholder='Enter Contact number' />
        {/* {error && !contactnum && <span className="invalid-input"> Enter valid contact number.</span>} */}

        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email}  className='inputBox' placeholder='Enter Email id' />
        {/* {error && !email && <span className="invalid-input"> Enter valid Email</span>} */}

        <input type="text" onChange={(e)=>setState(e.target.value)} value={state}  className='inputBox' placeholder='Enter State name.' />
        {/* {error && !state && <span className="invalid-input"> Enter valid State</span>} */}

        <input type="text" onChange={(e)=>setCity(e.target.value)} value={city}  className='inputBox' placeholder='Enter City name.' />
        {/* {error && !city && <span className="invalid-input"> Enter valid City </span>} */}

        <button onClick={updatedata}  className='appButton' type='button' >Update</button>



    </>
  )
}

export default UpdateData