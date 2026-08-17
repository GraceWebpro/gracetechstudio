import { motion, AnimatePresence } from "framer-motion";
import {
  Mic2,
  Upload,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function CloneVoiceModal({
  open,
  onClose,
  onRecord,
  onUpload,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>

      <motion.div
        className="
        fixed
        inset-0
        z-[9999]
        h-full
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
        p-4
        md:p-6
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: .95,
            y: 30,
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
            type: "spring",
            damping: 22,
          }}
          className="
          relative
          w-full
          max-w-3xl
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
            px-8
            py-7
            border-b
            border-border
            "
          >

            <div>

              <div
                className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-primary/10
                px-3
                py-1
                text-primary
                text-sm
                font-medium
                "
              >
                <Sparkles size={16} />

                AI Voice Cloning

              </div>

              <h2 className="mt-4 text-3xl font-bold">

                Clone Your Voice

              </h2>

              <p className="mt-2 text-muted max-w-lg">

                Create a natural AI version of your voice for
                narration, dubbing and AI videos.

              </p>

            </div>

            <button
              onClick={onClose}
              className="
              w-11
              h-11
              rounded-xl
              border
              border-border
              flex
              items-center
              justify-center
              hover:bg-background
              transition
              "
            >
              <X size={20} />
            </button>

          </div>

          {/* Options */}

          <div
            className="
            grid
            md:grid-cols-2
            gap-6
            px-8
            py-4
            "
          >

            {/* Record */}

            <motion.button
              whileHover={{
                y: -6,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={onRecord}
              className="
              group
              h-fit
              rounded-3xl
              border
              border-border
              bg-background
              p-7
              text-left
              transition
              hover:border-primary
              hover:bg-primary/5
              "
            >

              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
                "
              >
                <Mic2 size={30} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">

                Record Voice

              </h3>

              <p className="mt-3 text-sm text-muted leading-relaxed">

                Record directly from your microphone.
                We'll guide you through high-quality
                voice samples.

              </p>

              <div
                className="
                mt-4
                flex
                items-center
                gap-2
                font-medium
                text-primary
                "
              >

                Start Recording

                <ArrowRight
                  size={18}
                  className="
                  transition
                  group-hover:translate-x-1
                  "
                />

              </div>

            </motion.button>

            {/* Upload */}

            <motion.button
              whileHover={{
                y: -6,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={onUpload}
              className="
              group
              h-fit
              rounded-3xl
              border
              border-border
              bg-background
              p-7
              text-left
              transition
              hover:border-primary
              hover:bg-primary/5
              "
            >

              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-blue-500/10
                text-blue-500
                flex
                items-center
                justify-center
                "
              >
                <Upload size={30} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">

                Upload Samples

              </h3>

              <p className="mt-3 text-sm text-muted leading-relaxed">

                Already have recordings?
                Upload clean voice samples and we'll
                build your AI voice faster.

              </p>

              <div
                className="
                mt-4
                flex
                items-center
                gap-2
                font-medium
                text-blue-500
                "
              >

                Upload Audio

                <ArrowRight
                  size={18}
                  className="
                  transition
                  group-hover:translate-x-1
                  "
                />

              </div>

            </motion.button>

          </div>

          {/* Footer */}

          <div
            className="
            border-t
            border-border
            px-8
            py-4
            flex
            flex-wrap
            gap-6
            text-sm
            text-muted
            "
          >

            <span>✓ High-quality voice cloning</span>

            <span>✓ Secure storage</span>

            <span>✓ Usually ready in 2–5 minutes</span>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}