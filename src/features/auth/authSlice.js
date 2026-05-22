import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupUser, verifySignupOtp } from "./authService";

const extractErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (data?.detail) {
    return data.detail;
  }

  if (data?.message) {
    return data.message;
  }

  if (data && typeof data === "object") {
    const firstErrorKey = Object.keys(data)[0];
    const firstError = data[firstErrorKey];

    if (Array.isArray(firstError)) {
      return firstError[0];
    }

    if (typeof firstError === "string") {
      return firstError;
    }
  }

  return fallbackMessage;
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      return await signupUser(userData);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Signup failed. Please try again.")
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      return await verifySignupOtp(otpData);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "OTP verification failed. Please try again.")
      );
    }
  }
);

const initialState = {
  user: null,

  loading: false,
  otpLoading: false,

  error: null,
  otpError: null,

  successMessage: null,
  otpSuccessMessage: null,

  isOtpModalOpen: false,
  pendingEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthMessages: (state) => {
      state.error = null;
      state.otpError = null;
      state.successMessage = null;
      state.otpSuccessMessage = null;
    },

    closeOtpModal: (state) => {
      state.isOtpModalOpen = false;
      state.pendingEmail = "";
      state.otpError = null;
      state.otpSuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload?.message || "OTP sent to your email";

        state.isOtpModalOpen = true;
        state.pendingEmail = action.meta.arg.email;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed. Please try again.";
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
        state.otpSuccessMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSuccessMessage =
          action.payload?.message || "Email verified successfully";

        state.isOtpModalOpen = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError =
          action.payload || "OTP verification failed. Please try again.";
      });
  },
});

export const { clearAuthMessages, closeOtpModal } = authSlice.actions;
export default authSlice.reducer;