import { useEffect, useState, useCallback } from "react";
import {
  Mic2,
  Loader2,
  Save,
} from "lucide-react";

import {
  getVoiceSettings,
  saveVoiceSettings,
} from "../../services/VoiceService";

export default function VoicePanel({ projectId }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    voice: "Grace AI",
    style: "Professional",
    speed: 1,
    expressiveness: 50,
    autoNarration: true,
    syncNarration: true,
  });

  /*
  =========================================================
  LOAD VOICE SETTINGS
  =========================================================
  */

  const loadSettings = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);

    try {
      const data = await getVoiceSettings(projectId);

      if (data) {
        setSettings(data);
      }
    } catch (err) {
      console.error(
        "Failed to load voice settings:",
        err
      );
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  /*
  =========================================================
  LOAD SETTINGS WHEN PROJECT CHANGES
  =========================================================
  */

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  /*
  =========================================================
  UPDATE SETTING
  =========================================================
  */

  async function update(field, value) {
    const updated = {
      ...settings,
      [field]: value,
    };

    setSettings(updated);
    setSaving(true);

    try {
      await saveVoiceSettings(
        projectId,
        updated
      );
    } catch (err) {
      console.error(
        "Failed to save voice settings:",
        err
      );
    } finally {
      setSaving(false);
    }
  }

  /*
  =========================================================
  LOADING STATE
  =========================================================
  */

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2
          className="animate-spin text-primary"
          size={28}
        />
      </div>
    );
  }

  /*
  =========================================================
  UI
  =========================================================
  */

  return (
    <div className="space-y-7">

      {/* Header */}

      <div>

        <div className="flex items-center gap-2">

          <Mic2 size={18} />

          <h3 className="text-lg font-semibold">
            Voice Settings
          </h3>

        </div>

        <p className="mt-1 text-sm text-muted">
          Configure the narration voice used
          across the entire project.
        </p>

      </div>

      {/* Voice */}

      <div>

        <label className="text-sm font-medium">
          AI Voice
        </label>

        <select
          value={settings.voice}
          onChange={(e) =>
            update(
              "voice",
              e.target.value
            )
          }
          className="
            mt-2
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
          <option>Grace AI</option>
          <option>Emma</option>
          <option>Michael</option>
          <option>Olivia</option>
          <option>James</option>
        </select>

      </div>

      {/* Style */}

      <div>

        <label className="text-sm font-medium">
          Speaking Style
        </label>

        <select
          value={settings.style}
          onChange={(e) =>
            update(
              "style",
              e.target.value
            )
          }
          className="
            mt-2
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
          <option>Professional</option>
          <option>Friendly</option>
          <option>Storytelling</option>
          <option>Confident</option>
          <option>Calm</option>
          <option>Excited</option>
          <option>Dramatic</option>
        </select>

      </div>

      {/* Speed */}

      <div>

        <div className="mb-2 flex justify-between">

          <label className="text-sm font-medium">
            Speech Speed
          </label>

          <span className="text-sm text-muted">
            {settings.speed.toFixed(1)}x
          </span>

        </div>

        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={settings.speed}
          onChange={(e) =>
            update(
              "speed",
              Number(e.target.value)
            )
          }
          className="w-full accent-primary"
        />

      </div>

      {/* Expressiveness */}

      <div>

        <div className="mb-2 flex justify-between">

          <label className="text-sm font-medium">
            Expressiveness
          </label>

          <span className="text-sm text-muted">
            {settings.expressiveness}%
          </span>

        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={settings.expressiveness}
          onChange={(e) =>
            update(
              "expressiveness",
              Number(e.target.value)
            )
          }
          className="w-full accent-primary"
        />

      </div>

      {/* Toggles */}

      <div className="space-y-4">

        <label className="flex items-center justify-between">

          <span className="text-sm">
            Auto-generate narration
          </span>

          <input
            type="checkbox"
            checked={settings.autoNarration}
            onChange={(e) =>
              update(
                "autoNarration",
                e.target.checked
              )
            }
            className="accent-primary"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">
            Sync narration with video duration
          </span>

          <input
            type="checkbox"
            checked={settings.syncNarration}
            onChange={(e) =>
              update(
                "syncNarration",
                e.target.checked
              )
            }
            className="accent-primary"
          />

        </label>

      </div>

      {/* Status */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-border
          bg-background
          p-3
        "
      >

        <span className="text-sm text-muted">
          Voice settings are saved automatically.
        </span>

        {saving ? (
          <Loader2
            size={16}
            className="animate-spin text-primary"
          />
        ) : (
          <Save
            size={16}
            className="text-green-500"
          />
        )}

      </div>

    </div>
  );
}
