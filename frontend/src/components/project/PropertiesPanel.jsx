import { motion } from "framer-motion";
import {
  Sparkles,
  WandSparkles,
  Mic2,
  Palette,
  Monitor,
  RotateCcw,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

import Button from "../ui/Button";

export default function PropertiesPanel() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-surface
        shadow-card
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="p-6 border-b border-border">

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

            <h2 className="font-semibold">
              AI Director
            </h2>

            <p className="text-sm text-muted">
              Control your project
            </p>

          </div>

        </div>

      </div>

      {/* Controls */}

      <div className="p-6 space-y-6">

        {/* Voice */}

        <div>

          <label className="text-sm text-muted">

            Voice

          </label>

          <button
            className="
              mt-2
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-4
              py-3
              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-3">

              <Mic2 size={18} />

              Grace AI

            </div>

            <ChevronDown size={18} />

          </button>

        </div>

        {/* Style */}

        <div>

          <label className="text-sm text-muted">

            Video Style

          </label>

          <button
            className="
              mt-2
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-4
              py-3
              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-3">

              <Palette size={18} />

              Cinematic

            </div>

            <ChevronDown size={18} />

          </button>

        </div>

        {/* Platform */}

        <div>

          <label className="text-sm text-muted">

            Platform

          </label>

          <button
            className="
              mt-2
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-4
              py-3
              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-3">

              <Monitor size={18} />

              YouTube (16:9)

            </div>

            <ChevronDown size={18} />

          </button>

        </div>

        {/* Divider */}

        <div className="border-t border-border" />

        {/* AI Actions */}

        <div>

          <p className="text-sm text-muted mb-4">

            AI Actions

          </p>

          <div className="space-y-3">

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: .98 }}
              className="
                w-full
                rounded-2xl
                bg-primary
                text-white
                p-4
                flex
                items-center
                gap-3
              "
            >

              <WandSparkles size={18} />

              Rewrite Script

            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: .98 }}
              className="
                w-full
                rounded-2xl
                border
                border-border
                bg-background
                p-4
                flex
                items-center
                gap-3
              "
            >

              <RefreshCw size={18} />

              Regenerate Scene

            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: .98 }}
              className="
                w-full
                rounded-2xl
                border
                border-border
                bg-background
                p-4
                flex
                items-center
                gap-3
              "
            >

              <RotateCcw size={18} />

              Reset Changes

            </motion.button>

          </div>

        </div>

        {/* AI Prompt */}

        <div className="pt-2">

          <label className="text-sm text-muted">

            Ask AI

          </label>

          <textarea
            rows={5}
            placeholder="Example: Make the intro more emotional..."
            className="
              mt-2
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              p-4
              resize-none
              outline-none
              focus:border-primary
            "
          />

          <Button
            className="w-full mt-4"
          >
            <Sparkles size={18} />

            Update Project
          </Button>

        </div>

      </div>

    </div>
  );
}