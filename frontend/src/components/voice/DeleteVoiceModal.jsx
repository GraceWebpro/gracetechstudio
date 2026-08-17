import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  X,
  Mic2,
} from "lucide-react";

export default function DeleteVoiceModal({
  open,
  voice,
  deleting = false,
  onClose,
  onDelete,
}) {
  if (!open || !voice) return null;

  return (
    <AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          bg-black/60
          backdrop-blur-sm
          p-6
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: .95,
            y: 25,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: .95,
            y: 25,
          }}
          transition={{
            type: "spring",
            damping: 22,
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
              items-start
              justify-between
              px-7
              py-6
              border-b
              border-border
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-red-500/10
                  text-red-500
                  flex
                  items-center
                  justify-center
                "
              >
                <AlertTriangle size={28} />
              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  Delete Voice

                </h2>

                <p className="text-sm text-muted mt-1">

                  This action cannot be undone.

                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="
                w-10
                h-10
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
              <X size={18}/>
            </button>

          </div>

          {/* Body */}

          <div className="p-7">

            {/* Voice Card */}

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-background
                p-4
                flex
                items-center
                gap-4
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
                <Mic2 size={26}/>
              </div>

              <div className="flex-1">

                <h3 className="font-semibold">

                  {voice.name}

                </h3>

                <p className="text-sm text-muted mt-1">

                  {voice.provider || "Custom Voice"}

                </p>

              </div>

            </div>

            {/* Warning */}

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/5
                p-5
              "
            >

              <p className="font-medium text-red-500">

                Deleting this voice will permanently remove:

              </p>

              <ul
                className="
                  mt-3
                  space-y-2
                  text-sm
                  text-muted
                  list-disc
                  ml-5
                "
              >

                <li>Your cloned voice model</li>

                <li>Uploaded voice samples</li>

                <li>Voice settings</li>

                <li>Preview recordings</li>

              </ul>

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
              disabled={deleting}
              className="
                px-5
                py-3
                rounded-xl
                border
                border-border
                hover:bg-background
                transition
              "
            >
              Cancel
            </button>

            <button
              disabled={deleting}
              onClick={onDelete}
              className="
                px-6
                py-3
                rounded-xl
                bg-red-600
                hover:bg-red-700
                text-white
                flex
                items-center
                gap-2
                transition
                disabled:opacity-50
              "
            >

              <Trash2 size={18}/>

              {deleting
                ? "Deleting..."
                : "Delete Voice"}

            </button>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}