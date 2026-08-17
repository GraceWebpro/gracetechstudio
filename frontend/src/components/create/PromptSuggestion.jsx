import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PromptSuggestion({
  title,
  description,
  icon: Icon,
  color = "from-primary to-blue-500",
  prompt,
  onSelect,
}) {
  return (
    <motion.button
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() => onSelect?.(prompt)}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-surface
        p-6
        text-left
        transition-all
        duration-300
        hover:border-primary/40
        hover:shadow-card
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-36
          w-36
          rounded-full
          bg-primary/5
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-primary/10
        "
      />

      <div className="relative z-10">

        {/* Icon */}

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            ${color}
            text-white
            shadow-lg
          `}
        >
          <Icon size={26} />
        </div>

        {/* Content */}

        <h3 className="mt-6 text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          {description}
        </p>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between">

          <span
            className="
              text-sm
              font-medium
              text-primary
            "
          >
            Use this prompt
          </span>

          <ArrowUpRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />

        </div>

      </div>
    </motion.button>
  );
}