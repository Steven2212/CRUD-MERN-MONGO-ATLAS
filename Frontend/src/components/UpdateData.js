import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const UpdateData = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactnum, setContactnum] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    updateBtn();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //To Prefill the form when clicken on edit button.

  const updateBtn = async () => {
    let result = await fetch(`http://localhost:5000/userdata/${params.id}`);
    result = await result.json();
    console.log(result);

    setName(result.name); 
    setDescription(result.description);
    setContactnum(result.contactnum);
    setEmail(result.email);
    setState(result.state);
    setCity(result.city);
  };

//Update or Edit Data in MongoDB.
  
  const updatedata = async (e) => {
    e.preventDefault();
    if (!name || !email || !description || !contactnum || !state || !city) {
      alert("Error! Please fill all the fields.");
    } else {
      let result = await fetch(
        `http://localhost:5000/updatedata/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
            description,
            contactnum,
            email,
            state,
            city,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      result = await result.json();
      console.log(result);
      navigate("/"); 
      props.showAlert("User Data has been updated successfully.","success")
    }
  };

  // State and City dropdowns update input:

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
      <h1 id="updateform-h1">Update Form</h1>
      <div className="form-box" style={{"backgroundColor":"lightgoldenrodyellow"}}>
        <form  onSubmit={handleSubmit(updatedata)} method="put" encType="multipart/form-data">
  
        {/* Company Name */}
  
          <div className="form-group">
            <label>
              Company Name :
            </label>
            <div >
              <input
                type="text"
                value={name}
                autoComplete="off"
                className="form-control"
                id="name-input"
                name="name"
                placeholder="Enter Company Name"
                {...register("name", { required: "Name is required." })}
                onKeyUp={() => {
                  trigger("name");
                }}

                onInput={(e) => setName(e.target.value)}
              />
              
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
            </div>
          </div>

          {/* Description */}

          <div className="form-group">
            <label>
              Company Description :
            </label>
            <textarea
              value={description}
              className="form-control"
              autoComplete="off"
              type="text"
              id="description-input"
              name="description"
              placeholder="Enter Description"
              {...register("description", {
                required: "Description is required.",
                minLength: {
                  value: 10,
                  message: "Minimum required length is 10.",
                },
                maxLength: {
                  value: 50,
                  message: "Max allowed length is 50.",
                },
              })}
              onKeyUp={() => {
                trigger("description");
              }}
              rows="2"
              onInput={(e) => setDescription(e.target.value)}
            ></textarea>
          {errors.description && (
              <small className="text-danger descriptionerror">
                {errors.description.message}
              </small>
            )}
          </div>

          {/* Contact Number */}

          <div className="form-group row">
            <label
            >
              Contact Number :
            </label>
            <div>
              <input
                type="text"
                className="form-control"
                id="contactnum-input"
                name="contactnum"
                autoComplete="off"
                placeholder="Enter Contact Number"
                {...register("contactnum", {
                  required: "Contact Number is required.",
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Invalid Phone Number.",
                  },
                })}
                onKeyUp={() => {
                  trigger("contactnum");
                }}
  
                value={contactnum}
                onInput={(e) => setContactnum(e.target.value)}
              />
            {errors.contactnum && (
              <small className="text-danger">{errors.contactnum.message}</small>
            )}
         
            </div>
          </div>

          {/* Email ID */}

          <div className="form-group" id="email-container">
            <label
            >
              Contact Email :
            </label>
            <div >
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                id="email-input"
                name="email"
                value={email}
                placeholder="Enter Email Address"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                    message: "Invalid email address.",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
           
                onInput={(e) => setEmail(e.target.value)}
              />
               {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
         
            </div>
          </div>

          {/* State Name */}

          <div className="Place">
            <div>
              <select {...register("state", { required: "State name is required." })}
                                 onKeyUp={() => {
                                  trigger("state");
                                }}
                 value={state} onInput={(e) => setState(e.target.value)}>
                <option>Choose State :</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
              </select>
              {errors.state && (
              <small className="text-danger">{errors.state.message}</small>
            )}

            </div>

            {/* City Name */}

            <div className="city">
              <select {...register("city", { required: "City name is required." })}
                                onKeyUp={() => {
                                  trigger("city");
                                }}
                value={city} onInput={(e) => setCity(e.target.value)}>
                {
                  /** This is where we have used our options variable */
                  options
                }
              </select>
              {errors.city && (
              <small className="text-danger">{errors.city.message}</small>
            )}

            </div>
          </div>

            {/* Update Button */}

          <button
            type="submit"
            id="update-submitbtn"
            className="btn btn-primary"
            onClick={updatedata}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateData;