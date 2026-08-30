import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Upload,
  Image,
  RefreshCw,
  Palette,
  Wand2,
} from "lucide-react";

export default function VisualPanel({
  scene,
  onGenerate,
  onUpload,
  onSearchStock,
  onRegenerate,
}) {
  const [prompt, setPrompt] = useState(scene?.visualPrompt || "");

  const [style, setStyle] = useState("Cinematic");

  const [type, setType] = useState("Image");

  const fileInputRef = useRef(null);

  useEffect(() => {

    setPrompt(scene?.visualPrompt || "");

}, [scene]);

useEffect(() => {

  setStyle(scene?.style || "Cinematic");
  setType(scene?.type || "Image");

}, [scene]);

  function handleFileUpload(e) {

    const file = e.target.files?.[0];

    if (!file) return;

    onUpload?.(file);

    e.target.value = "";

  }

  return (
    <div className="space-y-5">

      {/* Current Visual */}

      <div>

        <h3 className="text-lg font-semibold">

          Scene Visual

        </h3>

        <p className="text-sm text-muted mt-1">

          AI visual for this scene.

        </p>

      </div>

      {/* Preview */}

      <div
        className="
        aspect-video
        rounded-2xl
        border
        border-border
        bg-background
        overflow-hidden
        flex
        items-center
        justify-center
        "
      >

        {scene?.thumbnail ? (

          <img
            src={scene.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="text-center">

            <Image
              size={34}
              className="mx-auto text-muted"
            />

            <p className="mt-3 text-sm text-muted">

              No visual generated

            </p>

          </div>

        )}

      </div>

      {/* Actions */}

      <div className="grid grid-cols-2 gap-2">

        <button
          onClick={() => fileInputRef.current?.click()}
          className="
          h-10
          rounded-xl
          border
          border-border
          bg-background
          flex
          items-center
          justify-center
          gap-2
          hover:border-primary
          transition
          "
        >

          <Upload size={16} />

          Upload

        </button>

        {/* <button
          onClick={onSearchStock}
          className="
          h-10
          rounded-xl
          border
          border-border
          bg-background
          flex
          items-center
          justify-center
          gap-2
          hover:border-primary
          transition
          "
        >

          <Search size={16} />

          Regenerate

        </button> */}

      </div>
      <input
    ref={fileInputRef}
    type="file"
    hidden
    accept="image/*,video/*"
    onChange={handleFileUpload}
/>

      {/* Prompt */}

      <div>

        <label className="text-sm font-medium">

          Visual Prompt

        </label>

        <textarea
          rows={5}
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          placeholder="Describe what should appear in this scene..."
          className="
          mt-2
          w-full
          resize-none
          rounded-2xl
          border
          border-border
          bg-background
          p-3
          outline-none
          focus:border-primary
          "
        />

      </div>

      {/* Type */}

      {/* <div>

        <label className="text-sm font-medium">

          Generate

        </label>

        <div className="grid grid-cols-2 gap-2 mt-2">

          <button
            onClick={()=>setType("Image")}
            className={`
            h-10
            rounded-xl
            border
            transition
            flex
            items-center
            justify-center
            gap-2

            ${
              type==="Image"
              ? "bg-primary text-white border-primary"
              : "border-border bg-background"
            }
            `}
          >

            <Image size={16}/>

            Image

          </button>

          <button
            onClick={()=>setType("Video")}
            className={`
            h-10
            rounded-xl
            border
            transition
            flex
            items-center
            justify-center
            gap-2

            ${
              type==="Video"
              ? "bg-primary text-white border-primary"
              : "border-border bg-background"
            }
            `}
          >

            <Video size={16}/>

            Video

          </button>

        </div>

      </div> */}

      {/* Style */}

      <div>

        <label className="text-sm font-medium">

          Style

        </label>

        <div className="relative mt-2">

          <Palette
            size={16}
            className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-muted
            "
          />

          <select
            value={style}
            onChange={(e)=>setStyle(e.target.value)}
            className="
            w-full
            h-11
            rounded-xl
            border
            border-border
            bg-background
            pl-10
            pr-3
            outline-none
            "
          >

            <option>Cinematic</option>

            <option>Photorealistic</option>

            <option>Anime</option>

            <option>3D Render</option>

            <option>Illustration</option>

            <option>Watercolor</option>

          </select>

        </div>

      </div>

      {/* Footer Buttons */}

      <div className="space-y-2">

        <button
          onClick={()=>
            onGenerate?.({
              prompt,
              style,
            })
          }
          className="
          h-11
          w-full
          rounded-xl
          bg-primary
          text-white
          flex
          items-center
          justify-center
          gap-2
          "
        >

          <Sparkles size={17}/>

          Generate Visual

        </button>

        <button
          onClick={onRegenerate}
          className="
          h-11
          w-full
          rounded-xl
          border
          border-border
          bg-background
          flex
          items-center
          justify-center
          gap-2
          hover:border-primary
          transition
          "
        >

          <RefreshCw size={16}/>

          Regenerate

        </button>

      </div>

      {/* AI Hint */}

      <div
        className="
        rounded-2xl
        border
        border-primary/20
        bg-primary/5
        p-3
        text-sm
        "
      >

        <div className="flex gap-2">

          <Wand2
            size={16}
            className="text-primary mt-0.5 shrink-0"
          />

          <p className="text-muted">

            Keep prompts descriptive. Mention camera angle,
            lighting, mood, colors and composition for the
            highest quality results.

          </p>

        </div>

      </div>

    </div>
  );
}