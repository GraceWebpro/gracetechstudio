import { motion, AnimatePresence } from "framer-motion";

import VoiceCard from "../ui/VoiceCard";
import CloneVoiceCard from "../ui/CloneVoiceCard";
import EmptyVoiceState from "./EmptyVoiceState";

export default function VoiceGrid({
  voices = [],
  loading = false,

  selectedVoice,

  onSelect,

  onPreview,

  onMenu,

  onClone,
}) {
  if (loading) {
    return (
      <div
        className="
        grid
        gap-6

        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );
  }

  if (!loading && voices.length === 0) {
    return (
      <EmptyVoiceState
        onClone={onClone}
      />
    );
  }

  return (
    <motion.div
      layout
      className="
      grid
      gap-6

      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      2xl:grid-cols-4
    "
    >
      {/* Clone Voice */}

      <CloneVoiceCard
        onClick={onClone}
      />

      {/* Voice Cards */}

      <AnimatePresence mode="popLayout">
        {voices.map((voice) => (
          <motion.div
            key={voice.id}
            layout
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <VoiceCard
              voice={voice}
              selected={
                selectedVoice === voice.id
              }
              onSelect={() =>
                onSelect?.(voice)
              }
              onPreview={() =>
                onPreview?.(voice)
              }
              onMenu={() =>
                onMenu?.(voice)
              }
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------------- Loading -------------------------------- */

function LoadingCard() {
  return (
    <div
      className="
      h-[290px]

      rounded-3xl

      border
      border-border

      bg-surface

      p-5

      animate-pulse
    "
    >
      <div
        className="
        w-14
        h-14
        rounded-2xl
        bg-border
      "
      />

      <div
        className="
        mt-6

        h-5
        w-36

        rounded-full
        bg-border
      "
      />

      <div
        className="
        mt-3

        h-4
        w-48

        rounded-full
        bg-border
      "
      />

      <div className="mt-6 flex gap-2">
        <div
          className="
          h-7
          w-20
          rounded-full
          bg-border
        "
        />

        <div
          className="
          h-7
          w-24
          rounded-full
          bg-border
        "
        />

        <div
          className="
          h-7
          w-16
          rounded-full
          bg-border
        "
        />
      </div>

      <div className="mt-10 flex justify-between">
        <div
          className="
          h-10
          w-28
          rounded-xl
          bg-border
        "
        />

        <div
          className="
          h-8
          w-20
          rounded-full
          bg-border
        "
        />
      </div>
    </div>
  );
}