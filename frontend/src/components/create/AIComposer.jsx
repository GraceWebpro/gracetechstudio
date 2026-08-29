import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paperclip,
  Mic,
  WandSparkles,
  ImageIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Button from "../ui/Button";

export default function AIComposer({
  value,
  onChange,
  placeholder = "Describe what you'd like to create...",
  onGenerate,
}) {
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const [settings, setSettings] = useState({
    style: "Cinematic",
    platform: "YouTube",
    duration: "2 Minutes",
    aspectRatio: "16:9",
  });

  /*
  -------------------------------------------------------
  Update settings
  -------------------------------------------------------
  */

  function updateSetting(key, value) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  /*
  -------------------------------------------------------
  Attachment
  -------------------------------------------------------
  */

  function handleAttachment(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setAttachment(file);

    // Allow selecting the same file again later
    event.target.value = "";
  }

  function removeAttachment() {
    setAttachment(null);
  }

  /*
  -------------------------------------------------------
  Generate
  -------------------------------------------------------
  */

  async function handleGenerate() {
    const prompt = value?.trim();

    if (!prompt) {
      alert("Describe what you want to create first.");
      return;
    }

    if (generating) return;

    try {
      setGenerating(true);

      const generationData = {
        prompt,

        style: settings.style,

        platform: settings.platform,

        duration: settings.duration,

        aspectRatio: settings.aspectRatio,

        attachment,
      };

      if (onGenerate) {
        await onGenerate(generationData);
      }
    } catch (error) {
      console.error("Generation error:", error);

      alert(
        error?.message ||
          "Something went wrong while starting the project."
      );
    } finally {
      setGenerating(false);
    }
  }

  /*
  -------------------------------------------------------
  Keyboard shortcut
  -------------------------------------------------------
  */

  function handleKeyDown(event) {
    if (
      event.key === "Enter" &&
      (event.metaKey || event.ctrlKey)
    ) {
      event.preventDefault();

      handleGenerate();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-border
        bg-surface
        shadow-card
      "
    >
      {/* =====================================================
          STATUS BAR
      ===================================================== */}

      <div className="px-6 pt-6 sm:px-8">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-success
                animate-pulse
              "
            />

            <span className="text-sm text-muted">
              AI Assistant Ready
            </span>

          </div>

          <span className="hidden text-xs text-muted sm:block">
            Press ⌘ + Enter to generate
          </span>

        </div>

      </div>


      {/* =====================================================
          PROMPT
      ===================================================== */}

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={generating}
        rows={8}
        placeholder={placeholder}
        className="
          min-h-[260px]
          w-full
          resize-none
          bg-transparent
          p-6
          text-lg
          outline-none
          placeholder:text-muted
          disabled:opacity-60
          sm:p-8
        "
      />


      {/* =====================================================
          ATTACHMENT PREVIEW
      ===================================================== */}

      {attachment && (

        <div className="px-6 pb-5 sm:px-8">

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-border
              bg-background
              px-4
              py-3
            "
          >

            <div className="flex min-w-0 items-center gap-3">

              <Paperclip
                size={17}
                className="shrink-0"
              />

              <div className="min-w-0">

                <p className="truncate text-sm font-medium">
                  {attachment.name}
                </p>

                <p className="text-xs text-muted">
                  {(attachment.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={removeAttachment}
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                hover:bg-surface
                transition
              "
            >
              <X size={16} />
            </button>

          </div>

        </div>

      )}


      {/* =====================================================
          ADVANCED SETTINGS
      ===================================================== */}

      <AnimatePresence>

        {showAdvancedPanel && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              overflow-hidden
              border-t
              border-border
            "
          >

            <div
              className="
                grid
                grid-cols-1
                gap-6
                p-6
                md:grid-cols-2
                sm:p-8
              "
            >

              {/* Style */}

              <div>

                <label className="mb-2 block text-sm text-muted">
                  Video Style
                </label>

                <select
                  value={settings.style}
                  onChange={(event) =>
                    updateSetting(
                      "style",
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    p-3
                    outline-none
                    focus:border-primary
                  "
                >
                  <option>Cinematic</option>
                  <option>Documentary</option>
                  <option>Modern</option>
                  <option>Minimal</option>
                </select>

              </div>


              {/* Platform */}

              <div>

                <label className="mb-2 block text-sm text-muted">
                  Platform
                </label>

                <select
                  value={settings.platform}
                  onChange={(event) =>
                    updateSetting(
                      "platform",
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    p-3
                    outline-none
                    focus:border-primary
                  "
                >
                  <option>YouTube</option>
                  <option>YouTube Shorts</option>
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>Facebook</option>
                </select>

              </div>


              {/* Duration */}

              <div>

                <label className="mb-2 block text-sm text-muted">
                  Duration
                </label>

                <select
                  value={settings.duration}
                  onChange={(event) =>
                    updateSetting(
                      "duration",
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    p-3
                    outline-none
                    focus:border-primary
                  "
                >
                  <option>30 Seconds</option>
                  <option>1 Minute</option>
                  <option>2 Minutes</option>
                  <option>5 Minutes</option>
                  <option>10 Minutes</option>
                </select>

              </div>


              {/* Aspect Ratio */}

              <div>

                <label className="mb-2 block text-sm text-muted">
                  Aspect Ratio
                </label>

                <select
                  value={settings.aspectRatio}
                  onChange={(event) =>
                    updateSetting(
                      "aspectRatio",
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    p-3
                    outline-none
                    focus:border-primary
                  "
                >
                  <option>16:9</option>
                  <option>9:16</option>
                  <option>1:1</option>
                </select>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          border-border
          px-6
          py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        {/* Left actions */}

        <div className="flex items-center gap-3">

          {/* Attachment */}

          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Attach file"
            className="
              flex
              h-11
              w-11
              cursor-pointer
              items-center
              justify-center
              rounded-2xl
              border
              border-border
              bg-background
              transition-all
              hover:border-primary
            "
          >

            <Paperclip size={18} />

            <input
              type="file"
              hidden
              accept="image/*,video/*,audio/*"
              onChange={handleAttachment}
            />

          </motion.label>


          {/* Image */}

          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Add reference image"
            className="
              flex
              h-11
              w-11
              cursor-pointer
              items-center
              justify-center
              rounded-2xl
              border
              border-border
              bg-background
              transition-all
              hover:border-primary
            "
          >

            <ImageIcon size={18} />

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAttachment}
            />

          </motion.label>


          {/* Voice */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            title="Voice input"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-border
              bg-background
              transition-all
              hover:border-primary
            "
          >

            <Mic size={18} />

          </motion.button>

        </div>


        {/* Right actions */}

        <div className="flex items-center justify-between gap-4 sm:justify-end">

          <button
            type="button"
            onClick={() =>
              setShowAdvancedPanel(
                (previous) => !previous
              )
            }
            className="
              flex
              items-center
              gap-2
              text-sm
              text-muted
              transition
              hover:text-text
            "
          >

            <SlidersHorizontal size={17} />

            {showAdvancedPanel
              ? "Hide Advanced"
              : "Advanced"}

          </button>


          <Button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="
              flex
              items-center
              gap-2
              whitespace-nowrap
            "
          >

            <WandSparkles size={18} />

            {generating
              ? "Starting..."
              : "Generate"}

          </Button>

        </div>

      </div>

    </motion.div>
  );
}