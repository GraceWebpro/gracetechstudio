import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FileText,
  Image,
  Mic,
  Music4,
  Captions,
  Wand2,
  Palette,
  Download,
  Sparkles,
  Upload,
  PlayCircle,
} from "lucide-react";
import AssetsPanel from "./AssetsPanel";
import VisualPanel from "./AssetsPanel";
import { uploadAsset } from "../../lib/storage";
import MusicPanel from "./MusicPanel";
import CaptionPanel from "./CaptionPanel";
import BrandPanel from "./BrandPanel";
import OutputPanel from "./OutputPanel";
import { updateScene as updateSceneDB } from "../../services/SceneService";
import { uploadVisual } from "../../services/VisualService";
import { useOutletContext } from "react-router-dom";
import VoicePanel from "./VoicePanel";

export default function WorkspacePanel({
    activeTab,
    scene,
    scenes,
    setScenes,
    activeScene,
}) {

  const {
    handleUploadVisual, 
    project,
} = useOutletContext();
  const [resolution,setResolution]=useState("1080p");

const [fps,setFps]=useState("30 FPS");

const [format,setFormat]=useState("MP4");
const words = scene.script.split(/\s+/).filter(Boolean).length;

const chars = scene.script.length;

const seconds = Math.ceil(words / 2.5); // about 150 words/min

const minutes = Math.floor(seconds / 60);
const remaining = seconds % 60;

async function handleUploadAsset(file) {

  const preview = URL.createObjectURL(file);

  updateScene(activeScene, {

      thumbnail: preview,

      visualType: file.type.startsWith("video")
          ? "video"
          : "image",

      visualFile: file,

  });

}



if (!scene) return null;
  const renderContent = () => {

    switch (activeTab) {

      case "script":
        return (
          <div className="space-y-6">

            <div className="flex items-center justify-between">

            <div className="space-y-3">

              <label className="text-sm text-muted">

              Scene Title

              </label>
              <div
          className="
          w-full
          min-w-0
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-border
          bg-background
          px-3
          py-2
          focus-within:border-primary
          transition
          "
        >
  <input
    value={scene.title}
    onChange={(e) => updateScene("title", e.target.value)}
    placeholder="Scene title..."
    className="
      flex-1
      min-w-0
      bg-transparent
      text-base
      font-semibold
      outline-none
    "
  />

  <button
  // onClick={handleRewrite}
    className="
      shrink-0
      flex
      items-center
      gap-1
      rounded-xl
      bg-primary
      px-2
      py-2
      text-sm
      font-medium
      text-white
      hover:opacity-90
      transition
    "
  >
    <Sparkles size={15} />
    Rewrite
  </button>
</div>

              <p className="text-sm text-muted">

              Give this scene a descriptive name.

              </p>

              </div>

              

            </div>

            <textarea
  value={scene.script}
  onChange={(e) => updateScene("script", e.target.value)}
  placeholder="Write or paste your narration..."
  className="
    w-full
    min-h-[320px]
    rounded-2xl
    border
    border-border
    bg-background
    p-4
    resize-none
    outline-none
    leading-7
    text-[15px]
    focus:border-primary
    transition
  "
/>

            

            <div className="flex justify-between text-sm text-muted">
    <span>{words} words</span>

    <span>{chars} characters</span>

    <span>
        {minutes}:{String(remaining).padStart(2,"0")} read
    </span>
</div>

          </div>
        );

      case "assets":
        return <VisualPanel 
                scene={scene}
                onUpload={handleUploadVisual}
                // onGenerate={handleGenerateVisual}
                // onSearchStock={handleSearchStock}
                // onRegenerate={handleRegenerate}
              />;

      case "voice":
          return (
            <div className="space-y-8">
        
              {/* Header */}
        
              <div>
                <h3 className="text-lg font-semibold">
                  Voice Settings
                </h3>
        
                <p className="mt-1 text-sm text-muted">
                  Customize narration, pacing and AI voice for this project.
                </p>
              </div>
        
              {/* Voice */}
        
              <div className="space-y-2">
        
                <label className="text-sm font-medium">
                  AI Voice
                </label>
        
                <select
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-primary
                  "
                >
                  <option>Grace AI (Default)</option>
                  <option>Emma</option>
                  <option>Michael</option>
                  <option>Olivia</option>
                  <option>James</option>
                </select>
        
              </div>
        
              {/* Style */}
        
              <div className="space-y-2">
        
                <label className="text-sm font-medium">
                  Speaking Style
                </label>
        
                <select
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-primary
                  "
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Storytelling</option>
                  <option>Confident</option>
                  <option>Calm</option>
                  <option>Excited</option>
                  <option>Dramatic</option>
                </select>
        
              </div>
        
              {/* Speech Speed */}
        
              <div className="space-y-3">
        
                <div className="flex justify-between">
        
                  <label className="text-sm font-medium">
                    Speech Speed
                  </label>
        
                  <span className="text-sm text-muted">
                    1.0x
                  </span>
        
                </div>
        
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                  className="w-full accent-primary"
                />
        
                <div className="flex justify-between text-xs text-muted">
                  <span>0.5x</span>
                  <span>Normal</span>
                  <span>2.0x</span>
                </div>
        
              </div>
        
              {/* Expressiveness */}

              <div className="space-y-3">

                <div className="flex justify-between">

                  <label className="text-sm font-medium">
                    Expressiveness
                  </label>

                  <span className="text-sm text-muted">
                    Natural
                  </span>

                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full accent-primary"
                />

                <div className="flex justify-between text-xs text-muted">

                  <span>Subtle</span>

                  <span>Natural</span>

                  <span>Expressive</span>

                </div>

              </div>
        
              {/* Preview */}
        
              <div
                className="
                rounded-2xl
                border
                border-border
                bg-background
                p-4
                space-y-4
                "
              >
        
                <div>
        
                  <div>
        
                    <h4 className="font-medium">
                      Voice Preview
                    </h4>
        
                    <p className="text-sm text-muted mt-1">
                      Listen before generating narration.
                    </p>
        
                  </div>
        
                  <button
                    className="
                    w-full
                    h-9
                    mt-4
                    rounded-xl
                    bg-primary
                    text-white
                    font-medium
                    hover:opacity-90
                    transition
                    "
                  >
                    ▶ Preview Voice
                  </button>
        
                </div>
        
              </div>
        
              {/* Toggles */}
        
              <div className="space-y-3">
        
                <label className="flex items-center justify-between">
        
                  <span className="text-sm">
                    Auto-generate narration
                  </span>
        
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-primary"
                  />
        
                </label>
        
                <label className="flex items-center justify-between">
        
                  <span className="text-sm">
                    Sync narration with scene duration
                  </span>
        
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-primary"
                  />
        
                </label>
        
              </div>
              <VoicePanel
    projectId={project.id}
/>
        
            </div>
          );

      case "music":
        return <MusicPanel />;

      case "captions":
        return <CaptionPanel />;

      case "animations":
        return (

          <div className="space-y-6">

            <div>

              <h3 className="text-lg font-semibold">
                Motion
              </h3>

              <p className="text-sm text-muted mt-1">
                Control how this scene moves.
              </p>

            </div>

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Camera Motion
              </label>

              <select className="w-full rounded-xl border border-border bg-background px-4 py-3">

                <option>Auto (Recommended)</option>

                <option>None</option>

                <option>Subtle</option>

                <option>Cinematic</option>

                <option>Dynamic</option>

              </select>

            </div>

            <div className="space-y-2">

              <label className="text-sm font-medium">
                Transition
              </label>

              <select className="w-full rounded-xl border border-border bg-background px-4 py-3">

                <option>Auto</option>

                <option>Fade</option>

                <option>Dissolve</option>

                <option>Cut</option>

                <option>Slide</option>

              </select>

            </div>

            <div className="space-y-2">

              <div className="flex justify-between">

                <label className="text-sm font-medium">
                  Transition Duration
                </label>

                <span className="text-sm text-muted">
                  0.8s
                </span>

              </div>

              <input
                type="range"
                min="0.2"
                max="2"
                step="0.1"
                defaultValue="0.8"
                className="w-full accent-primary"
              />

            </div>

          </div>

        );

      case "brand":
        return <BrandPanel 
          scene={scene}
          updateScene={updateScene} 
          />
        ;

      case "output":
        return <OutputPanel 
        scene={scene}
        updateScene={updateScene} 
        />;

      default:
        return null;
    }

  };

  const updateScene = (field, value) => {

    setScenes(prev =>

        prev.map((scene, index) =>

            index === activeScene

                ? {

                    ...scene,

                    [field]: value,

                }

                : scene

        )

    );

};

// const handleRewrite = async () => {

//   const rewritten = await rewriteScene(scene);

//   updateScene("script", rewritten.script);

// };



  return (

    <div
      className="
        rounded-3xl
        border
        border-border
        bg-surface
        shadow-card
        p-3
        min-h-[500px]
      "
    >

      <AnimatePresence mode="wait">

        <motion.div
          key={activeTab}
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-20 }}
          transition={{ duration:.25 }}
        >

          {renderContent()}

        </motion.div>

      </AnimatePresence>

    </div>

  );

}