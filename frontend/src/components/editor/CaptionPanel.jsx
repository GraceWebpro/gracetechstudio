import { useEffect, useState } from "react";
import {
  Captions,
  Languages,
  Eye,
  Clock3,
} from "lucide-react";

export default function CaptionPanel({
  scene,
  onChange,
}) {
  const [enabled, setEnabled] = useState(
    scene?.captions?.enabled ?? true
  );

  const [style, setStyle] = useState(
    scene?.captions?.style || "Modern"
  );

  const [language, setLanguage] = useState(
    scene?.captions?.language || "English"
  );

  const [animation, setAnimation] = useState(
    scene?.captions?.animation || "Word by Word"
  );

  useEffect(() => {
    onChange?.({
      enabled,
      style,
      language,
      animation,
    });
  }, [enabled, style, language, animation]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h3 className="text-lg font-semibold">
          Captions
        </h3>

        <p className="text-sm text-muted mt-1">
          AI will automatically generate captions
          from your narration.
        </p>

      </div>

      {/* Enable */}

      <div
        className="
        rounded-2xl
        border
        border-border
        bg-background
        p-4
        flex
        items-center
        justify-between
        "
      >

        <div>

          <h4 className="font-medium">
            Enable Captions
          </h4>

          <p className="text-sm text-muted mt-1">
            Show subtitles in the final video.
          </p>

        </div>

        <input
          type="checkbox"
          checked={enabled}
          onChange={(e)=>
            setEnabled(e.target.checked)
          }
          className="accent-primary"
        />

      </div>

      {/* Style */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Caption Style
        </label>

        <div className="relative">

          <Captions
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
            onChange={(e)=>
              setStyle(e.target.value)
            }
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

            <option>Modern</option>
            <option>TikTok</option>
            <option>YouTube</option>
            <option>Minimal</option>
            <option>Bold</option>

          </select>

        </div>

      </div>

      {/* Language */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Caption Language
        </label>

        <div className="relative">

          <Languages
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
            value={language}
            onChange={(e)=>
              setLanguage(e.target.value)
            }
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

            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>German</option>
            <option>Portuguese</option>

          </select>

        </div>

      </div>

      {/* Animation */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Caption Animation
        </label>

        <div className="relative">

          <Clock3
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
            value={animation}
            onChange={(e)=>
              setAnimation(e.target.value)
            }
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

            <option>Word by Word</option>
            <option>Line by Line</option>
            <option>Fade In</option>
            <option>Pop</option>
            <option>Slide Up</option>

          </select>

        </div>

      </div>

      {/* Preview */}

      <div
        className="
        rounded-2xl
        border
        border-border
        bg-background
        p-5
        "
      >

        <div className="flex items-center gap-2 mb-4">

          <Eye
            size={16}
            className="text-primary"
          />

          <h4 className="font-medium">
            Preview
          </h4>

        </div>

        <div
          className="
          aspect-video
          rounded-xl
          bg-black
          flex
          items-end
          justify-center
          p-4
          "
        >

          <div
            className="
            rounded-lg
            bg-black/60
            px-4
            py-2
            text-white
            text-sm
            font-medium
            "
          >
            This is how your captions will appear.
          </div>

        </div>

      </div>

      {/* Info */}

      <div
        className="
        rounded-2xl
        border
        border-primary/20
        bg-primary/5
        p-4
        text-sm
        text-muted
        "
      >
        Captions are generated automatically from your
        AI narration. Font, colors, positioning, and
        timing are optimized by the AI based on the
        selected style.
      </div>

    </div>
  );
}