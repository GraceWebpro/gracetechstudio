import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
} from "lucide-react";

export default function VideoControls({
  playing,
  onPlay,
}) {
  return (
    <div className="space-y-5">

      {/* Progress */}

      <div>

        <div className="flex justify-between text-sm text-muted mb-2">

          <span>00:18</span>

          <span>10:00</span>

        </div>

        <div className="relative h-2 rounded-full bg-background">

          <div className="absolute h-full w-[22%] bg-primary rounded-full" />

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            className="
              absolute
              left-[22%]
              top-1/2
              -translate-y-1/2
              w-5
              h-5
              rounded-full
              bg-white
              shadow-lg
              cursor-pointer
            "
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex items-center justify-between">

        <div className="flex gap-3">

          <button className="editor-btn">

            <SkipBack size={18}/>

          </button>

          <button
            onClick={onPlay}
            className="editor-btn bg-primary text-white border-primary"
          >

            {playing ?

              <Pause size={20}/>

              :

              <Play size={20}/>

            }

          </button>

          <button className="editor-btn">

            <SkipForward size={18}/>

          </button>

        </div>

        <div className="flex gap-3">

          <button className="editor-btn">

            <Volume2 size={18}/>

          </button>

          <button className="editor-btn">

            1x

          </button>

          <button className="editor-btn">

            <Maximize2 size={18}/>

          </button>

        </div>

      </div>

    </div>
  );
}