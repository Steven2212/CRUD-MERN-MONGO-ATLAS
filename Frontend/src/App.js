
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import List from './components/List';
import AddDetail from './components/AddDetail'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<List />}>
          </Route>
          <Route exact path="/form" element={<AddDetail />}>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
