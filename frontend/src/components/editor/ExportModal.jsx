import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Loader2,
  Download,
} from "lucide-react";

export default function ExportModal({
  open,
  exporting,
  progress = 0,
  step = "Rendering video...",
  onClose,
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
            z-[100]
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
              scale: .95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .95,
              y: 20,
            }}
            transition={{
              duration: .25,
            }}
            className="
              w-full
              max-w-lg
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
                items-center
                justify-between
                px-7
                py-6
                border-b
                border-border
              "
            >

              <div>

                <h2 className="text-2xl font-semibold">

                  Export Video

                </h2>

                <p className="text-sm text-muted mt-1">

                  Please don't close GraceTech while exporting.

                </p>

              </div>

              {!exporting && (

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
                  <X size={20} />
                </button>

              )}

            </div>

            {/* Body */}

            <div className="p-8">

              <div className="flex justify-center">

                {progress === 100 ? (

                  <motion.div
                    initial={{ scale: .8 }}
                    animate={{ scale: 1 }}
                  >

                    <CheckCircle2
                      size={80}
                      className="text-green-500"
                    />

                  </motion.div>

                ) : (

                  <Loader2
                    size={72}
                    className="animate-spin text-primary"
                  />

                )}

              </div>

              <h3 className="text-center text-xl font-semibold mt-8">

                {progress === 100
                  ? "Export Complete"
                  : step}

              </h3>

              <p className="text-center text-muted mt-2">

                {progress === 100
                  ? "Your video is ready."
                  : "Rendering your video..."}

              </p>

              {/* Progress */}

              <div className="mt-8">

                <div className="h-3 rounded-full bg-background overflow-hidden">

                  <motion.div
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: .4,
                    }}
                    className="
                      h-full
                      bg-primary
                    "
                  />

                </div>

                <div className="flex justify-between mt-3">

                  <span className="text-sm text-muted">

                    Progress

                  </span>

                  <span className="font-medium">

                    {progress}%

                  </span>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div
              className="
                px-7
                py-5
                border-t
                border-border
                flex
                justify-end
              "
            >

              {progress === 100 ? (

                <button
                  onClick={onClose}
                  className="
                    bg-primary
                    text-white
                    rounded-2xl
                    px-6
                    py-3
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Download size={18} />

                  Download

                </button>

              ) : (

                <button
                  disabled
                  className="
                    rounded-2xl
                    border
                    border-border
                    px-6
                    py-3
                    text-muted
                  "
                >

                  Exporting...

                </button>

              )}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}