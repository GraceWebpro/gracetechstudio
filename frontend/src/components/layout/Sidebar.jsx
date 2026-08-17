import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Image,
  Mic2,
  Package,
  Download,
  Settings,
  ChevronRight,
} from "lucide-react";
import Logo from "../Logo";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Create",
    icon: Sparkles,
    path: "/create",
  },
  {
    title: "Projects",
    icon: FolderOpen,
    path: "/projects",
  },
  {
    title: "Voices",
    icon: Mic2,
    path: "/voices",
  },
  {
    title: "Assets",
    icon: Image,
    path: "/assets",
  },

  // {
  //   title: "Templates",
  //   icon: Package,
  //   path: "/templates",
  // },
  // {
  //   title: "Exports",
  //   icon: Download,
  //   path: "/exports",
  // },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="
      w-[260px]
      bg-surface
      border-r
      border-border
      flex
      flex-col
      h-screen
      p-4
      "
    >
      {/* Logo */}

      <Logo />

      {/* Navigation */}

      <nav className="mt-12 flex flex-col gap-2 flex-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
              }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `
                  group
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-2xl
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-primary text-white shadow-glow"
                      : "text-muted hover:bg-surfaceLight hover:text-text"
                  }
                `
                }
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ x: 3 }}>
                    <Icon size={20} />
                  </motion.div>

                  <span className="font-medium">{item.title}</span>
                </div>

                <ChevronRight
                  size={16}
                  className="
                  opacity-0
                  group-hover:opacity-100
                  transition
                  "
                />
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom User Card */}

      <motion.div
        whileHover={{
          y: -2,
        }}
        className="
        border
        border-border
        rounded-3xl
        bg-background
        p-4
        shadow-card
        cursor-pointer
        transition-all
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
            w-12
            h-12
            rounded-2xl
            bg-primary
            flex
            items-center
            justify-center
            font-bold
            text-lg
            shadow-glow
            "
          >
            W
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">Wilson</h3>

            <p className="text-xs text-muted">
              Personal Workspace
            </p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}