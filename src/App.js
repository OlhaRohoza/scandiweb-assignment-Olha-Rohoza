import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import PLP from "./pages/PLP";
import PDP from "./pages/PDP";
import Cart from "./pages/Cart";
import PLPf from "./pages/PLP";



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PLP select={'all'} />} />
          <Route exact path="/tech" element={<PLP select={'tech'} />} />
          <Route exact path="/clothes" element={<PLP select={'clothes'} />} />
          <Route path="/PDP/:id" element={<PDP />} name='PDP' />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
