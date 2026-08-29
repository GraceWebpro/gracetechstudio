import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Image,
  Mic2,
  Settings,
  ChevronRight,
  Menu,
  X,
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
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar({
  collapsed = false,
  setCollapsed,
  mobileOpen = false,
  setMobileOpen,
}) {
  /*
  =========================================================
  DESKTOP / SIDEBAR COLLAPSE
  =========================================================
  */

  const toggleSidebar = () => {
    setCollapsed?.((prev) => !prev);
  };

  /*
  =========================================================
  MOBILE
  =========================================================
  */

  const openMobile = () => {
    setMobileOpen?.(true);

    // Always start mobile sidebar expanded
    setCollapsed?.(false);
  };

  const closeMobile = () => {
    setMobileOpen?.(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ===================================================== */}

      {!mobileOpen && (
        <button
          type="button"
          onClick={openMobile}
          aria-label="Open navigation"
          className="
            fixed
            left-4
            top-4
            z-[60]

            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-xl
            border
            border-border
            bg-surface
            shadow-card

            lg:hidden
          "
        >
          <Menu size={21} />
        </button>
      )}


      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={closeMobile}
            className="
              fixed
              inset-0
              z-[70]

              bg-black/50
              backdrop-blur-sm

              lg:hidden
            "
          />
        )}
      </AnimatePresence>


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <motion.aside
        initial={false}

        /*
        -------------------------------------------------------
        Framer Motion controls ONLY the width.
        Tailwind controls mobile slide-in/out.
        -------------------------------------------------------
        */

        animate={{
          width: collapsed ? 76 : 260,
        }}

        transition={{
          width: {
            duration: 0.25,
            ease: "easeInOut",
          },
        }}

        className={`
          fixed
          left-0
          top-0
          z-[80]

          flex
          h-screen
          flex-col

          border-r
          border-border
          bg-surface
          shadow-xl

          overflow-hidden

          transition-transform
          duration-300
          ease-in-out

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:shadow-none
        `}

        style={{
          maxWidth: "100vw",
        }}
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className={`
            flex
            h-[76px]
            shrink-0
            items-center
            border-b
            border-border
            px-4

            ${
              collapsed
                ? "justify-center"
                : "justify-between"
            }
          `}
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <AnimatePresence mode="wait">
            {!collapsed ? (

              <motion.div
                key="expanded-logo"
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                }}
                className="
                  min-w-0
                  overflow-hidden
                "
              >
                <Logo />
              </motion.div>

            ) : (

              <motion.div
                key="collapsed-logo"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary
                  font-bold
                  text-white
                "
              >
                G
              </motion.div>

            )}
          </AnimatePresence>


          {/* =================================================
              SIDEBAR EXPAND / COLLAPSE BUTTON

              IMPORTANT:
              This button is ALWAYS visible.

              Expanded:
              260px → 76px

              Collapsed:
              76px → 260px
          ================================================= */}

          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-muted
              transition

              hover:bg-background
              hover:text-text
            "
          >

            <motion.div
              animate={{
                rotate: collapsed ? 0 : 180,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <ChevronRight size={18} />
            </motion.div>

          </button>


          {/* =================================================
              MOBILE CLOSE BUTTON

              Only shown when sidebar is expanded.
          ================================================= */}

          {!collapsed && (
            <button
              type="button"
              onClick={closeMobile}
              aria-label="Close navigation"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-muted
                transition

                hover:bg-background
                hover:text-text

                lg:hidden
              "
            >
              <X size={20} />
            </button>
          )}

        </div>


        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav
          className="
            flex
            flex-1
            flex-col
            gap-2

            overflow-y-auto
            overflow-x-visible

            px-3
            py-6
          "
        >

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}

                initial={{
                  opacity: 0,
                  x: -10,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                transition={{
                  delay: index * 0.04,
                }}

                className="relative"
              >

                <NavLink
                  to={item.path}
                  onClick={closeMobile}

                  title={
                    collapsed
                      ? item.title
                      : undefined
                  }

                  className={({ isActive }) => `
                    group
                    relative

                    flex
                    w-full
                    items-center

                    rounded-2xl
                    px-3
                    py-3.5

                    transition-all
                    duration-200

                    ${
                      collapsed
                        ? "justify-center"
                        : "justify-between"
                    }

                    ${
                      isActive
                        ? "bg-primary text-white shadow-glow"
                        : "text-muted hover:bg-background hover:text-text"
                    }
                  `}
                >

                  {/* =================================================
                      LEFT SIDE
                  ================================================= */}

                  <div
                    className={`
                      flex
                      min-w-0
                      items-center

                      ${
                        collapsed
                          ? "justify-center"
                          : "gap-3"
                      }
                    `}
                  >

                    <Icon
                      size={20}
                      className="shrink-0"
                    />


                    {/* Label */}

                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            width: 0,
                          }}

                          animate={{
                            opacity: 1,
                            width: "auto",
                          }}

                          exit={{
                            opacity: 0,
                            width: 0,
                          }}

                          transition={{
                            duration: 0.18,
                          }}

                          className="
                            overflow-hidden
                            whitespace-nowrap
                            font-medium
                          "
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>

                  </div>


                  {/* =================================================
                      ARROW
                  ================================================= */}

                  {!collapsed && (
                    <ChevronRight
                      size={16}
                      className="
                        shrink-0

                        opacity-0

                        transition

                        group-hover:translate-x-1
                        group-hover:opacity-100
                      "
                    />
                  )}

                </NavLink>


                {/* =================================================
                    COLLAPSED TOOLTIP
                ================================================= */}

                {collapsed && (
                  <div
                    className="
                      pointer-events-none

                      absolute
                      left-full
                      top-1/2
                      z-[100]

                      ml-3
                      -translate-y-1/2

                      whitespace-nowrap

                      rounded-lg

                      bg-text
                      px-3
                      py-2

                      text-xs
                      text-background

                      opacity-0

                      shadow-lg

                      transition-opacity

                      group-hover:opacity-100
                    "
                  >
                    {item.title}
                  </div>
                )}

              </motion.div>
            );
          })}

        </nav>


        {/* =====================================================
            USER CARD
        ===================================================== */}

        <div className="shrink-0 p-3">

          <motion.div
            whileHover={{
              y: -2,
            }}

            className={`
              rounded-3xl

              border
              border-border

              bg-background

              shadow-card

              transition-all

              ${
                collapsed
                  ? "p-2"
                  : "p-4"
              }
            `}
          >

            <div
              className={`
                flex
                items-center

                ${
                  collapsed
                    ? "justify-center"
                    : "gap-3"
                }
              `}
            >

              {/* Avatar */}

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0

                  items-center
                  justify-center

                  rounded-2xl

                  bg-primary

                  text-lg
                  font-bold
                  text-white

                  shadow-glow
                "
              >
                W
              </div>


              {/* User information */}

              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      width: 0,
                    }}

                    animate={{
                      opacity: 1,
                      width: "auto",
                    }}

                    exit={{
                      opacity: 0,
                      width: 0,
                    }}

                    className="
                      min-w-0
                      flex-1
                      overflow-hidden
                    "
                  >

                    <h3 className="truncate font-semibold">
                      GraceTech
                    </h3>

                    <p className="truncate whitespace-nowrap text-xs text-muted">
                      Personal Workspace
                    </p>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </motion.div>

        </div>

      </motion.aside>
    </>
  );
}
