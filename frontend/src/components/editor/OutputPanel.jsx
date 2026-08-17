import { MonitorPlay, Captions, Music2, BadgeCheck } from "lucide-react";

export default function OutputPanel({
  scene = {},
  updateScene = () => {},
}) {
  const settings = {
    resolution: scene.resolution || "1080p",
    fps: scene.fps || "30",
    format: scene.format || "MP4",
    aspectRatio: scene.aspectRatio || "16:9",
    quality: scene.quality || "High",
    includeCaptions: scene.includeCaptions ?? true,
    includeMusic: scene.includeMusic ?? true,
    applyBranding: scene.applyBranding ?? true,
  };

  const update = (key, value) => {
    updateScene(key, value);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h3 className="text-lg font-semibold">
          Output Settings
        </h3>

        <p className="mt-1 text-sm text-muted">
          Configure how this project will be exported.
        </p>

      </div>

      {/* Export Settings */}

      <div className="grid grid-cols-2 gap-4">

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Resolution
          </label>

          <select
            value={settings.resolution}
            onChange={(e) =>
              update("resolution", e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-4
              py-3
              outline-none
              focus:border-primary
            "
          >
            <option>720p</option>
            <option>1080p</option>
            <option>1440p</option>
            <option>4K</option>
          </select>

        </div>

        <div className="space-y-2">

          <label className="text-sm font-medium">
            FPS
          </label>

          <select
            value={settings.fps}
            onChange={(e) =>
              update("fps", e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-4
              py-3
              outline-none
              focus:border-primary
            "
          >
            <option value="24">24 FPS</option>
            <option value="30">30 FPS</option>
            <option value="60">60 FPS</option>
          </select>

        </div>

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Format
          </label>

          <select
            value={settings.format}
            onChange={(e) =>
              update("format", e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-4
              py-3
              outline-none
              focus:border-primary
            "
          >
            <option>MP4</option>
            <option>MOV</option>
            <option>WEBM</option>
          </select>

        </div>

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Aspect Ratio
          </label>

          <select
            value={settings.aspectRatio}
            onChange={(e) =>
              update("aspectRatio", e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              px-4
              py-3
              outline-none
              focus:border-primary
            "
          >
            <option value="16:9">16:9 (YouTube)</option>
            <option value="9:16">9:16 (TikTok)</option>
            <option value="1:1">1:1 (Instagram)</option>
            <option value="4:5">4:5 (Facebook)</option>
          </select>

        </div>

      </div>

      {/* Quality */}

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Export Quality
        </label>

        <select
          value={settings.quality}
          onChange={(e) =>
            update("quality", e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-border
            bg-background
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        >
          <option>Draft</option>
          <option>Standard</option>
          <option>High</option>
          <option>Ultra</option>
        </select>

      </div>

      {/* Toggles */}

      <div className="space-y-3">

        <Toggle
          icon={<Captions size={18} />}
          title="Include Captions"
          description="Burn subtitles directly into the video."
          checked={settings.includeCaptions}
          onChange={(v) =>
            update("includeCaptions", v)
          }
        />

        <Toggle
          icon={<Music2 size={18} />}
          title="Include Background Music"
          description="Render background music into the final export."
          checked={settings.includeMusic}
          onChange={(v) =>
            update("includeMusic", v)
          }
        />

        <Toggle
          icon={<BadgeCheck size={18} />}
          title="Apply Brand Assets"
          description="Include your logo and branding automatically."
          checked={settings.applyBranding}
          onChange={(v) =>
            update("applyBranding", v)
          }
        />

      </div>

      {/* Summary */}

      <div
        className="
          rounded-2xl
          border
          border-primary/20
          bg-primary/5
          p-5
        "
      >

        <div className="flex items-center gap-3">

          <MonitorPlay
            size={20}
            className="text-primary"
          />

          <div>

            <h4 className="font-semibold">
              Current Export Preset
            </h4>

            <p className="mt-1 text-sm text-muted">
              {settings.resolution} •{" "}
              {settings.fps} FPS •{" "}
              {settings.format} •{" "}
              {settings.aspectRatio} •{" "}
              {settings.quality}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function Toggle({
  icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-border
        bg-background
        p-4
      "
    >
      <div className="flex items-start gap-3">

        <div className="mt-1 text-primary">
          {icon}
        </div>

        <div>

          <h4 className="font-medium">
            {title}
          </h4>

          <p className="mt-1 text-sm text-muted">
            {description}
          </p>

        </div>

      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
        className="h-5 w-5 accent-primary"
      />

    </div>
  );
}