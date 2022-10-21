import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Home = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contactnum, setContactnum] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // For Form Validation
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  //To Add data to our MongoDB.

  const submitbtn = async () => {
    // e.preventDefault();
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
    props.showAlert("User Details has been submitted successfully.", "success");

    //To make the form empty once form has been successfully submitted.
    reset(); //using this we can reset the form easily.
    setCity("");
    setContactnum("");
    setDescription("");
    setEmail("");
    setName("");
    setState("");
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
        <form onSubmit={handleSubmit(submitbtn)}>
         
          {/* Company Name  */}

          <div className="form-group ">
            <label>Company Name :</label>
            <input
              type="text"
              autoComplete="new-name"
              className={`form-control ${errors.name && "invalid"}`}
              id="name-input"
              name="name"
              placeholder="Enter Company Name"
              {...register("name", { required: "Name is required." })}
              onInput={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          {/* Description  */}

          <div className="form-group">
            <label>Company Description :</label>
            <textarea
              className={`form-control ${errors.description && "invalid"}`}
              autoComplete="new-description"
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

          <div className="form-group  contactnum-box">
            <label>Contact Number :</label>
            <input
              type="number"
              className={`form-control ${errors.contactnum && "invalid"}`}
              id="contactnum-input"
              name="contactnum"
              autoComplete="new-contactnum"
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
              onInput={(e) => setContactnum(e.target.value)}
            />
            {errors.contactnum && (
              <small className="text-danger">{errors.contactnum.message}</small>
            )}
          </div>

          {/* Email ID */}

          <div className="form-group " id="email-container">
            <label>Contact Email :</label>
            <input
              type="text"
              className={`form-control ${errors.email && "invalid"}`}
              autoComplete="new-email"
              id="email-input"
              name="email"
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

          {/* State Name */}

          <div className="Place">
            <div>
              <select
                {...register("state", { required: "State Name is required." })}
                onInput={(e) => setState(e.target.value)}
              >
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
              <select
                {...register("city", {
                  required: "State and City Name is required.",
                })}
                onInput={(e) => setCity(e.target.value)}
              >
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

          {/* Submit Button */}

          <button
            type="submit"
            id="add-submitbtn"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
