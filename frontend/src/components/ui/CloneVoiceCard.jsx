import { motion } from "framer-motion";
import {
  Plus,
  Mic2,
  Upload,
  Sparkles,
} from "lucide-react";


export default function CloneVoiceCard({
  onClick,
}) {

  return (

    <motion.button

      onClick={onClick}

      whileHover={{
        y:-6,
        scale:1.02,
      }}

      whileTap={{
        scale:.98,
      }}

      className="
      group
      relative
      overflow-hidden

      rounded-3xl

      border-2
      border-dashed
      border-primary/30

      bg-background

      hover:border-primary

      transition-all
      duration-300

      min-h-[280px]

      flex
      flex-col
      items-center
      justify-center

      text-center

      "
    >

      {/* Background glow */}

      <div
        className="
        absolute
        inset-0

        opacity-0
        group-hover:opacity-100

        transition

        bg-gradient-to-br
        from-primary/10
        via-transparent
        to-blue-500/10
        "
      />


      <div
        className="
        relative

        w-20
        h-20

        rounded-3xl

        bg-primary/10

        border
        border-primary/20

        flex
        items-center
        justify-center

        group-hover:scale-110

        transition
        "
      >

        <Plus
          size={36}
          className="
          text-primary
          "
        />

      </div>



      <h3
        className="
        relative

        mt-6

        text-lg
        font-semibold
        "
      >

        Clone New Voice

      </h3>



      <p
        className="
        relative

        mt-2

        text-sm
        text-muted

        max-w-[220px]

        "
      >

        Create your own AI voice using recordings or uploads.

      </p>



      <div
        className="
        relative

        mt-5

        flex
        items-center
        gap-2

        text-xs

        text-muted
        "
      >

        <span
          className="
          flex
          items-center
          gap-1
          "
        >

          <Mic2 size={14}/>

          Record

        </span>


        <span>
          •
        </span>


        <span
          className="
          flex
          items-center
          gap-1
          "
        >

          <Upload size={14}/>

          Upload

        </span>


      </div>



      <div
        className="
        relative

        mt-4

        flex
        items-center
        gap-1

        rounded-full

        bg-primary/10

        px-3
        py-1

        text-xs

        text-primary

        "
      >

        <Sparkles size={12}/>

        AI Voice Clone

      </div>


    </motion.button>

  );

}