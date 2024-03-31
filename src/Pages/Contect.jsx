import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosinstance";

const Contect = () => {
  const [contectFrom, setContectForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputs = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setContectForm({
      ...contectFrom,
      [name]: value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!contectFrom.name || !contectFrom.email || !contectFrom.message) {
      toast.error("All fields are required");
      return;
    }

    if (
      !contectFrom.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ) {
      toast.error("Invalid email address");
      return;
    }
    try {
      const responce = axiosInstance.post("/contact", contectFrom);
      toast.promise(responce, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contectresponce = await responce;
      console.log(contectresponce);
      if (contectresponce?.data?.success) {
        setContectForm({
          ...contectFrom,
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
          <form
            onSubmit={onSubmitForm}
            className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
          >
            <h1 className="text-3xl font-semibold">Contact Form</h1>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="name" className="text-xl font-semibold">
                Name
              </label>
              <input
                onChange={handleInputs}
                className="bg-transparent border px-2 py-1 rounded-sm"
                id="name"
                type="text"
                name="name"
                value={contectFrom.name}
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="email" className="text-xl font-semibold">
                Email
              </label>
              <input
                onChange={handleInputs}
                className="bg-transparent border px-2 py-1 rounded-sm"
                id="email"
                type="email"
                name="email"
                value={contectFrom.email}
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <label htmlFor="message" className="text-xl font-semibold">
                Message
              </label>
              <textarea
                onChange={handleInputs}
                className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                id="message"
                type="message"
                name="message"
                value={contectFrom.message}
                placeholder="Enter your message"
              />
            </div>
            <button
              type="submit"
              className="w-full  
            py-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold text-xl"
            >
              Submit
            </button>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Contect;
