import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>

        <p className="mt-3 text-gray-500">
          Login page will be implemented next.
        </p>

        <Link
          to="/signup"
          className="mt-6 inline-block font-semibold text-blue-600"
        >
          Back to signup
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;