import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Pagination} from "antd";


const GetData = (props) => {

  const [userlist, setUserlist] = useState([]);

  //For Pagination

  const [posts, setPosts] = useState([])
  const [total, setTotal] = useState("")
  const [page, setPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10) //keep it 10 or 5.

const indexOfLastPage = page * postPerPage
const indexOfFirstPage = indexOfLastPage - postPerPage
const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage)

const onShowSizeChange =(current,pageSize)=>{
  setPostPerPage(pageSize)
}

const itemRender = (current,type,originalElement) =>{
  if(type === "prev"){
    return <Link>Previous</Link>
  }
  if(type === "next"){
    return <Link>Next</Link>
  }
  return originalElement;
}

  // To see the list of data immediately once data is updated or deleted.
  useEffect(() => {
    getUserData();
  }, []);

  //To Fetch Data

  const getUserData = async () => {
    let result = await fetch("http://localhost:5000/userdata");
    result = await result.json();
    setUserlist(result);
    setPosts(result);
    setTotal(result.length)

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
        <div className="pagination-box">
  
      <Pagination
        onChange={(value)=>setPage(value)}
        pageSize={postPerPage}
        total = {total}
        current={page}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}

/>
</div>
    </>
  );
};

export default GetData;
