import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";
import AvatarDropdown from "./AvatarDropdown";

export default function Topbar() {
  return (
    <motion.header
      initial={{
        y: -25,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        sticky
        top-0
        z-40

        h-20

        flex
        items-center
        justify-between

        border-b
        border-border

        bg-background/80
        backdrop-blur-xl

        /* Desktop */
        px-8

        /* Mobile */
        max-lg:pl-20
        max-lg:pr-4
      "
    >

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div
        className="
          relative

          w-full
          max-w-[420px]

          max-lg:max-w-none
          max-lg:flex-1
          max-lg:mr-3
        "
      >

        <Search
          size={18}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-muted

            max-lg:left-3.5
          "
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

            max-lg:pl-10
            max-lg:pr-3
            max-lg:py-3
            max-lg:rounded-xl

            max-lg:text-sm
          "
        />

      </div>


      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-4

          max-lg:gap-2
        "
      >

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <motion.button
          type="button"

          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: 0.95,
          }}

          aria-label="Notifications"

          className="
            flex
            h-11
            w-11
            shrink-0

            items-center
            justify-center

            rounded-2xl

            bg-surface

            border
            border-border

            transition-all

            hover:border-primary

            max-lg:h-10
            max-lg:w-10
            max-lg:rounded-xl
          "
        >
          <Bell
            size={19}
            className="max-lg:size-[18px]"
          />
        </motion.button>


        {/* =================================================
            AVATAR
        ================================================= */}

        <div className="shrink-0">
          <AvatarDropdown />
        </div>

      </div>

    </motion.header>
  );
}

