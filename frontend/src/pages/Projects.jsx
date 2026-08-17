import {
    Plus,
    Play,
    Clock3,
    MoreHorizontal,
    Sparkles,
    Video,
  } from "lucide-react";
  
  import { motion } from "framer-motion";
  import { useNavigate } from "react-router-dom";
  
  
  const projects = [
    {
      id:1,
      title:"Ancient Egypt Documentary",
      thumbnail:null,
      duration:"10:24",
      status:"Completed",
      edited:"2 hours ago",
    },
    {
      id:2,
      title:"Luxury Product Ad",
      thumbnail:null,
      duration:"00:45",
      status:"Draft",
      edited:"Yesterday",
    },
    {
      id:3,
      title:"YouTube Explainer",
      thumbnail:null,
      duration:"05:12",
      status:"Rendering",
      edited:"3 days ago",
    }
  ];
  
  
  export default function Projects(){
  
  const navigate = useNavigate();
  
  
  return (
  
  <div
  className="
  min-h-screen
  bg-background
  px-4
  sm:px-8
  py-8
  "
  >
  
  
  {/* Header */}
  
  <motion.div
  
  initial={{
  opacity:0,
  y:20
  }}
  
  animate={{
  opacity:1,
  y:0
  }}
  
  className="
  flex
  flex-col
  lg:flex-row
  lg:items-center
  lg:justify-between
  gap-6
  "
  
  >
  
  
  <div>
  
  <h1
  className="
  text-3xl
  sm:text-4xl
  font-bold
  "
  >
  Projects
  </h1>
  
  
  <p
  className="
  text-muted
  mt-2
  "
  >
  Create, edit and manage your AI generated videos.
  </p>
  
  
  </div>
  
  
  <button
  
  onClick={()=>navigate("/create")}
  
  className="
  flex
  items-center
  justify-center
  gap-3
  rounded-2xl
  bg-primary
  text-white
  px-6
  py-3
  shadow-glow
  hover:scale-[1.02]
  transition
  "
  
  >
  
  <Plus size={20}/>
  
  Create Video
  
  </button>
  
  
  </motion.div>
  
  
  
  
  {/* Create Card */}
  
  
  <motion.div
  
  initial={{
  opacity:0,
  scale:.98
  }}
  
  animate={{
  opacity:1,
  scale:1
  }}
  
  transition={{
  delay:.1
  }}
  
  onClick={()=>navigate("/create")}
  
  className="
  mt-10
  cursor-pointer
  rounded-3xl
  border
  border-border
  bg-surface
  p-6
  sm:p-8
  hover:border-primary
  transition
  "
  
  >
  
  
  <div
  className="
  flex
  items-center
  gap-5
  "
  >
  
  <div
  className="
  w-14
  h-14
  rounded-2xl
  bg-primary/10
  flex
  items-center
  justify-center
  "
  >
  
  <Video
  size={28}
  className="text-primary"
  />
  
  </div>
  
  
  <div>
  
  <h2
  className="
  text-xl
  font-semibold
  "
  >
  Create a new AI video
  </h2>
  
  
  <p
  className="
  text-muted
  text-sm
  mt-1
  "
  >
  Turn an idea into a complete video in minutes.
  </p>
  
  
  </div>
  
  
  </div>
  
  
  </motion.div>
  
  
  
  
  
  {/* Projects */}
  
  
  <div
  className="
  mt-12
  "
  >
  
  <div
  className="
  flex
  items-center
  justify-between
  mb-5
  "
  >
  
  <h2
  className="
  text-xl
  font-semibold
  "
  >
  Recent Projects
  </h2>
  
  
  <span
  className="
  text-sm
  text-muted
  "
  >
  {projects.length} projects
  </span>
  
  
  </div>
  
  
  
  <div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-3
  gap-6
  "
  >
  
  
  {
  projects.map((project,index)=>(
  
  
  <motion.div
  
  key={project.id}
  
  initial={{
  opacity:0,
  y:20
  }}
  
  animate={{
  opacity:1,
  y:0
  }}
  
  transition={{
  delay:index*.08
  }}
  
  whileHover={{
  y:-6
  }}
  
  className="
  group
  rounded-3xl
  border
  border-border
  bg-surface
  overflow-hidden
  hover:border-primary/50
  transition
  "
  
  >
  
  
  {/* Thumbnail */}
  
  <div
  className="
  relative
  aspect-video
  bg-gradient-to-br
  from-primary/20
  via-background
  to-blue-500/20
  "
  >
  
  
  <div
  className="
  absolute
  inset-0
  flex
  items-center
  justify-center
  "
  >
  
  <button
  className="
  w-14
  h-14
  rounded-full
  bg-background/70
  backdrop-blur-xl
  flex
  items-center
  justify-center
  opacity-0
  group-hover:opacity-100
  transition
  "
  >
  
  <Play
  size={22}
  fill="currentColor"
  />
  
  </button>
  
  
  </div>
  
  
  
  <div
  className="
  absolute
  top-4
  left-4
  px-3
  py-1
  rounded-full
  bg-background/70
  backdrop-blur-xl
  text-xs
  flex
  items-center
  gap-1
  "
  >
  
  <Sparkles
  size={12}
  className="text-primary"
  />
  
  AI Created
  
  </div>
  
  
  </div>
  
  
  
  
  
  {/* Content */}
  
  
  <div
  className="
  p-5
  "
  >
  
  
  <div
  className="
  flex
  items-start
  justify-between
  gap-3
  "
  >
  
  
  <h3
  className="
  font-semibold
  truncate
  "
  >
  {project.title}
  </h3>
  
  
  <button>
  
  <MoreHorizontal
  size={18}
  />
  
  </button>
  
  
  </div>
  
  
  
  <div
  className="
  mt-4
  flex
  items-center
  justify-between
  text-sm
  text-muted
  "
  >
  
  
  <div
  className="
  flex
  items-center
  gap-2
  "
  >
  
  <Clock3 size={14}/>
  
  {project.duration}
  
  </div>
  
  
  <span>
  {project.edited}
  </span>
  
  
  </div>
  
  
  
  <div
  className="
  mt-4
  flex
  justify-between
  items-center
  "
  >
  
  
  <span
  className={`
  text-xs
  px-3
  py-1
  rounded-full
  
  ${
  project.status==="Completed"
  ?
  "bg-emerald-500/10 text-emerald-500"
  :
  project.status==="Rendering"
  ?
  "bg-primary/10 text-primary"
  :
  "bg-border text-muted"
  }
  
  `}
  >
  
  {project.status}
  
  </span>
  
  
  
  <button
  
  onClick={()=>navigate(`/project/${project.id}`)}
  
  className="
  text-sm
  text-primary
  font-medium
  "
  
  >
  
  Open
  
  </button>
  
  
  </div>
  
  
  
  </div>
  
  
  </motion.div>
  
  
  ))
  
  }
  
  
  </div>
  
  
  </div>
  
  
  
  </div>
  
  )
  
  }