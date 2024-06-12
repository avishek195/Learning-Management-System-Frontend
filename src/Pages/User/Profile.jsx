import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { cancelCourseBundel } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  async function handleCencellation() {
    toast.info("Initiating cancellation");
    await dispatch(cancelCourseBundel());
    await dispatch(getUserData());
    toast.success("CanCellation complete");
    naviagte("/");
  }

  useEffect(() => {
    // dispatch(getUserData())
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-120 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            alt="profile pic"
            className="w-40 m-auto rounded-full border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullname}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email : </p>
            <p>{userData?.email}</p>
            <p>Role: </p> <p>{userData?.role}</p>
            <p>Subscription: </p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold text-center cursor-pointer py-2"
            >
              Change Password
            </Link>

            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold text-center cursor-pointer py-2"
            >
              Edit Profile
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button className="w-full bg-red bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold text-center cursor-pointer py-2">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
