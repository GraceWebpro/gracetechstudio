import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import StoryboardCard from "./StoryboardCard";
import AddSceneCard from "./AddSceneCard";

export default function Storyboard({
  scenes,
  activeScene,
  playing,
  onSelect,
  onAddScene,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .35 }}
      className="
      h-full
      flex
      flex-col
      bg-surface
      pb-6
  "
    >
      {/* Header */}

      <div className="flex items-center justify-between px-4 py-2 border-b border-border">

        <div>

          <h2 className="text-xl font-semibold">

            Storyboard

          </h2>

          <p className="text-sm text-muted mt-1">

            {scenes.length} AI Generated Scenes

          </p>

        </div>

        <button
          onClick={onAddScene}
          className="
            flex
            items-center
            gap-1
            rounded-xl
            bg-primary
            px-2
            py-2
            text-white
            font-normal
            hover:scale-[1.02]
            transition
          "
        >

          <Plus size={18}/>

          Add Scene

        </button>

      </div>

      {/* Cards */}

<div
    className="
        flex-1
        overflow-visible
        p-4
        space-y-4
    "
>

    {scenes.map((scene, index) => (

        <StoryboardCard
            key={scene.id}
            scene={scene}
            active={index === activeScene}
            playing={playing}
            onClick={() => onSelect(index)}
            onDuplicate={() => onDuplicate(index)}
            onDelete={() => onDelete(index)}
            onMoveUp={() => onMoveUp(index)}
            onMoveDown={() => onMoveDown(index)}
        />

    ))}

    <AddSceneCard
        onGenerateAI={() => console.log("AI")}
        onUpload={() => console.log("Upload")}
        onImages={() => console.log("Images")}
        onAvatar={() => console.log("Avatar")}
        onBlank={onAddScene}
    />

</div>

    </motion.section>
  );
}