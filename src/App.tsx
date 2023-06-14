import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Category from "./components/category";
import Home from "./components/home";

const App: React.FC = () => {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/happiness" element={<Category  category="happiness"/>} />
        <Route path="/friendship" element={<Category  category="friendship"/>} />
        <Route path="/success" element={<Category  category="success"/>} />
        <Route path="/knowledge" element={<Category  category="knowledge"/>} />
        <Route path="/inspirational" element={<Category  category="inspirational"/>} />
        <Route path="/beauty" element={<Category  category="beauty"/>} />
        <Route path="/love" element={<Category  category="love"/>} />
        <Route path="/courage" element={<Category  category="courage"/>} />
        <Route path="/life" element={<Category  category="life"/>} />
        <Route path="/money" element={<Category  category="money"/>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
