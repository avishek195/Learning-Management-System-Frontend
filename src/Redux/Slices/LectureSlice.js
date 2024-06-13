import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  lectures: [],
};

export const getCourseLectures = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const res = axiosInstance.get(`/courses/${cid}`);
      toast.promise(res, {
        loading: "Fetching course lectures",
        success: "Lecture Fetching successfully",
        error: "Failed to load the lectures",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const res = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(res, {
        loading: "Adding course lectures",
        success: "Lecture added successfully",
        error: "Failed to add the lectures",
      });
      return (await res).data;
    } catch (error) {
      toast.err(error?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const res = axiosInstance.delete(
        `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(res, {
        loading: "deleting course lectures",
        success: "Lecture deleted successfully",
        error: "Failed to delete the lectures",
      });
      return (await res).data;
    } catch (error) {
      toast.err(error?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = state.lectures = action?.payload?.lectures;
      });
  },
});

export default lectureSlice.reducer;
