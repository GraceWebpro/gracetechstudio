import { motion } from "framer-motion";
import AIInput from "./AIInput";
// import {
//     Clapperboard,
//     Mic2,
//     Music4,
//     FilePenLine,
//     Languages,
//     Captions,
//     Wand2,
//   } from "lucide-react";
  
  // const suggestions = [
  //   {
  //     label: "Cinematic",
  //     icon: Clapperboard,
  //   },
  //   {
  //     label: "Improve",
  //     icon: Sparkles,
  //   },
  //   {
  //     label: "Voice",
  //     icon: Mic2,
  //   },
  //   {
  //     label: "Music",
  //     icon: Music4,
  //   },
  //   {
  //     label: "Rewrite",
  //     icon: FilePenLine,
  //   },
  //   {
  //     label: "Translate",
  //     icon: Languages,
  //   },
  //   {
  //     label: "Captions",
  //     icon: Captions,
  //   },
  //   {
  //     label: "Magic Edit",
  //     icon: Wand2,
  //   },
  // ];

export default function AIDirector({

    prompt,

    onPromptChange,

    onGenerate,

}){

return(

  <motion.section

    initial={{
    opacity:0,
    y:20
    }}

    animate={{
    opacity:1,
    y:0
    }}

    transition={{
    duration:.35
    }}

    className="
    h-full
    bg-surface
    "

  >

    {/* Prompt */}


    <AIInput

    value={prompt}

    onChange={onPromptChange}

    onGenerate={onGenerate}

    />


  

  </motion.section>

)

}