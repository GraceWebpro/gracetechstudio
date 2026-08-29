import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Mic2,
  Image,
  Film,
  FolderOpen,
} from "lucide-react";

import AIComposer from "../components/create/AIComposer";
import ProjectCard from "../components/ui/ProjectCard";
import CapabilityCard from "../components/dashboard/CapabilityCard";

import { getProjects } from "../services/projectService";

const capabilities = [
  {
    title: "AI Script",
    description: "Generate complete scripts from a simple prompt.",
    icon: FileText,
  },
  {
    title: "AI Voice",
    description: "Generate natural narration for your scenes.",
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
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");

  const [projects, setProjects] = useState([]);

  const [loadingProjects, setLoadingProjects] = useState(true);

  /*
  -------------------------------------------------------
  Load projects
  -------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        setLoadingProjects(true);

        const data = await getProjects();

        if (mounted) {
          setProjects(data || []);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);

        if (mounted) {
          setProjects([]);
        }
      } finally {
        if (mounted) {
          setLoadingProjects(false);
        }
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  -------------------------------------------------------
  Start generation
  -------------------------------------------------------
  */

  function handleGenerate(data) {
    if (!data?.prompt?.trim()) {
      return;
    }

    /*
      We intentionally don't create the project here.

      The generation page/API will eventually:
      1. Send the prompt to Gemini
      2. Generate the project structure
      3. Create the project in Supabase
      4. Create the scenes
      5. Open the editor
    */

    navigate(`/generation/${Date.now()}`, {
      state: data,
    });
  }

  /*
  -------------------------------------------------------
  Open project
  -------------------------------------------------------
  */

  function handleOpenProject(project) {
    if (!project?.id) return;

    navigate(`/generation/${project.id}`);
  }

  return (
    <div className="space-y-14">

      {/* =====================================================
          HERO
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
      >

        <h1 className="text-5xl font-bold">
          Good Morning, GraceTech 👋
        </h1>

        <p className="mt-3 text-lg text-muted">
          What would you like to create today?
        </p>

      </motion.div>


      {/* =====================================================
          AI COMPOSER
      ===================================================== */}

      <AIComposer
        value={prompt}
        onChange={setPrompt}
        onGenerate={handleGenerate}
      />


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section>

        <div className="mb-5">

          <h2 className="text-2xl font-semibold">
            Capabilities
          </h2>

          <p className="mt-2 text-sm text-muted">
            Everything you need to turn an idea into a finished video.
          </p>

        </div>


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          {capabilities.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >

              <CapabilityCard
                {...item}
              />

            </motion.div>

          ))}

        </div>

      </section>


      {/* =====================================================
          RECENT PROJECTS
      ===================================================== */}

      <section>

        <div className="flex items-end justify-between mb-5">

          <div>

            <h2 className="text-2xl font-semibold">
              Recent Projects
            </h2>

            <p className="mt-2 text-sm text-muted">
              Continue working on your latest videos.
            </p>

          </div>

        </div>


        {/* Loading */}

        {loadingProjects && (

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              2xl:grid-cols-3
              gap-6
            "
          >

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="
                  h-40
                  rounded-2xl
                  border
                  border-border
                  bg-surface
                  animate-pulse
                "
              />

            ))}

          </div>

        )}


        {/* Empty state */}

        {!loadingProjects && projects.length === 0 && (

          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-border
              bg-surface
              p-10
              text-center
            "
          >

            <div
              className="
                mx-auto
                w-12
                h-12
                rounded-2xl
                bg-background
                border
                border-border
                flex
                items-center
                justify-center
              "
            >

              <FolderOpen
                size={21}
                className="text-muted"
              />

            </div>

            <h3 className="mt-4 font-semibold">
              No projects yet
            </h3>

            <p className="mt-2 text-sm text-muted">
              Describe your first video above to get started.
            </p>

          </div>

        )}


        {/* Projects */}

        {!loadingProjects && projects.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              2xl:grid-cols-3
              gap-6
            "
          >

            {projects.slice(0, 6).map((project) => (

              <div
                key={project.id}
                onClick={() =>
                  handleOpenProject(project)
                }
                className="cursor-pointer"
              >

                <ProjectCard
                  title={
                    project.title ||
                    "Untitled Project"
                  }

                  status={
                    project.status ||
                    "Draft"
                  }

                  scenes={
                    project.scene_count ||
                    project.scenes_count ||
                    0
                  }

                  edited={
                    project.updated_at
                      ? formatRelativeDate(
                          project.updated_at
                        )
                      : "Recently"
                  }

                />

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}


/*
=========================================================
Relative date helper
=========================================================
*/

function formatRelativeDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();

  const difference =
    now.getTime() - date.getTime();

  const minutes = Math.floor(
    difference / 60000
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    } ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return date.toLocaleDateString();
}