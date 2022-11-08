
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import AddDetail from './components/AddDetail'
import UpdateData from './components/UpdateData';
import GetData from './components/GetData';
import Alert from './components/Alert';

function App() {

//Alerts 

  const [alert, setAlert] = useState(null)    
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2000);
}

  return (
    <>
      <Router>
        <Navbar />
        <Alert alert={alert}  />
        <Routes>
          <Route exact path="/" element={<GetData showAlert={showAlert}  />}>
          </Route>
          <Route  exact path="/form" element={<AddDetail showAlert={showAlert}/>}>
          </Route>
          <Route path='/updatedata/:id' element={<UpdateData showAlert={showAlert}  />}></Route>
        </Routes>

      </Router>
     
    </>
  );
}

export default App;
