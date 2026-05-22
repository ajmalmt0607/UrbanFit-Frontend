import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import AuthSideBanner from "../../components/auth/AuthSideBanner";
import OtpVerificationModal from "../../components/auth/OtpVerificationModal";
import {
  clearAuthMessages,
  closeOtpModal,
  signup,
  verifyOtp,
} from "../../features/auth/authSlice";
import { signupSchema } from "../../features/auth/authValidation";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    otpLoading,
    error,
    otpError,
    successMessage,
    otpSuccessMessage,
    isOtpModalOpen,
    pendingEmail,
  } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (successMessage) {
      toast.success(successMessage);
    }

    if (otpSuccessMessage) {
      toast.success(otpSuccessMessage);

      const timer = setTimeout(() => {
        navigate("/login");
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage, otpSuccessMessage, navigate]);

  const onSubmit = (data) => {
    dispatch(signup(data));
  };

  const handleVerifyOtp = (otp) => {
    dispatch(
      verifyOtp({
        email: pendingEmail,
        otp,
      })
    );
  };

  const handleCloseOtpModal = () => {
    dispatch(closeOtpModal());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-3 py-4 sm:px-6 sm:py-6 lg:flex lg:items-center lg:justify-center">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-sm lg:min-h-[620px] lg:grid-cols-[0.8fr_1fr]">
        <AuthSideBanner />

        <div className="flex items-center justify-center px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-8">
          <div className="w-full max-w-lg">
            <div className="mb-6 flex justify-start sm:justify-end">
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  Sign up
                </h1>
                <Sparkles size={22} className="text-green-400" />
              </div>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="First name"
                  icon={User}
                  error={errors.firstName?.message}
                  {...register("firstName")}
                />

                <Input
                  placeholder="Last name"
                  icon={User}
                  error={errors.lastName?.message}
                  {...register("lastName")}
                />
              </div>

              <Input
                placeholder="Email"
                icon={Mail}
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                placeholder="Phone number"
                icon={Phone}
                error={errors.phoneNumber?.message}
                {...register("phoneNumber")}
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  icon={Lock}
                  error={errors.password?.message}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  icon={Lock}
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <div>
                <label className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-blue-600"
                    {...register("acceptTerms")}
                  />

                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </label>

                {errors.acceptTerms?.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              <Button type="submit" loading={loading}>
                Create account
              </Button>
            </form>
          </div>
        </div>
      </div>

      {isOtpModalOpen && (
        <OtpVerificationModal
          email={pendingEmail}
          loading={otpLoading}
          error={otpError}
          onVerify={handleVerifyOtp}
          onClose={handleCloseOtpModal}
        />
      )}
    </div>
  );
};

export default SignupPage;