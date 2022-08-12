import React from "react";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import PLP from "./pages/PLP";
import PDP from "./pages/PDP";
import Cart from "./pages/Cart";


class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes >
          {/* PLP - product listing page, a.k.a. category page = three categories: all, tech, clothes */}
          <Route exact path="/" element={<PLP select={'all'} />} />
          <Route exact path="/tech" element={<PLP select={'tech'} />} />
          <Route exact path="/clothes" element={<PLP select={'clothes'} />} />
          {/* PDP - product description page, a.k.a. product page => id = "product id" */}
          <Route path="/PDP/:id" element={<PDP />} name='PDP' />
          {/* Cart page */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
