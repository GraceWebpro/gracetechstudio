import { motion } from "framer-motion";
import {
  MoreVertical,
  Play,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Mic2,
} from "lucide-react";

export default function VoiceCard({
  voice,
  selected = false,
  playing = false,
  onSelect,
  onPreview,
  onMenu,
}) {
  const status = {
    ready: {
      icon: CheckCircle2,
      text: "Ready",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },

    training: {
      icon: Clock3,
      text: "Training",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },

    failed: {
      icon: AlertCircle,
      text: "Failed",
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  };

  const StatusIcon = status[voice.status].icon;

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.99,
      }}
      onClick={onSelect}
      className={`
relative
group
cursor-pointer
overflow-hidden
rounded-3xl
border
transition-all
duration-300

${
  selected
    ? "border-primary shadow-xl bg-primary/5"
    : "border-border bg-surface hover:border-primary/40"
}
`}
    >
      {/* Glow */}

      <div
        className="
absolute
inset-0
opacity-0
group-hover:opacity-100
transition
bg-gradient-to-br
from-primary/5
via-transparent
to-blue-500/5
"
      />

      <div className="relative p-5">

        {/* Top */}

        <div className="flex justify-between items-start">

          <div
            className={`
w-14
h-14
rounded-2xl
flex
items-center
justify-center
text-white
shadow-lg

${
  voice.type === "clone"
    ? "bg-gradient-to-br from-orange-500 to-red-500"
    : "bg-gradient-to-br from-primary to-blue-600"
}
`}
          >
            <Mic2 size={24} />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onMenu?.();
            }}
            className="
opacity-0
group-hover:opacity-100
transition
w-9
h-9
rounded-xl
hover:bg-background
flex
items-center
justify-center
"
          >
            <MoreVertical size={17} />
          </button>

        </div>

        {/* Name */}

        <div className="mt-5">

          <h3 className="font-semibold text-lg">

            {voice.name}

          </h3>

          <p className="text-sm text-muted mt-1">

            {voice.description}

          </p>

        </div>

        {/* Language */}

        <div className="mt-5 flex flex-wrap gap-2">

          <Badge>

            {voice.language}

          </Badge>

          <Badge>

            {voice.gender}

          </Badge>

          <Badge>

            {voice.provider}

          </Badge>

        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.();
            }}
            className="
flex
items-center
gap-2
rounded-xl
border
border-border
bg-background
px-3
py-2
text-sm
hover:border-primary
transition
"
          >
            <Play
              size={15}
              fill={playing ? "currentColor" : "none"}
            />

            {playing ? "Playing..." : "Preview"}
          </button>

          <div
            className={`
flex
items-center
gap-2
rounded-full
px-3
py-1.5
text-xs
font-medium

${status[voice.status].bg}
${status[voice.status].color}
`}
          >
            <StatusIcon size={14} />

            {status[voice.status].text}

          </div>

        </div>

      </div>

      {/* Selected Border */}

      {selected && (

        <motion.div
          layoutId="voice-selected"
          className="
absolute
inset-0
rounded-3xl
ring-2
ring-primary
pointer-events-none
"
        />

      )}
    </motion.div>
  );
}

function Badge({ children }) {
  return (
    <div
      className="
rounded-full
border
border-border
bg-background
px-3
py-1
text-xs
text-muted
"
    >
      {children}
    </div>
  );
}