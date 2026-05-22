import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import Button from "../common/Button";

const OTP_LENGTH = 6;

const OtpVerificationModal = ({
  email,
  loading,
  error,
  onVerify,
  onClose,
}) => {
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) return;

    const updatedOtp = Array(OTP_LENGTH).fill("");

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtpValues(updatedOtp);

    const nextIndex =
      pastedValue.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pastedValue.length;

    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const otp = otpValues.join("");

    if (otp.length !== OTP_LENGTH) return;

    onVerify(otp);
  };

  const isOtpComplete = otpValues.every(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Verify your email
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We sent a 6-digit OTP to{" "}
              <span className="font-semibold text-gray-800">{email}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7">
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                className="h-12 w-12 rounded-2xl border border-gray-200 text-center text-lg font-semibold text-gray-900 outline-none transition focus:border-blue-500 sm:h-14 sm:w-14"
              />
            ))}
          </div>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            loading={loading}
            disabled={!isOtpComplete}
            className="mt-6"
          >
            Verify OTP
          </Button>

          <p className="mt-5 text-center text-sm text-gray-500">
            Did not receive OTP?{" "}
            <button
              type="button"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OtpVerificationModal;