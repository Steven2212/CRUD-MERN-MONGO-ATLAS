import React from 'react'
import { useState } from 'react';

const Home = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactnum, setContactnum] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
  
const submitbtn = ()=>{
    console.log(name,email,contactnum,state,city,logo,description)
    alert("Company Details has been submitted.")
}
    
    const Maharashtra = [
        "Choose City",
      "Mumbai",
      "Pune",
      "Thane",
    ];
    const Karnataka = ["Choose City","Bangalore", "Mysore", "Hubli"];
    const TamilNadu = ["Choose City","Chennai", "Madurai", "Coimbatore"];
    
    /** Type variable to store different array for different dropdown */
    let type = null;
    
    /** This will be used to create set of options that user will see */
    let options = null;
    
    /** Setting Type variable according to dropdown */
    if (state === "Maharashtra") {
      type = Maharashtra;
    } else if (state === "Karnataka") {
      type = Karnataka;
    } else if (state === "Tamil Nadu") {
      type = TamilNadu;
    }
    
    /** If "Type" is null or undefined then options will be null,
     * otherwise it will create a options iterable based on our array
     */
    if (type) {
      options = type.map((el) => <option key={el}>{el}</option>);
    }


    return (
    <>
    <h1> Fill Up Company details :</h1>
    
    <div className='form-box'>
    <form>

  <div className="form-group row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Company Name :</label>
    <div className="col-sm-8">
      <input type="text" value={name} className="form-control" id="CName" placeholder="Enter Company Name" onChange={(e)=>setName(e.target.value)} />
    </div>
    </div>
    
    <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Company Description :</label>
    <textarea value={description} className="form-control" id="exampleFormControlTextarea1" rows="2" onChange={(e)=>setDescription(e.target.value)} ></textarea>
  </div>

  <div className="form-group row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Contact Number :</label>
    <div className="col-sm-8">
      <input type="text"  className="form-control" id="CName" placeholder="Enter Contact Number" value={contactnum} onChange={(e)=>setContactnum(e.target.value)} />
    </div>
    </div>
  
  
    <div className="form-group row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Contact Email :</label>
    <div className="col-sm-8">
      <input type="text" className="form-control" id="CName" value={email} placeholder="Enter Email Address" onChange={(e)=>setEmail(e.target.value)} />
    </div>
    </div>
  
  <div className="form-group">
    <label htmlFor="exampleFormControlFile1">Upload Company Logo : </label>
    <input type="file" className="form-control-file" id="exampleFormControlFile1" value={logo} onChange={(e)=>setLogo(e.target.value)} />
  </div>

  
        <div>
          {/** Bind changeSelectOptionHandler to onChange method of select.
           * This method will trigger every time different
           * option is selected.
           */}
          <select value={state} onChange={(e)=>setState(e.target.value)}>
            <option>Choose State :</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
          </select>
        </div>
        <div>
          <select value={city} onChange={(e)=>setCity(e.target.value)}>
            {
              /** This is where we have used our options variable */
              options
            }
          </select>
        </div>


  <button type="button" className="btn btn-primary" onClick={submitbtn} >Submit</button>



</form>
</div>

    </>
  )
}

export default Home