import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Produtos from "./Produtos";
import Cadastros from "./Cadastros";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/cadastros" element={<Cadastros />} />
      </Routes>
    </Router>
  );
};

export default App;
