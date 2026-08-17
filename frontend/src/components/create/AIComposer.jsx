import { useState } from "react";
import { motion } from "framer-motion";
import {
  Paperclip,
  Mic,
  WandSparkles,
  ImageIcon,
  SlidersHorizontal,

} from "lucide-react";
import Button from "../ui/Button";
import { AnimatePresence } from "framer-motion";
import useProject from "../../hooks/useProject";
import { createProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";

export default function AIComposer({
  value,
  onChange,
  placeholder = "Describe what you'd like to create...",
  onGenerate,
}) {
  const navigate = useNavigate

  async function handleGenerate(data) {
    try {
      const project = await createProject({
        title: data.prompt.slice(0, 60),
        prompt: data.prompt,
        status: "draft",
      });
  
      navigate(`/generation/${project.id}`);
    } catch (err) {
      console.error(err);
      alert("Couldn't create project.");
    }
  }


const { create } = useProject();

async function handleCreate() {
  const project = await create({
    title: "Ancient Egypt",
    description: "History Documentary",
  });

  console.log(project);
}
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);

  const [settings, setSettings] = useState({
      style: "Cinematic",
      platform: "YouTube",
      duration: "10 Minutes",
      aspectRatio: "16:9",
      voice: "Grace AI",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .4 }}
      className="
        relative
        rounded-[32px]
        border
        border-border
        bg-surface
        shadow-card
        overflow-hidden
      "
    >
        <div className="flex items-center gap-3 px-8 pt-2">

            {/* <div className="w-3 h-3 rounded-full bg-success"/> */}

            <div className="flex items-center justify-between pt-6">
  <div className="flex items-center gap-3">
    <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
    <span className="text-sm text-muted">
      AI Assistant Ready
    </span>
  </div>
<br />
  <span className="text-xs text-muted">
    Press ⌘ + Enter to generate
  </span>
</div>

        </div>
      <textarea
       value={value}
       onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder={placeholder}
        className="
          w-full
          min-h-[260px]
          resize-none
          bg-transparent
          outline-none
          p-8
          text-lg
          placeholder:text-muted
        "
      />

<AnimatePresence>
  {showAdvancedPanel && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="
        overflow-hidden
        border-t
        border-border
      "
    >
      <div className="grid grid-cols-2 gap-6 p-8">

        <div>
          <label className="block text-sm mb-2 text-muted">
            Video Style
          </label>

          <select value={settings.style}
    onChange={(e)=>
        setSettings({
            ...settings,
            style: e.target.value,
        })
    }className="w-full rounded-xl border border-border bg-background p-3">
            <option>Cinematic</option>
            <option>Modern</option>
            <option>Minimal</option>
            <option>Documentary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-muted">
            Platform
          </label>

          <select value={settings.platform}
    onChange={(e)=>
        setSettings({
            ...settings,
            platform: e.target.value,
        })
    }className="w-full rounded-xl border border-border bg-background p-3">
            <option>YouTube</option>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Facebook</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-muted">
            Duration
          </label>

          <select value={settings.duration}
    onChange={(e)=>
        setSettings({
            ...settings,
            duration: e.target.value,
        })
    } className="w-full rounded-xl border border-border bg-background p-3">
            <option>30 Seconds</option>
            <option>1 Minute</option>
            <option>5 Minutes</option>
            <option>10 Minutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-muted">
            Aspect Ratio
          </label>

          <select value={settings.aspectRatio}
    onChange={(e)=>
        setSettings({
            ...settings,
            aspectRatio: e.target.value,
        })
    } className="w-full rounded-xl border border-border bg-background p-3">
            <option>16:9</option>
            <option>9:16</option>
            <option>1:1</option>
          </select>
        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>

      <div className="border-t border-border px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <motion.button
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:.95 }}
            className="
              w-11
              h-11
              rounded-2xl
              bg-background
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-primary
              transition-all
            "
          >
            <Paperclip onClick={handleCreate} size={18}/>
          </motion.button>

          <motion.button
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:.95 }}
            className="
              w-11
              h-11
              rounded-2xl
              bg-background
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-primary
              transition-all
            "
          >
            <ImageIcon size={18}/>
          </motion.button>

          <motion.button
            whileHover={{ scale:1.05 }}
            whileTap={{ scale:.95 }}
            className="
              w-11
              h-11
              rounded-2xl
              bg-background
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-primary
              transition-all
            "
          >
            <Mic size={18}/>
          </motion.button>

        </div>

        <div className="flex items-center gap-4">


<button
onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
className="
  flex
  items-center
  gap-2
  text-sm
  text-muted
  hover:text-text
  transition
"
>
<SlidersHorizontal size={17} />

{showAdvancedPanel ? "Hide Advanced" : "Advanced"}
</button>

        

        <Button onClick={handleGenerate}>

          <WandSparkles size={18}/>

          Generate

        </Button>

        </div>

      </div>

    </motion.div>
  );
}