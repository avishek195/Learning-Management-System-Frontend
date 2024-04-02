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

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const responce = axiosInstance.post("/courses", formData);
      toast.promise(responce, {
        loading: "Creating new Course",
        success: "Course created successfully",
        error: "failed to create course",
      });

      return (await responce).data;
    } catch (error) {
      toast.error(error?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
