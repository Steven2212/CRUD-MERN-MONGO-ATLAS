import React from "react";
import { useState } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactnum, setContactnum] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  //To Add data to our MongoDB.

  const submitbtn = async (e) => {
    e.preventDefault();
    if (!name || !email || !description || !contactnum || !state || !city) {
      alert("Error! Please fill all the fields.");
    } else {
      let result = await fetch(`http://localhost:5000/form`, {
        method: "post",
        body: JSON.stringify({
          name,
          email,
          contactnum,
          description,
          state,
          city,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      localStorage.setItem("userdetails", JSON.stringify(result));
      props.showAlert("User Details has been submitted successfully.","success");
      
      //To make the form empty once form has been successfully submitted.

      setCity("");
      setContactnum("");
      setDescription("");
      setEmail("");
      setName("");
      setState("");
    }
  };

// State and City dropdowns input:

  const Maharashtra = ["Choose City", "Mumbai", "Pune", "Thane"];
  const Karnataka = ["Choose City", "Bangalore", "Mysore", "Hubli"];
  const TamilNadu = ["Choose City", "Chennai", "Madurai", "Coimbatore"];

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

  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  return (
    <>
      <h1 className="add-userdetail-h1"> Fill Up Company details :</h1>
      <div className="form-box">
        <form method="post" encType="multipart/form-data">
          
          {/* Company Name  */}

          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              Company Name :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                value={name}
                autoComplete="off"
                className="form-control"
                id="name-input"
                name="name"
                placeholder="Enter Company Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Description  */}

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Company <br />
              Description :
            </label>
            <textarea
              value={description}
              className="form-control"
              autoComplete="off"
              type="text"
              id="description-input"
              name="description"
              placeholder="Enter Description"
              rows="2"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

        {/* Contact Number */}

          <div className="form-group row">
            <label
              htmlFor="inputPassword"
              id="contactnum-label"
              className="col-sm-2 col-form-label"
            >
              Contact Number :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="contactnum-input"
                name="contactnum"
                autoComplete="off"
                placeholder="Enter Contact Number"
                value={contactnum}
                onChange={(e) => setContactnum(e.target.value)}
              />
            </div>
          </div>

        {/* Email ID */}

          <div className="form-group row" id="email-container">
            <label
              htmlFor="inputPassword"
              id="email-label"
              className="col-sm-2 col-form-label"
            >
              Contact Email :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="email-input"
                name="email"
                value={email}
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* State Name */}

          <div className="Address">
            <div>
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option>Choose State :</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
              </select>
            </div>

            {/* City Name */}

            <div>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                {
                  /** This is where we have used our options variable */
                  options
                }
              </select>
            </div>
          </div>

        {/* Submit Button */}

          <button
            type="submit"
            id="add-submitbtn"
            className="btn btn-primary"
            onClick={submitbtn}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
