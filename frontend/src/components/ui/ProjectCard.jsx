import { motion } from "framer-motion";
import {
  Clock,
  Layers,
  MoreHorizontal,
} from "lucide-react";

export default function ProjectCard({
  title,
  thumbnail,
  status = "Draft",
  scenes = 0,
  edited = "Recently",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        rounded-[28px]
        overflow-hidden
        border
        border-border
        bg-surface
        shadow-card
        cursor-pointer
        transition-all
        hover:border-primary/40
      "
    >

      {/* Thumbnail */}

      <div
        className="
          relative
          h-44
          bg-surfaceLight
          overflow-hidden
        "
      >

        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="
              w-full
              h-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              text-muted
            "
          >
            No Preview
          </div>
        )}


        {/* Status */}

        <div
          className="
            absolute
            top-4
            left-4
            px-3
            py-1
            rounded-full
            bg-background/80
            backdrop-blur
            text-xs
            border
            border-border
          "
        >
          {status}
        </div>


        {/* More button */}

        <button
          className="
            absolute
            top-4
            right-4
            w-9
            h-9
            rounded-xl
            bg-background/80
            backdrop-blur
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          <MoreHorizontal size={18}/>
        </button>

      </div>


      {/* Content */}

      <div className="p-5">


        <h3
          className="
            text-lg
            font-semibold
            truncate
          "
        >
          {title}
        </h3>


        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            text-sm
            text-muted
          "
        >

          <div className="flex items-center gap-2">

            <Layers size={15}/>

            <span>
              {scenes} scenes
            </span>

          </div>


          <div className="flex items-center gap-2">

            <Clock size={15}/>

            <span>
              {edited}
            </span>

          </div>

        </div>

      </div>

    </motion.div>
  );
}