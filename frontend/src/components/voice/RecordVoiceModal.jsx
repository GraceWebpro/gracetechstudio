import {
    useEffect,
    useRef,
    useState,
  } from "react";
  
  import {
    motion,
    AnimatePresence,
  } from "framer-motion";
  
  import {
    Mic,
    Square,
    X,
    Play,
    Pause,
    Check,
  } from "lucide-react";
  
  
  export default function RecordVoiceModal({
    open,
    onClose,
    onComplete,
  }) {
  
    const mediaRecorder =
      useRef(null);
  
    const chunks =
      useRef([]);
  
    const audioRef =
      useRef(null);
  
  
    const [recording, setRecording] =
      useState(false);
  
    const [audioURL, setAudioURL] =
      useState(null);
  
  
    const [seconds, setSeconds] =
      useState(0);
  
  
    const [playing, setPlaying] =
      useState(false);
  
  
    const [stream, setStream] =
      useState(null);
  
  
  
    const sampleText =
      `
      Welcome to this voice recording sample.
      Your voice helps create a personalized AI narrator
      that sounds natural and expressive.
      Please speak clearly and maintain a steady pace.
      `;
  
  
  
    // Timer
  
    useEffect(()=>{
  
      if(!recording) return;
  
  
      const timer =
        setInterval(()=>{
  
          setSeconds(
            prev => prev + 1
          );
  
        },1000);
  
  
      return ()=>clearInterval(timer);
  
  
    },[recording]);
  
  
  
    function formatTime(value){
  
      const min =
        Math.floor(value / 60);
  
      const sec =
        value % 60;
  
  
      return `${min}:${String(sec)
        .padStart(2,"0")}`;
  
    }
  
  
  
    async function startRecording(){
  
      try{
  
        const microphone =
          await navigator.mediaDevices
          .getUserMedia({
            audio:true
          });
  
  
        setStream(microphone);
  
  
        const recorder =
          new MediaRecorder(
            microphone
          );
  
  
        mediaRecorder.current =
          recorder;
  
  
        chunks.current=[];
  
  
  
        recorder.ondataavailable =
        (event)=>{
  
          if(event.data.size > 0){
  
            chunks.current.push(
              event.data
            );
  
          }
  
        };
  
  
  
        recorder.onstop = ()=>{
  
  
          const blob =
            new Blob(
              chunks.current,
              {
                type:"audio/webm"
              }
            );
  
  
          const url =
            URL.createObjectURL(
              blob
            );
  
  
          setAudioURL(url);
  
  
          microphone
          .getTracks()
          .forEach(
            track=>track.stop()
          );
  
        };
  
  
  
        recorder.start();
  
  
        setSeconds(0);
  
        setRecording(true);
  
  
  
      }catch(error){
  
        console.error(
          "Microphone error",
          error
        );
  
      }
  
    }
  
  
  
    function stopRecording(){
  
      if(
        mediaRecorder.current
      ){
  
        mediaRecorder.current.stop();
  
      }
  
  
      setRecording(false);
  
    }
  
  
  
    function togglePlayback(){
  
      if(!audioRef.current)
        return;
  
  
      if(playing){
  
        audioRef.current.pause();
  
      }
      else{
  
        audioRef.current.play();
  
      }
  
  
      setPlaying(!playing);
  
    }
  
  
  
    function close(){
  
      if(stream){
  
        stream
        .getTracks()
        .forEach(
          track=>track.stop()
        );
  
      }
  
  
      setRecording(false);
  
      onClose();
  
    }
  
  
  
    if(!open)
      return null;
  
  
  
    return (
  
        <AnimatePresence>
        
            <motion.div
            
            initial={{
            opacity:0
            }}
            
            animate={{
            opacity:1
            }}
            
            exit={{
            opacity:0
            }}
            
            className="
            fixed
            inset-0
            z-[9999]
            bg-black/60
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-6
            "
            
            >
            
            
            <motion.div
            
            initial={{
            scale:.95,
            y:30
            }}
            
            animate={{
            scale:1,
            y:0
            }}
            
            className="
            w-full
            max-w-xl
            rounded-3xl
            bg-surface
            border
            border-border
            shadow-2xl
            overflow-hidden
            "
            
            >
            
            
            {/* Header */}
            
            
            <div
            className="
            flex
            justify-between
            items-start
            px-7
            py-2
            border-b
            border-border
            "
            >
            
            
            <div>
            
            <h2
            className="
            text-2xl
            font-bold
            "
            >
            Record Voice
            </h2>
            
            
            <p
            className="
            text-sm
            text-muted
            mt-2
            "
            >
            
            Read the sample naturally.
            A clear recording creates a better clone.
            
            </p>
            
            </div>
            
            
            
            <button
            onClick={close}
            className="
            w-10
            h-10
            rounded-xl
            border
            border-border
            flex
            items-center
            justify-center
            "
            >
            
            <X size={18}/>
            
            </button>
            
            
            </div>
            
            
            
            
            <div
            className="
            px-7
            py-4
            space-y-4
            "
            >
            
            
            {/* Script */}
            
            
            <div
            className="
            rounded-2xl
            bg-background
            border
            border-border
            px-5
            py-4
            "
            >
            
            
            <p
            className="
            text-sm
            text-muted
            mb-2
            "
            >
            Read this:
            </p>
            
            
            <p
            className="
            leading-relaxed
            text-sm
            "
            >
            
            {sampleText}
            
            </p>
            
            
            </div>
            
            
            
            
            {/* Recorder */}
            
            
            <div
            className="
            flex
            flex-col
            items-center
            gap-4
            "
            >
            
            
            <motion.div
            
            animate={
            recording
            ? {
            scale:[
            1,
            1.15,
            1
            ]
            }
            :{}
            }
            
            transition={{
            repeat:Infinity,
            duration:1
            }}
            
            className={`
            w-28
            h-28
            rounded-full
            flex
            items-center
            justify-center
            
            ${
            recording
            ?
            "bg-red-500 text-white"
            :
            "bg-primary/10 text-primary"
            }
            
            `}
            
            >
            
            <Mic size={42}/>
            
            </motion.div>
            
            
            
            <div
            className="
            text-3xl
            font-bold
            "
            >
            
            {formatTime(seconds)}
            
            </div>
            
            
            
            </div>
            
            
            
            
            {/* Controls */}
            
            
            <div
            className="
            flex
            justify-center
            gap-4
            "
            >
            
            
            {!recording ? (
            
            <button
            
            onClick={startRecording}
            
            className="
            px-5
            py-2
            rounded-2xl
            bg-primary
            text-white
            flex
            items-center
            gap-2
            "
            
            >
            
            <Mic size={18}/>
            
            Start Recording
            
            </button>
            
            )
            
            :(
            
            <button
            
            onClick={stopRecording}
            
            className="
            px-6
            py-3
            rounded-2xl
            bg-red-500
            text-white
            flex
            items-center
            gap-2
            "
            
            >
            
            <Square size={18}/>
            
            Stop
            
            </button>
            
            )}
            
            
            </div>
            
            
            
            
            {/* Preview */}
            
            
            {audioURL && (
            
            <div
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-border
            p-4
            "
            >
            
            
            <div>
            
            <p className="font-medium">
            Recording ready
            </p>
            
            <p
            className="
            text-sm
            text-muted
            "
            >
            Preview your voice sample
            </p>
            
            </div>
            
            
            
            <button
            
            onClick={togglePlayback}
            
            className="
            w-12
            h-12
            rounded-xl
            bg-primary
            text-white
            flex
            items-center
            justify-center
            "
            
            >
            
            {
            playing
            ?
            <Pause/>
            :
            <Play fill="white"/>
            }
            
            </button>
            
            
            <audio
            ref={audioRef}
            src={audioURL}
            />
            
            
            </div>
            
            )}
            
            
            
            </div>
            
            
            
            
            {/* Footer */}
            
            
            <div
            className="
            px-7
            py-3
            border-t
            border-border
            flex
            justify-end
            gap-3
            "
            >
            
            
            <button
            
            onClick={close}
            
            className="
            px-5
            py-2.5
            rounded-xl
            border
            border-border
            "
            
            >
            
            Cancel
            
            </button>
            
            
            
            <button
            
            disabled={!audioURL}
            
            onClick={()=>{
            
            onComplete?.(
            audioURL
            );
            
            }}
            
            className="
            px-5
            py-2.5
            rounded-xl
            bg-primary
            text-white
            disabled:opacity-40
            flex
            items-center
            gap-2
            "
            
            >
            
            <Check size={18}/>
            
            Use Recording
            
            </button>
            
            
            </div>
            
            
            
            </motion.div>
            
            
            </motion.div>
        
        
        </AnimatePresence>
  
    );
  
  }