import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import HomeLayout from "./Layouts/HomeLayout";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
