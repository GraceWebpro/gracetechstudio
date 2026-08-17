import { useRef, useState } from "react";
import { motion } from "framer-motion";

import PreviewCanvas from "./PreviewCanvas";
import VideoControls from "./VideoControls";
import AIDirector from "./AIDirector";
import ExportModal from "./ExportModal";
import { rewriteScene } from "../../services/ai/rewriteScene";

const initialScenes = [
  {
    id: 1,
    title: "Introduction",
    duration: "00:18",
    durationSeconds:18,
    script:
      "Welcome to Ancient Egypt. For over three thousand years one of the greatest civilizations flourished along the Nile.",
    thumbnail: null,
  },
  {
    id: 2,
    title: "History Begins",
    duration: "00:34",
    durationSeconds:34,
    script:
      "Ancient Egypt developed incredible engineering and culture.",
    thumbnail: null,
  },
  {
    id: 3,
    title: "The Pharaohs",
    duration: "00:28",
    durationSeconds:28,
    script:
      "The Pharaoh ruled as both king and god.",
    thumbnail: null,
  },
  {
    id: 4,
    title: "Legacy",
    duration: "00:22",
    durationSeconds:22,
    script:
      "Even today Ancient Egypt continues to inspire the world.",
    thumbnail: null,
  },
];

export default function PreviewPlayer({
  scene,
  scenes,
  setScenes,
  setHistory,
  setFuture,
  activeScene,
  seekToScene,
  playing,
  setPlaying,
  currentTime,
  setCurrentTime,
  totalDuration,
  }) {
  const [aiPrompt, setAiPrompt] = useState("")
  const previewRef = useRef(null);

  // const [playing, setPlaying] = useState(false);

  // const [currentTime, setCurrentTime] = useState(23);
  // const duration = 600; // 10 minutes

  // const [scenes, setScenes] = useState(initialScenes);
  
  // const [activeScene, setActiveScene] = useState(0)
  

  const duration = totalDuration;

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };
  

  const handleAI = async () => {

    if (!aiPrompt.trim()) return;

    const updatedScene =
        await rewriteScene(
            scenes[activeScene],
            aiPrompt
        );

    const updated = [...scenes];

    updated[activeScene] = updatedScene;

    setHistory(prev => [...prev, scenes]);

setFuture([]);

setScenes(updated);

    setAiPrompt("");

  };

  const previousScene = () => {

    if(activeScene > 0){

        seekToScene(activeScene - 1);

    }

};

const nextScene = () => {

    if(activeScene < scenes.length - 1){

        seekToScene(activeScene + 1);

    }

};

const toggleFullscreen = async () => {

  if (!document.fullscreenElement) {

      await previewRef.current?.requestFullscreen();

  } else {

      await document.exitFullscreen();

  }

};


  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        h-full
        flex
        flex-col
        rounded-[30px]
        overflow-hidden
        border
        border-border
        bg-surface
        shadow-card
        min-h-0
        " 
        ref={previewRef} 
      >
    
      {/* Preview */}

      <div className="flex-1 min-h-0">

        <PreviewCanvas
            scene={scenes[activeScene]}
            playing={playing}
            onTogglePlay={togglePlay}
        />

      </div>

      {/* Controls */}
      <div
        className="
        flex-shrink-0
        h-50
        border-t
        border-border
        "
      >
        <VideoControls
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          onPlayPause={togglePlay}
          onSeek={setCurrentTime}
          onPreviousScene={previousScene}
          onNextScene={nextScene}
          onFullscreen={toggleFullscreen}
        />
      </div>

      <div
        className="
        flex-shrink-0
        border-t
        border-border
        h-[220px]
        "
      >
        <AIDirector
          prompt={aiPrompt}
          onPromptChange={setAiPrompt}
          onGenerate={handleAI}
        />
      </div>

   
    </motion.section>
  );
}