import * as yup from "yup";

export const signupSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name must be less than 50 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),

  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10 digit phone number"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain one uppercase letter")
    .matches(/[a-z]/, "Password must contain one lowercase letter")
    .matches(/[0-9]/, "Password must contain one number"),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),

  acceptTerms: yup
    .boolean()
    .oneOf([true], "Please accept Terms and Privacy Policy"),
});