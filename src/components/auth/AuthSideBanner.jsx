const AuthSideBanner = () => {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-yellow-100 via-yellow-50 to-green-100 p-10 lg:block">
      <h1 className="text-2xl font-bold text-gray-900">
        Urban<span className="text-blue-600">Fit</span>
      </h1>

      <div className="mt-28">
        <h2 className="max-w-sm text-4xl font-bold leading-tight text-gray-950">
          Create your UrbanFit account
        </h2>

        <p className="mt-5 max-w-xs text-base leading-7 text-gray-600">
          Join us and discover premium fitness products, outfits, and deals.
        </p>
      </div>

      <div className="absolute bottom-10 left-10 right-10 rounded-3xl bg-white/80 p-5 shadow-sm backdrop-blur">
        <p className="text-sm font-semibold text-gray-900">New here?</p>
        <p className="mt-1 text-sm text-gray-600">
          Sign up and get updates on your first order.
        </p>
      </div>

      <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-green-300/40" />
      <div className="absolute bottom-28 right-20 h-28 w-28 rounded-full bg-purple-300/40" />
    </div>
  );
};

export default AuthSideBanner;