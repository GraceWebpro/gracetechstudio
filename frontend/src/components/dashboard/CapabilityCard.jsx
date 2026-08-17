import { motion } from "framer-motion";

export default function CapabilityCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        rounded-[28px]
        border
        border-border
        bg-surface
        p-6
        shadow-card
        cursor-pointer
        overflow-hidden
        relative
      "
    >
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition
          bg-gradient-to-br
          from-primary/5
          to-transparent
        "
      />

      <div className="relative">

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-primary/10
            flex
            items-center
            justify-center
            text-primary
          "
        >
          <Icon size={24}/>
        </div>

        <h3 className="mt-6 text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-muted text-sm leading-6">
          {description}
        </p>

      </div>

    </motion.div>
  );
}