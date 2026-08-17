import { motion } from "framer-motion";

const gradients = {
  purple:
    "from-violet-500 via-fuchsia-500 to-purple-700",

  blue:
    "from-sky-500 via-cyan-400 to-blue-700",

  emerald:
    "from-emerald-400 via-green-500 to-emerald-700",

  orange:
    "from-orange-400 via-amber-500 to-red-600",

  rose:
    "from-pink-500 via-rose-500 to-red-500",
};

export default function Avatar({
  initials = "W",
  size = "md",
  gradient = "purple",
  online = false,
}) {
  const sizes = {
    sm: "w-9 h-9 text-sm rounded-xl",

    md: "w-11 h-11 text-base rounded-2xl",

    lg: "w-14 h-14 text-lg rounded-2xl",

    xl: "w-20 h-20 text-2xl rounded-3xl",
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: -2,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="relative"
    >
      <div
        className={`
          relative
          overflow-hidden
          ${sizes[size]}
          bg-gradient-to-br
          ${gradients[gradient]}
          shadow-lg
          shadow-primary/20
          flex
          items-center
          justify-center
          font-semibold
          text-white
          select-none
        `}
      >
        {/* Glass Highlight */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-white/30
            via-transparent
            to-transparent
          "
        />

        {/* Soft Glow */}

        <div
          className="
            absolute
            inset-0
            rounded-inherit
            ring-1
            ring-white/10
          "
        />

        <span className="relative z-10">
          {initials}
        </span>
      </div>

      {online && (
        <span
          className="
            absolute
            bottom-0
            right-0
            h-3.5
            w-3.5
            rounded-full
            bg-emerald-500
            border-2
            border-surface
          "
        />
      )}
    </motion.div>
  );
}