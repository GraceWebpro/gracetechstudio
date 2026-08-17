import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import AvatarDropdown from "./AvatarDropdown";

export default function Topbar() {
  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        sticky
        top-0
        z-40
        h-20
        px-8
        flex
        items-center
        justify-between
        border-b
        border-border
        bg-background/80
        backdrop-blur-xl
      "
    >
      {/* Search */}

      <div className="relative w-[420px]">
        <Search
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
        />

        <input
          type="text"
          placeholder="Search projects..."
          className="
            w-full
            bg-surface
            border
            border-border
            rounded-2xl
            pl-12
            pr-5
            py-3.5
            outline-none
            text-text
            transition-all
            duration-300
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
          "
        />
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            w-11
            h-11
            rounded-2xl
            bg-surface
            border
            border-border
            flex
            items-center
            justify-center
            hover:border-primary
            transition-all
          "
        >
          <Bell size={19} />
        </motion.button>

        <AvatarDropdown />
      </div>
    </motion.header>
  );
}