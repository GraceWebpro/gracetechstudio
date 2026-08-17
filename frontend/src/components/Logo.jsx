import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="flex items-center gap-4 cursor-pointer"
    >
      <div
        className="
        w-12
        h-12
        rounded-2xl
        bg-primary
        flex
        items-center
        justify-center
        shadow-glow
        "
      >
        <Sparkles className="text-white" size={22} />
      </div>

      <div>
        <h1 className="text-lg font-bold text-text">
          GraceTech
        </h1>

        <p className="text-sm text-muted">
          Studio AI
        </p>
      </div>
    </motion.div>
  );
}