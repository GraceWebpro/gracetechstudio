import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AIComposer from "../components/create/AIComposer";
import { motion } from "framer-motion";
import {
    Tv,
    GraduationCap,
    Megaphone,
    Smartphone,
    Sparkles,
  } from "lucide-react";
import PromptSuggestion from "../components/create/PromptSuggestion";
import { createProject } from "../services/projectService";
  
  const suggestions = [
    {
      title: "Faceless Documentary",
      description:
        "Create a complete YouTube documentary with AI narration and visuals.",
  
      icon: Tv,
  
      color: "from-red-500 to-orange-500",
  
      prompt:
        "Create a 10-minute faceless YouTube documentary about the history of Ancient Egypt.",
    },
  
    {
      title: "Course Promotion",
  
      description:
        "Generate a high-converting promotional video for your online course.",
  
      icon: GraduationCap,
  
      color: "from-primary to-violet-500",
  
      prompt:
        "Create a promotional video for my React course targeting beginners.",
    },
  
    {
      title: "Product Advertisement",
  
      description:
        "Produce a premium commercial for your product or template.",
  
      icon: Megaphone,
  
      color: "from-emerald-500 to-green-600",
  
      prompt:
        "Create a cinematic advertisement for my website template.",
    },
  
    {
      title: "Instagram Reel",
  
      description:
        "Generate a fast-paced vertical video optimized for social media.",
  
      icon: Smartphone,
  
      color: "from-pink-500 to-rose-500",
  
      prompt:
        "Create a 30-second Instagram Reel promoting my UI design services.",
    },
  ];
export default function Create() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const composerRef = useRef(null);

  async function handleGenerate(data) {
    try {
      const project = await createProject({
        title: data.prompt.slice(0, 60),
        prompt: data.prompt,
        status: "draft",
      });
  
      navigate(`/generation/${project.id}`);
    } catch (err) {
      console.error(err);
      alert("Couldn't create project.");
    }
  }

  const handleSuggestionClick = (text) => {
    setPrompt(text);
  
    composerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="space-y-12">

<motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">

          <Sparkles size={16} />

          AI Video Creator

        </div>

        <h1 className="mt-6 text-5xl font-bold leading-tight">

          Bring your ideas to life with AI.

        </h1>

        <p className="mt-5 max-w-3xl text-lg text-muted leading-8">

          Describe your idea once.

          GraceTech Studio AI will generate the script,
          visuals, voiceover, timeline and a fully editable
          project in minutes.

        </p>

      </motion.div>

      <div ref={composerRef}>
  <AIComposer
    value={prompt}
    onChange={setPrompt}
    onGenerate={handleGenerate}
  />
</div>

<section>
<h2 className="text-2xl font-semibold">
  Popular Ideas
</h2>

<p className="mt-2 text-muted">

              Start from a proven prompt and customize it.

            </p>

<div className="grid
grid-cols-1
lg:grid-cols-2
2xl:grid-cols-3
gap-6">
  {suggestions.map((item) => (
    <PromptSuggestion
      key={item.title}
      {...item}
      onSelect={handleSuggestionClick}
    />
  ))}
</div>
</section>
{/* Coming Soon */}

<section
        className="
        rounded-3xl
        border
        border-dashed
        border-border
        bg-surface
        p-10
      "
      >

        <h2 className="text-2xl font-semibold">

          Coming Soon

        </h2>

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div>

            <h3 className="font-semibold">

              Recent Prompts

            </h3>

            <p className="text-sm text-muted mt-2">

              Reuse prompts you've generated before.

            </p>

          </div>

          <div>

            <h3 className="font-semibold">

              AI Templates

            </h3>

            <p className="text-sm text-muted mt-2">

              Create videos from professionally crafted templates.

            </p>

          </div>

          <div>

            <h3 className="font-semibold">

              Community Prompts

            </h3>

            <p className="text-sm text-muted mt-2">

              Discover prompts shared by other creators.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
}