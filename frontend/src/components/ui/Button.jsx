import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-primary hover:bg-primaryHover text-white shadow-glow",

  secondary:
    "bg-surface border border-border text-text hover:bg-surfaceLight",

  ghost:
    "bg-transparent text-muted hover:text-text hover:bg-surface",

  danger:
    "bg-danger hover:opacity-90 text-white",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        font-medium
        transition-all
        duration-300
        select-none
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}