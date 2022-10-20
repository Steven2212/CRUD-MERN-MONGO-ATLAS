import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Alert from "./Alert";

const GetData = (props) => {

  const [userlist, setUserlist] = useState([]);

  //For Pagination
  const [currentPage, setCurrentPage] = useState([1]);
  const [postsPerPage, setPostsPerPage] = useState([5]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = userlist.slice(firstPostIndex, lastPostIndex);

  // To see the list of data immediately once data is updated or deleted.
  useEffect(() => {
    getUserData();
  }, []);

  //To Fetch Data

  const getUserData = async () => {
    let result = await fetch("http://localhost:5000/userdata");
    result = await result.json();
    setUserlist(result);
  };

  //To Delete Data :

  async function deleteData(id) {
    let result = fetch(`http://localhost:5000/deletedata/${id}`, {
      method: "DELETE",
    });
    getUserData();
    if (result) {
      getUserData();
      props.showAlert("User Data has been deleted successfully.","success")
    }
  }

  //To Search Data :

  const searchHandle = async (event) => {
    let key = event.target.value; 
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setUserlist(result); 
        console.log(setUserlist);
      }
    } else {
      getUserData(); //if no words are searched then whole list of data will be shown.
    }
  };

  return (
    <>
      <h1 id="datalist-h1">Company Data List</h1>

      {/* Search Input */}

      <input
        className="search-input"
        onChange={searchHandle}
        type="search"
        placeholder="Search"
      />

      {/* Data Table */}

      <div className="userdata-list ">
        <table className="table table-dark">
          <tbody>
            <tr id="table-head">
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
            {currentPosts.length > 0 ? (
              currentPosts.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.contactnum}</td>
                  <td>{item.email}</td>
                  <td>{item.state}</td>
                  <td>{item.city}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      id="delete-btn"
                      onClick={() => deleteData(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={"/updatedata/" + item._id}>Edit</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <Pagination
        totalPosts={userlist.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default GetData;
