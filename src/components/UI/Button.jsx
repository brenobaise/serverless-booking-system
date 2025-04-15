export default function Button({
  children, // Text or content inside the button
  onClick, // Function to handle click events
  variant = "primary", // Default style variant
  size = "medium", // Default size
  className = "", // Additional custom classes
  disabled = false, // Disabled state
  type = "button", // Button type
}) {
  // Define classes for variants
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  // Define classes for sizes
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-10 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded focus:outline-none  disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
