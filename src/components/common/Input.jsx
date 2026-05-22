const Input = ({
  label,
  type = "text",
  error,
  icon: Icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={`flex items-center rounded-2xl border bg-white px-4 py-3 transition ${
          error
            ? "border-red-400 focus-within:border-red-500"
            : "border-gray-200 focus-within:border-blue-500"
        } ${className}`}
      >
        {Icon && <Icon size={18} className="mr-3 text-gray-500" />}

        <input
          type={type}
          className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          {...props}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;