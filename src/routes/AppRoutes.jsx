import { Routes, Route, Navigate } from "react-router-dom";

import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-900">
              404 - Page Not Found
            </h1>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;