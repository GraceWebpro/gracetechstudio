import { motion } from "framer-motion";
import {
  Mic2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function EmptyVoiceState({
  onClone,
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
        duration: 0.35,
      }}
      className="
        flex
        items-center
        justify-center
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-2xl

          rounded-3xl

          border
          border-border

          bg-surface

          p-10
          text-center

          shadow-xl
        "
      >
        {/* Icon */}

        <div
          className="
            mx-auto

            flex
            items-center
            justify-center

            w-24
            h-24

            rounded-3xl

            bg-primary/10

            border
            border-primary/20
          "
        >
          <Mic2
            size={42}
            className="text-primary"
          />
        </div>

        {/* Title */}

        <h2
          className="
            mt-8
            text-3xl
            font-bold
          "
        >
          No Voices Yet
        </h2>

        {/* Description */}

        <p
          className="
            mt-4
            text-muted
            leading-7
            max-w-xl
            mx-auto
          "
        >
          Create your own AI voice by recording or uploading
          voice samples. Your cloned voices will be available
          across every project in your workspace.
        </p>

        {/* Features */}

        <div
          className="
            mt-8

            grid

            gap-4

            md:grid-cols-3
          "
        >
          <Feature text="Instant previews" className="text-sm" />

          <Feature text="Natural speech" />

          <Feature text="Reusable everywhere" />
        </div>

        {/* CTA */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={onClone}
          className="
            mt-10

            inline-flex
            items-center
            gap-3

            rounded-2xl

            bg-primary

            px-6
            py-4

            font-medium
            text-white

            shadow-lg

            hover:shadow-primary/30

            transition
          "
        >
          <Sparkles size={18} />

          Clone My First Voice

          <ArrowRight size={18} />
        </motion.button>

        {/* Bottom Note */}

        <p
          className="
            mt-6
            text-xs
            text-muted
          "
        >
          Usually takes less than 2 minutes to create a
          professional-quality AI voice.
        </p>
      </div>
    </motion.div>
  );
}

function Feature({ text }) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        border
        border-border

        bg-background

        px-4
        py-4

        text-sm
      "
    >
      <CheckCircle2
        size={16}
        className="text-emerald-500"
      />

      {text}
    </div>
  );
}