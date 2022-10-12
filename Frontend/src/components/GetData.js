import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

  const GetData = () => {

    const [userlist, setUserlist] = useState([])

    useEffect(() => {
        getUserData();
    }, [])

    //To Fetch Data
    const getUserData = async () => {
        let result = await fetch("http://localhost:5000/userdata");
        result = await result.json()
        setUserlist(result);
    }
  
//To Delete Data :

  async  function deleteData(id){
    let result = fetch(`http://localhost:5000/deletedata/${id}`,{
        method:'DELETE'})
        // result = await result.json() 
        getUserData()
        if (result) {
          getUserData(); //when we delete the api, the change should be visible immediately. hence we put getProducts in useEffect hook. Now it will display the products immediately as the product gets deleted.
        } 
  }
  
//To Search Data :

const searchHandle = async (event)=>{
  let key = event.target.value //the words we search
  if(key){     //if any word is searched and it matches, then show that data.
      let result= await fetch(`http://localhost:5000/search/${key}`)
      result = await result.json()
      if(result){
          setUserlist(result) //will show the searched product
      }
  }
  else{
      getUserData(); //if no words are searched then whole list will be shown.
  }
}


  return (
    <>
    <h1>User Data List</h1>

    <input className="search-input" onChange={searchHandle} type="search" placeholder="Search"/>
    <button className="btn btn-info" type="submit" id='search-btn' >Search</button>

    <div className="userdata-list " >
          <table className="table table-dark">
            <tbody>
              <tr id='table-head' >
                <td>Sr.No</td>
                <td>Company Name</td>
                <td>Description</td>
                <td>Contact Number</td>
                <td>Email</td>
                <td>State</td>
                <td>City</td>
                <td>Delete</td>
                <td>Update</td>
              </tr>
              {
                userlist.length>0? userlist.map((item, index) =>              
                  <tr key={item._id}>
                 <td>{index + 1}</td> 
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.contactnum}</td>
                  <td>{item.email}</td>
                  <td>{item.state}</td>
                  <td>{item.city}</td>              
                  <td><button className="btn btn-secondary" id='delete-btn' onClick={()=>deleteData(item._id)}>Delete</button></td>
                  <td><Link to={"/updatedata/"+item._id}>Edit</Link></td>
                  </tr> 
                  ):<h1>No Result Found.</h1> 
                  }
            </tbody>
          </table>
      </div>
    </>
  )
  }

export default GetData ;