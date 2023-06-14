import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Developers from "../pages/Developers";
import Location from "../pages/Location";

const ReactRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/searchResult/:location" element={<Location />} />
      </Routes> 
  );
};

export default ReactRoutes;
