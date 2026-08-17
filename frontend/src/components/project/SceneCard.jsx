import { motion } from "framer-motion";
import {
  GripVertical,
  Clock3,
  Image,
  Sparkles,
  MoreVertical,
} from "lucide-react";

export default function SceneCard({
  scene,
  active,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      whileTap={{
        scale: .98,
      }}
      onClick={onClick}
      className={`
        group
        rounded-2xl
        border
        p-4
        cursor-pointer
        transition-all
        duration-300

        ${
          active
            ? "border-primary bg-primary/5"
            : "border-border bg-background hover:border-primary/40"
        }
      `}
    >
      <div className="flex gap-3">

        <GripVertical
          size={18}
          className="text-muted mt-1"
        />

        {/* Thumbnail */}

        <div
          className="
            relative
            w-20
            h-16
            rounded-xl
            bg-gradient-to-br
            from-primary/15
            to-blue-500/15
            flex
            items-center
            justify-center
          "
        >
          <Image
            size={22}
            className="text-primary"
          />

          {active && (
            <div
              className="
                absolute
                inset-0
                border-2
                border-primary
                rounded-xl
              "
            />
          )}
        </div>

        {/* Content */}

        <div className="flex-1">

          <div className="flex justify-between">

            <h3 className="font-semibold">
              Scene {scene.id}
            </h3>

            <MoreVertical
              size={17}
              className="
                opacity-0
                group-hover:opacity-100
                transition
              "
            />

          </div>

          <p className="text-sm text-muted mt-1">
            {scene.title}
          </p>

          <div className="flex items-center gap-4 mt-3">

            <div className="flex items-center gap-1 text-xs text-muted">

              <Clock3 size={13} />

              {scene.duration}

            </div>

            {active && (
              <div className="flex items-center gap-1 text-xs text-primary">

                <Sparkles size={13} />

                Editing

              </div>
            )}

          </div>

        </div>

      </div>
    </motion.div>
  );
}