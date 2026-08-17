import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Film,
  MonitorPlay,
  Clapperboard,
  FileVideo,
} from "lucide-react";

export default function ExportSettingsModal({
  open,
  onClose,
  onExport,

  filename,
  setFilename,

  resolution,
  setResolution,

  fps,
  setFps,

  format,
  setFormat,

  estimatedDuration = "1m 12s",
  estimatedSize = "~42 MB",
}) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/60
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-6
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: .96,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .96,
              y: 25,
            }}
            transition={{
              duration: .25,
            }}
            className="
              w-full
              max-w-xl
              rounded-3xl
              border
              border-border
              bg-surface
              shadow-2xl
              overflow-hidden
            "
          >

            {/* Header */}

            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-border
                px-7
                py-6
              "
            >

              <div>

                <h2 className="text-2xl font-semibold">

                  Export Video

                </h2>

                <p className="text-sm text-muted mt-1">

                  Choose your export settings before rendering.

                </p>

              </div>

              <button
                onClick={onClose}
                className="
                  w-10
                  h-10
                  rounded-xl
                  hover:bg-background
                  flex
                  items-center
                  justify-center
                "
              >
                <X size={20}/>
              </button>

            </div>

            {/* Body */}

            <div className="p-7 space-y-6">

              {/* Filename */}

              <div>

                <label className="text-sm font-medium">

                  File Name

                </label>

                <input
                  value={filename}
                  onChange={(e)=>setFilename(e.target.value)}
                  className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    px-4
                    py-3
                    outline-none
                    focus:border-primary
                  "
                  placeholder="My AI Video"
                />

              </div>

              {/* Export Options */}

              <div className="grid grid-cols-3 gap-4">

                {/* Resolution */}

                <div>

                  <label className="text-sm font-medium">

                    Resolution

                  </label>

                  <div className="relative mt-2">

                    <MonitorPlay
                      size={16}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-muted
                      "
                    />

                    <select
                      value={resolution}
                      onChange={(e)=>
                        setResolution(e.target.value)
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-background
                        pl-9
                        pr-3
                        py-3
                        outline-none
                      "
                    >
                      <option>720p</option>
                      <option>1080p</option>
                      <option>1440p</option>
                      <option>4K</option>
                    </select>

                  </div>

                </div>

                {/* FPS */}

                <div>

                  <label className="text-sm font-medium">

                    FPS

                  </label>

                  <div className="relative mt-2">

                    <Clapperboard
                      size={16}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-muted
                      "
                    />

                    <select
                      value={fps}
                      onChange={(e)=>setFps(e.target.value)}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-background
                        pl-9
                        pr-3
                        py-3
                        outline-none
                      "
                    >
                      <option>24 FPS</option>
                      <option>30 FPS</option>
                      <option>60 FPS</option>
                    </select>

                  </div>

                </div>

                {/* Format */}

                <div>

                  <label className="text-sm font-medium">

                    Format

                  </label>

                  <div className="relative mt-2">

                    <FileVideo
                      size={16}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-muted
                      "
                    />

                    <select
                      value={format}
                      onChange={(e)=>setFormat(e.target.value)}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-border
                        bg-background
                        pl-9
                        pr-3
                        py-3
                        outline-none
                      "
                    >
                      <option>MP4</option>
                      <option>MOV</option>
                      <option>WEBM</option>
                    </select>

                  </div>

                </div>

              </div>

              {/* Summary */}

              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  p-5
                "
              >

                <div className="flex items-center gap-2 mb-4">

                  <Film
                    size={18}
                    className="text-primary"
                  />

                  <span className="font-semibold">

                    Export Summary

                  </span>

                </div>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">

                    <span className="text-muted">

                      Resolution

                    </span>

                    <span>{resolution}</span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted">

                      Frame Rate

                    </span>

                    <span>{fps}</span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted">

                      Format

                    </span>

                    <span>{format}</span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted">

                      Estimated Duration

                    </span>

                    <span>{estimatedDuration}</span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted">

                      Estimated File Size

                    </span>

                    <span>{estimatedSize}</span>

                  </div>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div
              className="
                border-t
                border-border
                px-7
                py-5
                flex
                justify-end
                gap-3
              "
            >

              <button
                onClick={onClose}
                className="
                  px-6
                  py-3
                  rounded-2xl
                  border
                  border-border
                  hover:bg-background
                "
              >

                Cancel

              </button>

              <button
                onClick={onExport}
                className="
                  px-7
                  py-3
                  rounded-2xl
                  bg-primary
                  text-white
                  font-medium
                  hover:opacity-90
                "
              >

                Export Video

              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}