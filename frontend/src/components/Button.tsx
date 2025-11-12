interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: "blue" | "cyan" | "red";
  size?: "sm" | "md" | "lg";
}

const colors = {
  blue: "bg-blue-500 hover:bg-blue-600",
  cyan: "bg-cyan-500 hover:bg-cyan-600",
  red: "bg-red-500 hover:bg-red-600",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({ label, onClick, color = "blue", size = "md" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-white font-semibold rounded ${colors[color]} ${sizes[size]} transition duration-200`}
    >
      {label}
    </button>
  );
};

export default Button;
