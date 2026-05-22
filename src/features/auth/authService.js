import api from "../../services/api";

export const signupUser = async (userData) => {
  const payload = {
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    phone_number: userData.phoneNumber,
    password: userData.password,
    confirm_password: userData.confirmPassword,
  };

  const response = await api.post("/accounts/signup/", payload);
  return response.data;
};

export const verifySignupOtp = async ({ email, otp }) => {
  const payload = {
    email,
    otp,
  };

  const response = await api.post("/accounts/verify-signup-otp/", payload);
  return response.data;
};