import { motion } from "framer-motion";
import {
  Sparkles,
  Check,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function AIMessage({
  title = "Grace AI Suggestion",
  message,
  onApply,
  onCopy,
  onRegenerate,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .35,
      }}
      className="
        rounded-3xl
        border
        border-border
        bg-background
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between p-5 border-b border-border">

        <div className="flex items-center gap-3">

          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-primary/10
              flex
              items-center
              justify-center
            "
          >
            <Sparkles
              size={20}
              className="text-primary"
            />
          </div>

          <div>

            <h3 className="font-semibold">

              {title}

            </h3>

            <p className="text-sm text-muted">

              Generated just now

            </p>

          </div>

        </div>

        <button
          onClick={onApply}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-5
            py-3
            text-white
            font-medium
            hover:scale-[1.02]
            transition
          "
        >
          <Check size={17} />

          Apply

        </button>

      </div>

      {/* AI Response */}

      <div className="p-4">

        <p className="leading-8 text-muted">

          {message}

        </p>

      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between
          px-6
          py-5
          border-t
          border-border
        "
      >
        <div className="flex gap-3">

          <button
            onClick={onCopy}
            className="
              w-10
              h-10
              rounded-xl
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-primary
              transition
            "
          >
            <Copy size={17}/>
          </button>

          <button
            onClick={onRegenerate}
            className="
              w-10
              h-10
              rounded-xl
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-primary
              transition
            "
          >
            <RotateCcw size={17}/>
          </button>

        </div>

        <div className="flex gap-3">

          <button
            className="
              w-10
              h-10
              rounded-xl
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-green-500
              transition
            "
          >
            <ThumbsUp size={17}/>
          </button>

          <button
            className="
              w-10
              h-10
              rounded-xl
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-red-500
              transition
            "
          >
            <ThumbsDown size={17}/>
          </button>

        </div>

      </div>

    </motion.div>
  );
}