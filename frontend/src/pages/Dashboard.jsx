import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Mic2,
  Image,
  Film,
} from "lucide-react";
import AIComposer from "../components/create/AIComposer";
import ProjectCard from "../components/ui/ProjectCard";
import CapabilityCard from "../components/dashboard/CapabilityCard";
import useProject from "../hooks/useProject";

const capabilities = [
  {
    title: "AI Script",
    description: "Generate complete scripts from a simple prompt.",
    icon: FileText,
  },
  {
    title: "AI Voice",
    description: "Use your cloned voice or choose another voice.",
    icon: Mic2,
  },
  {
    title: "AI Visuals",
    description: "Create scenes and images automatically.",
    icon: Image,
  },
  {
    title: "Video Export",
    description: "Render your finished project in one click.",
    icon: Film,
  },
];

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");

  const navigate = useNavigate();


  function handleGenerate(data){

    console.log(data);

    navigate(`/generation/${Date.now()}`,{

        state:data,

    });

  }


const { create } = useProject();

async function handleCreate() {
  const project = await create({
    title: "Ancient Egypt",
    description: "History Documentary",
  });

  console.log(project);
}

  return (
    <div className="space-y-14">
      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className="text-5xl font-bold">
          Good Morning, Wilson 👋
        </h1>

        <p className="mt-3 text-lg text-muted">
          What would you like to create today?
        </p>
        
      </motion.div>

      {/* AI Prompt */}
      <AIComposer
        value={prompt}
        onChange={setPrompt}
        onGenerate={handleGenerate}
      />
      {/* Quick Actions */}

      <div>
        <h2 className="text-2xl font-semibold mb-5">
          Capabilities
        </h2>

        <div className="grid grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6 gap-6">
          {capabilities.map((item, index) => {

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <CapabilityCard
                  {...item}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Continue */}

      <div>
        <h2 className="text-2xl font-semibold mb-5">
          Recent Projects
        </h2>


        <div className="
         grid
         grid-cols-1
         lg:grid-cols-2
         2xl:grid-cols-3
         gap-6
        ">

          <ProjectCard
            title="AI YouTube Documentary"
            status="Editing"
            scenes={12}
            edited="10 minutes ago"
          />


          <ProjectCard
            title="React Course Promo"
            status="Draft"
            scenes={8}
            edited="Yesterday"
          />


          <ProjectCard
            title="Product Advertisement"
            status="Completed"
            scenes={15}
            edited="3 days ago"
          />

        </div>

      </div>
    </div>
  );
}