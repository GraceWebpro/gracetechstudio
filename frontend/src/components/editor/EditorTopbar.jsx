import { motion } from "framer-motion";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Share2,
  Save,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function EditorTopbar({ 
  title="Untitled Project", 
  onExport,
  onRedo,
  onUndo,
  onSave, 
  onShare,

}) {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .4 }}
      className="
        sticky
        top-0
        z-50
        border-b
        border-border
        bg-background/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          min-h-20
          px-4
          sm:px-6
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* Left */}

        <div className="flex items-center gap-3 min-w-0">

          <button
            onClick={() => navigate("/projects")}
            className="
              flex
              items-center
              gap-3
              text-muted
              hover:text-text
              transition
            "
          >
            <ArrowLeft size={20} />

            <span className="hidden sm:block">
              Back
            </span>
          </button>

          <div className="min-w-0">

            <h1 className="text-base
sm:text-xl
font-semibold
truncate
max-w-[160px]
sm:max-w-none">
              {title}
            </h1>

          </div>

        </div>

        {/* Center */}

        <div
className="
flex
items-center
gap-2
absolute
left-1/2
-translate-x-1/2
"
>
          <button
          onClick={onUndo}
            className="
              w-11
              h-11
              rounded-2xl
              border
              border-border
              bg-surface
              flex
              items-center
              justify-center
              hover:border-primary
              transition
              disabled:opacity-40

disabled:cursor-not-allowed
            "
          >
            <Undo2 size={18} />
          </button>

          <button
          onClick={onRedo}
            className="
              w-11
              h-11
              rounded-2xl
              border
              border-border
              bg-surface
              flex
              items-center
              justify-center
              hover:border-primary
              transition
              disabled:opacity-40

disabled:cursor-not-allowed
            "
          >
            <Redo2 size={18} />
          </button>

        </div>

        {/* Right */}

        <div className="flex items-center gap-2">

          <Button onClick={onSave} variant="secondary">

            <Save size={18} />

            <span className="hidden lg:block">
Save
</span>

          </Button>

          <Button onClick={onShare} variant="secondary">

            <Share2 size={18} />

            <span className="hidden lg:block">
Share
</span>

          </Button>

          <Button onClick={onExport}>

            <Download size={18} />

            <span className="hidden lg:block">
              Export
            </span>

          </Button>

          <button
            className="
            w-10
            h-10
            sm:w-11
            sm:h-11
              rounded-2xl
              border
              border-border
              bg-surface
              flex
              items-center
              justify-center
              hover:border-primary
              transition-all
            "
          >
            <MoreHorizontal size={20} />
          </button>


        </div>

      </div>
    </motion.header>
  );
}