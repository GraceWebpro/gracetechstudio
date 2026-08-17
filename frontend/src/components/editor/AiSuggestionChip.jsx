import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AISuggestionChip({
  label,
  icon,
  active = false,
  onClick,
}) {
  const Icon = icon || Sparkles;

  return (
    <motion.button
      whileHover={{
        y: -3,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        flex
        items-center
        gap-2
        px-5
        py-3
        rounded-2xl
        border
        transition-all
        duration-300

        ${
          active
            ? "bg-primary text-white border-primary shadow-glow"
            : "bg-background border-border hover:border-primary hover:bg-primary/5"
        }
      `}
    >
      {/* Animated Glow */}

      <motion.div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-primary/0
          via-primary/10
          to-primary/0
        "
        initial={{
          x: "-100%",
        }}
        whileHover={{
          x: "100%",
        }}
        transition={{
          duration: 0.8,
        }}
      />

      {/* Icon */}

      <motion.div
        whileHover={{
          rotate: 15,
          scale: 1.15,
        }}
      >
        <Icon
          size={16}
          className={
            active
              ? "text-white"
              : "text-primary"
          }
        />
      </motion.div>

      {/* Label */}

      <span
        className="
          relative
          z-10
          font-medium
          whitespace-nowrap
        "
      >
        {label}
      </span>
    </motion.button>
  );
}