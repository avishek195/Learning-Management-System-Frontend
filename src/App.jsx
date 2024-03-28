import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import HomeLayout from "./Layouts/HomeLayout";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      {/* <HomeLayout /> */}
    </>
  );
}

export default App;
