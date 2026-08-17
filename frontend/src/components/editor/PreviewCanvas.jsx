import { motion } from "framer-motion";
import {
  Play,
  Pause,
} from "lucide-react";
import { useRef } from "react";

export default function PreviewCanvas({
  scene,
  playing,
  onTogglePlay,
}) {
  const previewRef = useRef(null);
  const title = scene?.title ?? "Untitled Scene";
const script = scene?.script ?? "";

  
  return (
      <div
      className="
      p-2
      md:p-3
      h-full
flex      "
      >      
      <motion.div
        animate={{
          backgroundPosition: [
            "0% 0%",
            "100% 100%",
            "0% 0%",
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        ref={previewRef}
        className="
        relative
        overflow-hidden
        
        w-full
        h-full
        rounded-3xl
        bg-gradient-to-br
        from-primary/10
        via-background
        to-blue-500/10
        
        bg-[length:200%_200%]
        "
      >

        <div
        className="
        relative
        w-full
        h-full
        "
        >

        {/* Floating Glow */}

        <motion.div
          animate={{
            x: [-40, 40, -40],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -top-24
            -right-20
            w-48
h-48
sm:w-72
sm:h-72
lg:w-96
lg:h-96
            rounded-full
            bg-primary/20
            blur-[80px]
          "
        />

        <motion.div
          animate={{
            x: [30, -30, 30],
            y: [20, -20, 20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-24
            -left-20
            w-40
h-40
sm:w-60
sm:h-60
lg:w-80
lg:h-80
            rounded-full
            bg-blue-500/20
            blur-[80px]
          "
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/20" />

        {/* Top Left */}

        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 md:top-6 md:left-6">
          <div
            className="
              px-2.5
              py-1
              sm:px-3
              sm:py-1.5
              md:px-4
              md:py-2
              text-xs
              sm:text-sm
              rounded-full
              bg-background/80
              backdrop-blur-xl
              border
              border-border
              font-medium
            "
          >
            {scene?.title || "Scene 1"}
          </div>

        </div>

        {/* Center Play */}

        <div className="absolute inset-0 flex items-center justify-center">

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: .95,
            }}
            animate={{
              scale: playing ? .96 : 1,
            }}
            onClick={onTogglePlay}
            className="
            w-14
            h-14
            sm:w-16
            sm:h-16
            md:w-20
            md:h-20
            lg:w-24
            lg:h-24
              rounded-full
              bg-background/70
              backdrop-blur-xl
              border
              border-white/20
              shadow-2xl
              flex
              items-center
              justify-center
            "
          >

            {playing ?

<Pause
size={18}
className="
    sm:w-6
    sm:h-6
    md:w-8
    md:h-8
    text-white
    ml-0.5
"
fill="white"
/>

              :

              <Play
              size={18}
              className="
                  sm:w-6
                  sm:h-6
                  md:w-8
                  md:h-8
                  text-white
                  ml-0.5
              "
              fill="white"
          />

            }

          </motion.button>

        </div>

        {/* Bottom Left */}

        {!playing && (
    <div className="absolute bottom-6 left-6 max-w-xl">

        <h2 className="text-2xl font-bold text-white">

            {title}

        </h2>

        <p className="mt-2 text-white/70 line-clamp-3">

            {script}

        </p>

    </div>
)}

        {/* <div
className="
absolute
bottom-3
left-3
right-3
sm:bottom-5
sm:left-5
sm:right-5
md:bottom-4
md:left-5
md:right-5
max-w-[55%]
"
>
          <h2 className="text-white text-base
sm:text-lg
md:text-xl
lg:text-2xl font-bold">

            {scene?.title || "Ancient Egypt"}

          </h2>

          <p
className="
mt-1
sm:mt-2
max-w-full
md:max-w-xl
text-xs
sm:text-sm
md:text-base
text-white/70
line-clamp-2
line-clamp-2
md:line-clamp-3"
>
            {scene?.script ||
              "The rise of one of the greatest civilizations in human history begins along the fertile banks of the Nile River."}

          </p>

        </div> */}
</div>
      </motion.div>

    </div>
  );
}