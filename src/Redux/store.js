import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import razorpaySliceReducer from "./Slices/RazorpaySlice";
import lectureSliceReducer from "./Slices/LectureSlice";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    rezorpay: razorpaySliceReducer,
    lecture: lectureSliceReducer,
  },
  devTools: true,
});

export default store;
