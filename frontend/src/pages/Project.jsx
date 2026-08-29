import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PreviewPlayer from "../components/editor/PreviewPlayer";
import Storyboard from "../components/editor/Storyboard";
import WorkspaceTabs from "../components/editor/WorkspaceTabs";
import WorkspacePanel from "../components/editor/WorkspacePanel";
import {

  PanelLeftClose,
  
  PanelLeftOpen,
  
  PanelRightClose,
  
  PanelRightOpen,
  
  } from "lucide-react";
  import { motion } from "framer-motion";



export default function Project() {


const {
  scenes,
  setScenes,

  activeScene,
  setActiveScene,

  playing,
  setPlaying,

  currentTime,
  setCurrentTime,

  updateScene,

  addScene,

  deleteScene,

  duplicateScene,

  moveSceneUp,

  moveSceneDown,

  seekToScene,

  totalDuration
} = useOutletContext();


  const [activeTab, setActiveTab] = useState("script")
  
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [cinemaMode]=useState(false);
  const [leftWidth, setLeftWidth] = useState(320);
  const [rightWidth, setRightWidth] = useState(320);
  const [resizing, setResizing] = useState(null);

  // Playback timer
  useEffect(() => {

    if (!playing) return;

    const timer = setInterval(() => {

      setCurrentTime(prev =>
        Math.min(prev + 1, totalDuration)
    );
    },1000);

    return ()=>clearInterval(timer);

  }, [playing, totalDuration, setCurrentTime]);


  // Update active scene based on current playback time
  useEffect(() => {

    let total = 0;

    for(let i=0;i<scenes.length;i++){

        total += scenes[i].durationSeconds;

        if(currentTime < total){

            if(activeScene !== i){

                setActiveScene(i);

            }

            break;

        }

    }

}, [currentTime, scenes, activeScene, setActiveScene]);



  

  //const progress =
  //totalDuration
  //? (currentTime / totalDuration) * 100
  //: 0;

  // Stop playback when video reaches the end
  useEffect(() => {

    if(currentTime >= totalDuration){

        setPlaying(false);

        setCurrentTime(0);

        setActiveScene(0);

    }

}, [currentTime, totalDuration, setPlaying, setCurrentTime, setActiveScene]);

  
// Start left panel resizing
const startLeftResize = () => {
    setResizing("left");
};

// Start right panel resizing
const startRightResize = () => {
    setResizing("right");
};

// Handle panel resizing
useEffect(() => {

  function handleMove(e){

      if(resizing==="left"){

          setLeftWidth(

              Math.min(
                  420,
                  Math.max(220,e.clientX)
              )

          );

      }

      if(resizing==="right"){

          const width =
              window.innerWidth-e.clientX;

          setRightWidth(

              Math.min(
                  420,
                  Math.max(280,width)
              )

          );

      }

  }

  function stop(){

      setResizing(null);

  }

  window.addEventListener("mousemove",handleMove);

  window.addEventListener("mouseup",stop);

  return ()=>{

      window.removeEventListener(
          "mousemove",
          handleMove
      );

      window.removeEventListener(
          "mouseup",
          stop
      );

  };

},[resizing]);

useEffect(() => {

  function shortcuts(e){

      if(e.key==="Tab"){

          e.preventDefault();

          setLeftCollapsed(v=>!v);

      }

      if(e.key==="i"){

          setRightCollapsed(v=>!v);

      }

  }

  window.addEventListener("keydown",shortcuts);

  return ()=>{

      window.removeEventListener(
          "keydown",
          shortcuts
      );

  };

},[]);

useEffect(()=>{

  if(cinemaMode){

      setLeftCollapsed(true);

      setRightCollapsed(true);

  }

},[cinemaMode]);

useEffect(()=>{

  localStorage.setItem(

      "editor-layout",

      JSON.stringify({

          leftWidth,
          rightWidth,
          leftCollapsed,
          rightCollapsed,

      })

  );

},[
leftWidth,
rightWidth,
leftCollapsed,
rightCollapsed
]);

useEffect(()=>{

  const saved = JSON.parse(
    localStorage.getItem("editor-layout") || "null"
)

  

  if(!saved)return;

  setLeftWidth(saved.leftWidth);

  setRightWidth(saved.rightWidth);

  setLeftCollapsed(saved.leftCollapsed);

  setRightCollapsed(saved.rightCollapsed);

},[]);
 
  return (

<div className="h-screen flex flex-col overflow-hidden">

    {/* <ProjectHeader project={project} /> */}

    {/* Preview Section */}

    <div className="flex-1 min-h-0">

    <div
        className="h-full grid transition-all gap-0 duration-300"
          style={{
            gridTemplateColumns: `
                ${leftCollapsed ? 72 : leftWidth}px
                minmax(0,1.8fr)
                ${rightCollapsed ? 72 : rightWidth}px
            `,
        }}
      >

          {/* LEFT */}

          <motion.aside
            layout
            transition={{ duration: .25 }}
            className="
            relative
            flex
            flex-col
            h-full
            bg-surface
            border-r
            border-border
            overflow-hidden
            "
          >
            <div
    className="
        h-14
        border-b
        border-border
        flex
        items-center
        justify-end
        px-3
    "
>

    <button
        onClick={() =>
            setLeftCollapsed(!leftCollapsed)
        }
        className="
            w-9
            h-9
            rounded-xl
            hover:bg-background
            transition
        "
    >

{leftCollapsed ? (
    <PanelLeftOpen size={18}/>
) : (
    <PanelLeftClose size={18}/>
)}

    </button>

</div>

<div
    onMouseDown={startLeftResize}
    onDoubleClick={() => {

      setLeftWidth(260);
  
  }}
    className="
        absolute
        top-0
        right-0
        w-1
        h-full
        cursor-col-resize
    "
/>
            <div className="flex-1 overflow-y-auto pb-20">

            {!leftCollapsed && (
              <Storyboard
                  scenes={scenes}
                  activeScene={activeScene}
                  playing={playing}
                  onSelect={seekToScene}
                  onAddScene={addScene}
                  onDuplicate={duplicateScene}
                  onDelete={deleteScene}
                  onMoveUp={moveSceneUp}
                  onMoveDown={moveSceneDown}
              />
            )}
            </div>

          </motion.aside>

          {/* CENTER */}
          <main
            className="
              h-full
              min-h-0
              min-w-0
              flex
              flex-col
            "
          >

        {/* Preview */}

       
            <PreviewPlayer
                 scene={scenes[activeScene]}
                 scenes={scenes}
                 activeScene={activeScene}
                 seekToScene={seekToScene}
                 playing={playing}
                 setPlaying={setPlaying}
                 currentTime={currentTime}
                 setCurrentTime={setCurrentTime}
                 totalDuration={totalDuration}
            />

        {/* AI */}

      

</main>

          {/* RIGHT */}

          <motion.aside
          layout
          transition={{
          duration:.25
          }}
              className="
              relative
                  flex
                  flex-col
                  h-full
                  border-l
                  border-border
                  bg-surface
                  overflow-hidden
              "
          >



<div
    className="
        h-14
        border-b
        border-border
        flex
        items-center
        justify-start
        px-3
    "
>

    <button
        onClick={() =>
            setRightCollapsed(!rightCollapsed)
        }
        className="
            w-9
            h-9
            rounded-xl
            hover:bg-background
            transition
        "
    >

{rightCollapsed ? (
    <PanelRightOpen size={18}/>
) : (
    <PanelRightClose size={18}/>
)}

    </button>

</div>
<div
    onMouseDown={startRightResize}
    onDoubleClick={() => {

      setRightWidth(320);
  
  }}
    className="
        absolute
        top-0
        left-0
        w-1
        h-full
        cursor-col-resize
    "
/>
          <div className="flex-1 overflow-y-auto pb-36">
          {!rightCollapsed && (
<>
              <WorkspaceTabs
                  activeTab={activeTab}
                  onChange={setActiveTab}
              />

              <div className="flex-1 overflow-auto">

                  <WorkspacePanel
                      activeTab={activeTab}
                      scene={scenes[activeScene]}
                      updateScene={updateScene}
                      scenes={scenes}
                      setScenes={setScenes}
                      activeScene={activeScene}
                  />

              </div>
              </>
          )}
              </div>

          </motion.aside>

      </div>

    </div>


    

</div>

  );

}