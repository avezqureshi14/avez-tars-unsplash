import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search Component/Search";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";

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
