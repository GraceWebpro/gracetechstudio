import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Sparkles,
  Upload,
  Image,
  FileText,
  UserCircle2,
} from "lucide-react";
import FloatingMenu from "../ui/FloatingMenu";

export default function AddSceneCard({
  onGenerateAI,
  onUpload,
  onImages,
  onAvatar,
  onBlank,
}) {
  const [open, setOpen] = useState(false);

    const ref = useRef(null);




  const actions = [
    {
      icon: Sparkles,
      label: "AI",
      color: "bg-violet-500",
      onClick: onGenerateAI,
    },
    {
      icon: Upload,
      label: "Video",
      color: "bg-blue-500",
      onClick: onUpload,
    },
    {
      icon: Image,
      label: "Images",
      color: "bg-emerald-500",
      onClick: onImages,
    },
    {
      icon: UserCircle2,
      label: "Avatar",
      color: "bg-orange-500",
      onClick: onAvatar,
    },
    {
      icon: FileText,
      label: "Blank",
      color: "bg-slate-600",
      onClick: onBlank,
    },
  ];

  const items = [
    {
      icon: Sparkles,
      title: "Generate with AI",
      subtitle: "Describe your scene",
      color: "bg-violet-500",
      action: onGenerateAI,
    },
    {
      icon: Upload,
      title: "Upload Video",
      subtitle: "Import existing footage",
      color: "bg-blue-500",
      action: onUpload,
    },
    {
      icon: Image,
      title: "Add Images",
      subtitle: "Create slideshow scenes",
      color: "bg-emerald-500",
      action: onImages,
    },
    {
      icon: UserCircle2,
      title: "Talking Avatar",
      subtitle: "Generate AI presenter",
      color: "bg-orange-500",
      action: onAvatar,
    },
    {
      icon: FileText,
      title: "Blank Scene",
      subtitle: "Start from scratch",
      color: "bg-slate-600",
      action: onBlank,
    },
  ];

  return (
    <div
      ref={ref}
      className="relative"
    >
      <motion.button
        whileHover={{
          y: -6,
          scale: 1.02,
        }}
        whileTap={{
          scale: .98,
        }}
        onClick={() => setOpen(v => !v)}
        className="
        w-full
        rounded-3xl
        border-2
        border-dashed
        border-primary/30
        bg-background
        hover:border-primary
        hover:bg-primary/5
        transition
        "
      >
        <div className="py-12 flex flex-col items-center">

          <motion.div
         
            animate={{
              rotate: open ? 45 : 0,
            }}
            className="
            w-20
            h-20
            rounded-full
            bg-primary/10
            border
            border-primary/20
            flex
            items-center
            justify-center
            "
          >
            <Plus
              size={34}
              className="text-primary"
            />
          </motion.div>

          <h3 className="mt-6 text-lg font-semibold">
            Add Scene
          </h3>

          <p className="mt-2 text-sm text-muted">
            AI or Manual
          </p>

        </div>
      </motion.button>

      <FloatingMenu
    open={open}
    anchorRef={ref}
    onClose={() => setOpen(false)}
    offsetX={20}
    offsetY={-340}
>
    <div className="w-[360px]">

        {/* Header */}

        <div
            className="
                px-5
                py-4
                border-b
                border-border
            "
        >
            <h3 className="text-lg font-semibold">
                Add New Scene
            </h3>

            <p className="text-sm text-muted mt-1">
                Choose how you'd like to create your next scene.
            </p>
        </div>

        {/* Options */}

        <div className="p-3 space-y-2">

            {items.map((item) => {

                const Icon = item.icon;

                return (

                    <motion.button
                        key={item.title}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: .98 }}
                        onClick={() => {
                            item.action?.();
                            setOpen(false);
                        }}
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background
                            px-4
                            py-4
                            flex
                            items-center
                            gap-4
                            text-left
                            transition
                            hover:border-primary/40
                            hover:bg-primary/5
                        "
                    >

                        <div
                            className={`
                                w-12
                                h-12
                                rounded-xl
                                ${item.color}
                                flex
                                items-center
                                justify-center
                                text-white
                                shrink-0
                            `}
                        >
                            <Icon size={22}/>
                        </div>

                        <div className="flex-1">

                            <h4 className="font-semibold">
                                {item.title}
                            </h4>

                            <p className="text-sm text-muted mt-1">
                                {item.subtitle}
                            </p>

                        </div>

                        <Plus
                            size={18}
                            className="
                                text-muted
                                opacity-0
                                transition
                                group-hover:opacity-100
                            "
                        />

                    </motion.button>

                );

            })}

        </div>

    </div>
</FloatingMenu>

    </div>
  );
}