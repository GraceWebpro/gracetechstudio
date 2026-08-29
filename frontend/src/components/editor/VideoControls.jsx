import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  Settings2,
} from "lucide-react";

export default function VideoControls({
  playing,
  currentTime,
  duration,
  onPlayPause,
  onSeek,
  onPreviousScene,
    onNextScene,
    onFullscreen,
}) {
  const [playbackRate, setPlaybackRate] = useState(1);

  const progress =
  duration > 0
    ? (currentTime / duration) * 100
    : 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="border-t border-border">

      {/* Progress */}

      <div className="px-8 pt-4">

        <div
          className="
          relative
          h-2
          rounded-full
          bg-background
          overflow-hidden
          cursor-pointer
        "
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const percent = Math.min(
              1,
              Math.max(0, x / rect.width)
            );

            onSeek(percent * duration);
          }}
        >
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.2,
            }}
            className="h-full bg-primary"
          />

          <motion.div
            animate={{
              left: `${progress}%`,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              top-1/2
              -translate-y-1/2
              -translate-x-1/2
              w-5
              h-5
              rounded-full
              bg-primary
              shadow-lg
              border-4
              border-background
            "
          />
        </div>

      </div>

      {/* Controls */}

      <div className="px-8 py-4 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onPreviousScene}
            className="editor-icon-btn"
          >
            <SkipBack size={18} />
          </button>

          <motion.button
            whileTap={{
              scale: .95,
            }}
            whileHover={{
              scale: 1.05,
            }}
            onClick={onPlayPause}
            className="
              w-12
              h-12
              rounded-full
              bg-primary
              text-white
              flex
              items-center
              justify-center
              shadow-glow
            "
          >
            {playing ? (
              <Pause
                size={18}
                fill="white"
              />
            ) : (
              <Play
                size={18}
                fill="white"
              />
            )}
          </motion.button>

          <button
            onClick={onNextScene}
            className="editor-icon-btn"
          >
            <SkipForward size={18} />
          </button>

          <div className="ml-3 text-sm text-muted font-medium">

            {formatTime(currentTime)}

            <span className="mx-2">/</span>

            {formatTime(duration)}

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            className="editor-icon-btn"
          >
            <Volume2 size={18} />
          </button>

         
          <select
className="
px-2
h-10
rounded-xl
border
border-border
bg-background
hover:border-primary
transition
text-sm
"
value={playbackRate}

onChange={(e)=>{

setPlaybackRate(Number(e.target.value));

}}

>

<option value={0.5}>0.5x</option>

<option value={1}>1x</option>

<option value={1.25}>1.25x</option>

<option value={1.5}>1.5x</option>

<option value={2}>2x</option>

</select>

          <button
            className="editor-icon-btn"
          >
            <Settings2 size={18} />
          </button>

          <button
          onClick={onFullscreen}
            className="editor-icon-btn"
          >
            <Maximize2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}