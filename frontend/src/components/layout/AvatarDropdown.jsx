import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  Moon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Avatar from "../ui/Avatar";

const menu = [
  {
    icon: User,
    label: "My Profile",
  },
  {
    icon: Settings,
    label: "Settings",
  },
  {
    icon: Moon,
    label: "Appearance",
  },
  {
    icon: LogOut,
    label: "Logout",
    danger: true,
  },
];

export default function AvatarDropdown() {
  const [open, setOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <motion.button
        whileTap={{ scale: .96 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-border
          bg-surface
          px-3
          py-2
          transition-all
          hover:border-primary
        "
      >
        <Avatar
            initials="W"
            gradient="purple"
            online
        />

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity:0,
              y:10,
              scale:.96,
            }}
            animate={{
              opacity:1,
              y:0,
              scale:1,
            }}
            exit={{
              opacity:0,
              y:10,
              scale:.96,
            }}
            transition={{
              duration:.18,
            }}
            className="
              absolute
              right-0
              top-16
              w-72
              rounded-3xl
              border
              border-border
              bg-surface
              shadow-card
              overflow-hidden
              z-50
            "
          >
            <div className="p-5">

              <div className="flex items-center gap-4">

                <div
                  className="
                    h-14
                    w-14
                    rounded-2xl
                    bg-primary
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-bold
                  "
                >
                  W
                </div>

                <div>

                  <h3 className="font-semibold">
                    Wilson
                  </h3>

                  <p className="text-sm text-muted">
                    Personal Workspace
                  </p>

                </div>

              </div>

            </div>

            <div className="border-t border-border">

              {menu.map((item) => {

                const Icon = item.icon;

                return (

                  <button
                    key={item.label}
                    className={`
                      w-full
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                      transition-all
                      hover:bg-surfaceLight
                      ${
                        item.danger
                          ? "text-danger"
                          : ""
                      }
                    `}
                  >

                    <Icon size={18}/>

                    {item.label}

                  </button>

                );

              })}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}