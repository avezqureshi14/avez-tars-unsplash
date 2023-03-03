import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Search from "./components/Search";
function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>} ></Route>
          <Route  path="/search" element={<Search/>} ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
