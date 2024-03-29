import { BsPersonCircle } from "react-icons/bs";
import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { LoginUser } from "../Redux/Slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...logindata,
      [name]: value,
    });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    if (!logindata.email || !logindata.password) {
      toast.error("Please fill out all fields!");
      return;
    }

    const responce = await dispatch(LoginUser(logindata));
    // console.log(responce);
    if (responce?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">LogIn Page</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={logindata.email}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Password.."
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={logindata.password}
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg"
          >
            Login
          </button>

          <p className="text-center">
            Don't have an account ?{" "}
            <Link to="/signup" className="link text-accent">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Login;
