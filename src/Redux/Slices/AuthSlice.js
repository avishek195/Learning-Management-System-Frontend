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
export const LoginUser = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("/user/login", data);
    toast.promise(res, {
      loading: "Wait! authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Log in",
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
  extraReducers: (builder) => {
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    });
  },
});
// const authSliceReducer = ;
// export const {} = authSlice.actions;
export default authSlice.reducer;
