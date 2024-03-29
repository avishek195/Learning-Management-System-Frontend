import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const responce = axiosInstance.get("/courses");
    toast.promise(responce, {
      loading: "Loading Courses...",
      success: "Courses loaded successfully...",
      error: "Failed to load Courses",
    });
    return (await responce).data.courses;
  } catch (error) {
    toast.error(error?.message);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
      // console.log(...action.payload);
    });
  },
});

export default courseSlice.reducer;
