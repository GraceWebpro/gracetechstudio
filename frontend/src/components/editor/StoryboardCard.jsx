import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  MoreVertical,
  Copy,
  ArrowUp,
  ArrowDown,
  Trash2,
  Image,
} from "lucide-react";
import FloatingMenu from "../ui/FloatingMenu";

export default function StoryboardCard({
  scene,
  active,
  playing,
  onClick,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(null);
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.99,
      }}
      animate={
        active && playing
          ? {
              boxShadow: [
                "0 0 0 rgba(59,130,246,.15)",
                "0 0 18px rgba(59,130,246,.45)",
                "0 0 0 rgba(59,130,246,.15)",
              ],
            }
          : {}
      }
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      onClick={onClick}
      className={`
        relative
        w-full
        rounded-2xl
        border
        cursor-pointer
        transition-all
        duration-300

        ${
          active
            ? "border-primary bg-primary/5 shadow-lg"
            : "border-border bg-background hover:border-primary/40"
        }
      `}
    >
      <div className="flex">

        {/* Scene Number */}

        <div
          className="
            w-16
            flex-shrink-0
            border-r
            border-border
            flex
            flex-col
            items-center
            justify-center
            bg-surface
          "
        >
          <div
            className={`
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              font-bold
              text-sm

              ${
                active
                  ? "bg-primary text-white"
                  : "bg-background"
              }
            `}
          >
            {String(scene.id).padStart(2, "0")}
          </div>
        </div>


        {/* Content */}

        <div className="flex-1 p-4">

          {/* Header */}

          <div className="flex justify-between items-start">

            <div className="min-w-0">

              <h3 className="font-semibold truncate">

                {scene.title}

              </h3>

            </div>

            <div className="relative">

              <button
                ref={buttonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="
                  w-8
                  h-8
                  rounded-lg
                  hover:bg-surface
                  flex
                  items-center
                  justify-center
                "
              >
                <MoreVertical size={16} />
              </button>

              <FloatingMenu
                open={showMenu}
                anchorRef={buttonRef}
                onClose={() => setShowMenu(false)}
                offsetX={-220}
                offsetY={0}
              >

                <MenuButton
                    icon={<Copy size={16} />}
                    label="Duplicate"
                    onClick={() => {
                        onDuplicate();
                        setShowMenu(false);
                    }}
                />

                <MenuButton
                    icon={<ArrowUp size={16} />}
                    label="Move Up"
                    onClick={() => {
                        onMoveUp();
                        setShowMenu(false);
                    }}
                />

                <MenuButton
                    icon={<ArrowDown size={16} />}
                    label="Move Down"
                    onClick={() => {
                        onMoveDown();
                        setShowMenu(false);
                    }}
                />

                <div className="border-t border-border" />

                <MenuButton
                    danger
                    icon={<Trash2 size={16} />}
                    label="Delete"
                    onClick={() => {
                      console.log("Delete clicked");

                        onDelete();
                        setShowMenu(false);
                    }}
                />

              </FloatingMenu>
            </div>

          </div>

          {/* Chips */}

          <div className="flex flex-wrap gap-2 mt-3">

            <Chip
              icon={<Image size={12} />}
              text="Media"
            />
            3
          </div>

          {/* Footer */}

          <div className="mt-4">

            <div className="flex items-center justify-between text-xs text-muted">

              <div className="flex items-center gap-1">

                <Clock3 size={12} />

                {scene.duration}

              </div>

              <span>

                {active ? "Editing" : "Ready"}

              </span>

            </div>

            <div className="mt-2 h-1 rounded-full bg-border">

              <motion.div
                animate={{
                  width: active ? "70%" : "100%",
                }}
                className={`
                  h-full
                  ${
                    active
                      ? "bg-primary"
                      : "bg-emerald-500"
                  }
                `}
              />

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

function Chip({ icon, text }) {
  return (
    <div
      className="
        flex
        items-center
        gap-1
        px-2.5
        py-1
        rounded-full
        bg-surface
        border
        border-border
        text-xs
      "
    >
      {icon}
      {text}
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        transition
        hover:bg-background

        ${
          danger
            ? "text-red-500 hover:bg-red-500/10"
            : ""
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}