
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AddDetail from './components/AddDetail'
import UpdateData from './components/UpdateData';
import GetData from './components/GetData';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<GetData />}>
          </Route>
          <Route exact path="/form" element={<AddDetail />}>
          </Route>
          <Route path='/updatedata/:id' element={<UpdateData/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
