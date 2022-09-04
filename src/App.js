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
          {/* PDP - product description page, a.k.a. product page => id = "product id" */}
          <Route path="/PDP/:id" element={<PDP />} name='PDP' />
          {/* Cart page */}
          <Route path="/cart" element={<Cart />} />
          {/* PLP - product listing page, a.k.a. category page = three categories: all, tech, clothes */}
          <Route exact path="/:category" element={<PLP />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
