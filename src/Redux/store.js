import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import razorpaySliceReducer from "./Slices/RazorpaySlice";
const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    rezorpay: razorpaySliceReducer,
  },
  devTools: true,
});

export default store;
