import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const responce = await axiosInstance.get("/payments/razorpay-key");
    return responce.data;
  } catch (error) {
    toast.error("Failed to load data");
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const responce = await axiosInstance.post("/payments/subscribe");
      return responce.data;
    } catch (error) {
      toast.error(error?.responce?.data?.message);
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const responce = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return responce.data;
    } catch (error) {
      toast.error(error?.responce?.data?.message);
    }
  }
);

export const getPaymentRecords = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const responce = await axiosInstance.get("/payments?count=100");
      toast.promise(responce, {
        loading: "Getting the payment records",
        success: (data) => {
          return data?.data?.mesage;
        },
        error: "Failed to get payment records",
      });
      return (await responce).data;
    } catch (error) {
      toast.error("Oparation failed");
    }
  }
);

export const cancelCourseBundel = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const responce = await axiosInstance.get("/payments/unsubscribe");
      toast.promise(responce, {
        loading: "Guunsubscribe the bundle",
        success: (data) => {
          return data?.data?.mesage;
        },
        error: "Failed to get payment records",
      });
      return (await responce).data;
    } catch (error) {
      toast.error(error?.responce?.message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.paylod?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.paylod?.message);
        state.isPaymentVerified = action?.paylod?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.paylod?.message);
        state.isPaymentVerified = action?.paylod?.success;
      })
      .addCase(getPaymentRecords.rejected, (state, action) => {
        state.allPayments = action?.paylod?.allPayments;
        state.finalMonths = action?.paylod?.finalMonths;
        state.monthlySalesRecord = action?.paylod?.monthlySalesRecord;
      });
  },
});

export default razorpaySlice.reducer;
