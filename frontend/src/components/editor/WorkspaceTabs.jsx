import { motion } from "framer-motion";
import {
  FileText,
  Image,
  Mic,
  Music4,
  Captions,
  Wand2,
  Palette,
  Download,
} from "lucide-react";

const tabs = [
  {
    id: "script",
    label: "Script",
    icon: FileText,
  },
  {
    id: "assets",
    label: "Assets",
    icon: Image,
  },
  {
    id: "voice",
    label: "Voice",
    icon: Mic,
  },
  {
    id: "music",
    label: "Music",
    icon: Music4,
  },
  {
    id: "captions",
    label: "Captions",
    icon: Captions,
  },
  {
    id: "animations",
    label: "Animations",
    icon: Wand2,
  },
  {
    id: "brand",
    label: "Brand",
    icon: Palette,
  },
  {
    id: "output",
    label: "Output",
    icon: Download,
  },
];

export default function WorkspaceTabs({
  activeTab,
  onChange,
}) {
  return (
    <div className="border-b border-border bg-surface">

      {/* Header */}

      <div className="px-5 pt-4 pb-3">
        <h2 className="text-sm font-semibold">
          Inspector
        </h2>

        <p className="text-xs text-muted mt-1">
          Edit the selected scene
        </p>
      </div>

      {/* Toolbar */}

      <div className="px-4 pb-4">
        <div
          className="
            grid
            grid-cols-4
            gap-2
          "
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;

            const active =
              activeTab === tab.id;

            return (
              <button
                key={tab.id}
                title={tab.label}
                onClick={() =>
                  onChange(tab.id)
                }
                className="
                  relative
                  h-14
                  rounded-xl
                  border
                  transition-all
                  duration-200
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1.5
                "
              >
                {active && (
                  <motion.div
                    layoutId="active-workspace-tab"
                    className="
                      absolute
                      inset-0
                      rounded-2xl
                      bg-primary/10
                      border
                      border-primary/20
                    "
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                    }}
                  />
                )}

                <Icon
                  size={19}
                  className={`relative z-10 ${
                    active
                      ? "text-primary"
                      : "text-muted"
                  }`}
                />

                <span
                  className={`relative z-10 text-[11px] font-medium ${
                    active
                      ? "text-primary"
                      : "text-muted"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}