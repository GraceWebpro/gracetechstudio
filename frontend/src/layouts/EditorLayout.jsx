import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import EditorTopbar from "../components/editor/EditorTopbar";
import ExportModal from "../components/editor/ExportModal";
import ExportSettingsModal from "../components/editor/ExportSettingsModal";
import { getProject } from "../services/projectService";
import { getScenes } from "../services/SceneService";
import { updateScene as updateSceneDB } from "../services/SceneService";
import { uploadVisual } from "../services/VisualService";

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

export default function EditorLayout() {
  const { projectId } = useParams();

  const [project, setProject] = useState("");
  
  const [scenes, setScenes] = useState(initialScenes);

  const [activeScene, setActiveScene] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [history, setHistory] = useState([]);

  const [future, setFuture] = useState([]);

  const [showExport, setShowExport] = useState(false);

  const [progress, setProgress] = useState(0);

  const [step, setStep] = useState("Preparing export...");

  const [showExportSettings, setShowExportSettings] = useState(false);

  const [filename, setFilename] = useState("My AI Video");
  const [resolution, setResolution] = useState("1080p");
  const [fps, setFps] = useState("30 FPS");
  const [format, setFormat] = useState("MP4");

  useEffect(() => {
    async function load() {
        const project = await getProject(projectId);

        setProject(project);
    }

    load();
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;

    async function loadProject(){

        try{

            const projectData =
                await getProject(projectId);

            const scenesData =
                await getScenes(projectId);

            setProject(projectData);

            setScenes(
                scenesData.map(scene=>({

                    id:scene.id,

                    title:scene.title,

                    script:scene.script,

                    duration:scene.duration,

                    durationSeconds:
                        scene.duration_seconds,

                    thumbnail:
                        scene.thumbnail,

                    visualPrompt:
                        scene.visual_prompt,

                    voice:
                        scene.voice,

                    voiceStyle:
                        scene.voice_style,

                    speechSpeed:
                        scene.speech_speed,

                    emphasis:
                        scene.emphasis,

                    captions:
                        scene.captions,

                    music:
                        scene.music,

                }))
            );

        }

        catch(err){

            console.error(err);

        }

    }

    if(projectId){

        loadProject();

    }

  },[projectId]);

  const undo = () => {

    if (!history.length) return;
  
    const previous = history[history.length - 1];
  
    setFuture(prev => [scenes, ...prev]);
  
    setScenes(previous);
  
    setHistory(history.slice(0, -1));
  
  };
  
  const redo = () => {
  
    if (!future.length) return;
  
    const next = future[0];
  
    setHistory(prev => [...prev, scenes]);
  
    setScenes(next);
  
    setFuture(future.slice(1));
  
  };
  
  const saveProject = async () => {
  
    await fetch("/api/projects/save",{
  
        method:"POST",
  
        body:JSON.stringify({
  
            project,
  
            scenes
  
        })
  
    });
  
  };
  
  const shareProject = async () => {
  
    await navigator.clipboard.writeText(
  
        window.location.href
  
    );
  
  };

  const openExportSettings = () => {

    setShowExportSettings(true);

  };

  const startExport = () => {

    setShowExport(false);

    setProgress(0);

    setStep("Preparing export...");

    setShowExport(true);


    const stages = [
        "Preparing export...",
        "Rendering frames...",
        "Encoding video...",
        "Optimizing quality...",
        "Finalizing..."
    ];

    let current = 0;

    const interval = setInterval(() => {

        current += 20;

        setProgress(current);

        if (current < 100) {

            setStep(stages[current / 20]);

        } else {

            setStep("Export Complete");

            clearInterval(interval);

        }

      }, 900);

  };


  const addScene = () => {

    const newScene = {
      id: scenes.length + 1,
      title: `Scene ${scenes.length + 1}`,
      duration: "00:15",
      script: "Describe this scene...",
      thumbnail: null,
    };
  
    setScenes([...scenes, newScene]);
  
    setActiveScene(scenes.length);
  
  };

  const duplicateScene = (index) => {

    const scene = scenes[index];
  
    const copy = {
      ...scene,
      id: Date.now(),
      title: `${scene.title} Copy`,
    };
  
    const updated = [...scenes];
  
    updated.splice(index + 1, 0, copy);
  
    setScenes(
      updated.map((scene, i) => ({
        ...scene,
        id: i + 1,
      }))
    );
  
  };

  const deleteScene = (index) => {
    console.log("Delete clicked");


    if (scenes.length === 1) return;
  
    const updated = scenes.filter((_, i) => i !== index);
  
    setScenes(
      updated.map((scene, i) => ({
        ...scene,
        id: i + 1,
      }))
    );
  
    if (activeScene >= updated.length) {
      setActiveScene(updated.length - 1);
    }
  
  };

  const moveSceneUp = (index) => {

    if (index === 0) return;
  
    const updated = [...scenes];
  
    [updated[index], updated[index - 1]] = [
      updated[index - 1],
      updated[index],
    ];
  
   setHistory(prev => [...prev, scenes]);

setFuture([]);

setScenes(updated);
  
    setActiveScene(index - 1);
  
  };

  const moveSceneDown = (index) => {

    if (index === scenes.length - 1) return;
  
    const updated = [...scenes];
  
    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];
  
    setHistory(prev => [...prev, scenes]);

setFuture([]);

setScenes(updated);
  
    setActiveScene(index + 1);
  
  };

  const updateScene = (changes) => {

    const updated = [...scenes];

    updated[activeScene] = {

        ...updated[activeScene],

        ...changes,

    };

    setHistory(prev => [...prev, scenes]);

setFuture([]);

setScenes(updated);

  };

  const seekToScene = (index) => {

    index = Math.max(
        0,
        Math.min(index, scenes.length - 1)
    );

    let time = 0;

    for (let i = 0; i < index; i++) {
        time += scenes[i].durationSeconds;
    }

    setCurrentTime(time);
    setActiveScene(index);

  };


useEffect(()=>{

  const handler=(e)=>{
  
  if(e.ctrlKey && e.key==="z"){
  
  e.preventDefault();
  
  undo();
  
  }
  
  if(e.ctrlKey && e.shiftKey && e.key==="Z"){
  
  redo();
  
  }
  
  if(e.ctrlKey && e.key==="s"){
  
  e.preventDefault();
  
  saveProject();
  
  }
  
  };
  
  window.addEventListener("keydown",handler);
  
  return ()=>window.removeEventListener("keydown",handler);
  
  },[]);

  const totalDuration = scenes.reduce(

    (sum,scene)=>sum+scene.durationSeconds,
    
    0
    
  );

  async function handleUploadVisual(file) {

    try{
  
        const url = await uploadVisual(file);
  
        const scene = scenes[activeScene];
  
        await updateSceneDB(scene.id,{
            thumbnail:url
        });
  
        updateScene({
            thumbnail:url
        });
  
    }
  
    catch(err){
  
        console.error(err);
  
        alert("Upload failed.");
  
    }
  
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Background Glow */}

      <div
        className="
          fixed
          top-[-250px]
          right-[-150px]
          h-[600px]
          w-[600px]
          rounded-full
          bg-primary/10
          blur-[160px]
          pointer-events-none
        "
      />

      <div
        className="
          fixed
          bottom-[-250px]
          left-[-150px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/5
          blur-[160px]
          pointer-events-none
        "
      />

      <EditorTopbar 
        title={project.title}
        onExport={openExportSettings}
        onUndo={undo} 
        onRedo={redo}
        onSave={saveProject}
        onShare={shareProject}
      />

      <main
         className="
         relative
         z-10
         h-[calc(100vh-72px)]
         w-full
       "
      >
        <Outlet
          context={{
            project,
            setProject,

            scenes,
            setScenes,

            activeScene,
            setActiveScene,

            playing,
            setPlaying,

            currentTime,
            setCurrentTime,

            history,
            future,

            undo,
            redo,

            updateScene,
            addScene,
            deleteScene,
            duplicateScene,
            moveSceneUp,
            moveSceneDown,
            seekToScene,
            handleUploadVisual,

            totalDuration
          }}
        />
      </main>

      <ExportSettingsModal
        open={showExportSettings}
        onClose={() => setShowExportSettings(false)}
        filename={filename}
        setFilename={setFilename}
        resolution={resolution}
        setResolution={setResolution}
        fps={fps}
        setFps={setFps}
        format={format}
        setFormat={setFormat}
        onExport={() => {
          setShowExportSettings(false);
          startExport(); // your existing rendering modal
        }}
      />

      <ExportModal
        open={showExport}
        exporting={progress < 100}
        progress={progress}
        step={step}
        onClose={() => setShowExport(false)}
      />

    </div>
  );
}