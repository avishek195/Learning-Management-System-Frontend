import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../Helpers/axiosinstance.js";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("/user/register", data);
    toast.promise(res, {
      loading: "Wait! createing your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (err) {
    toast.err(err?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
const authSliceReducer = authSlice.reducer;
// export const {} = authSlice.actions;
export default authSliceReducer;
