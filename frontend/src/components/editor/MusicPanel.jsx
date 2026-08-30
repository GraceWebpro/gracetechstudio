import { useState } from "react";
import {
  Music2,
  Upload,
  Sparkles,
  PlayCircle,
  PauseCircle,
  Volume2,
  Trash2,
} from "lucide-react";

const tracks = [
  {
    id: 1,
    title: "Cinematic Adventure",
    genre: "Orchestra",
    duration: "2:31",
  },
  {
    id: 2,
    title: "Epic Trailer",
    genre: "Hybrid",
    duration: "1:46",
  },
  {
    id: 3,
    title: "Calm Piano",
    genre: "Ambient",
    duration: "3:18",
  },
];

export default function MusicPanel({
  scene,
  onUploadMusic,
  onGenerateMusic,
  onPreviewMusic,
  onSelectTrack,
  onRemoveMusic,
  onUpdateMusic,
}) {
  const [search] = useState("");
  const [playing, setPlaying] = useState(null);
  const [selected, setSelected] = useState(scene?.musicId || 1);
  const [volume, setVolume] = useState(scene?.musicVolume || 70);
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeOut, setFadeOut] = useState(true);

  const filtered = tracks.filter((track) =>
    track.title.toLowerCase().includes(search.toLowerCase())
  );

  function update(values) {
    onUpdateMusic?.({
      volume,
      fadeIn,
      fadeOut,
      ...values,
    });
  }

  return (
    <div className="space-y-5">

      {/* Header */}

      <div>

        <h3 className="text-lg font-semibold">
          Background Music
        </h3>

        <p className="text-sm text-muted mt-1">
          Choose music for this scene.
        </p>

      </div>


      {/* Upload / Generate */}

      <div className="grid grid-cols-2 gap-2">

        <button
          onClick={onUploadMusic}
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
          <Upload size={16}/>
          Upload
        </button>

        <button
          onClick={onGenerateMusic}
          className="
            h-10
            rounded-xl
            bg-primary
            text-white
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Sparkles size={16}/>
          AI Music
        </button>

      </div>

      {/* Current Track */}

      <div
        className="
        rounded-2xl
        border
        border-border
        bg-background
        p-4
        "
      >

        {scene?.music ? (

          <>

            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div
                  className="
                  w-11
                  h-11
                  rounded-xl
                  bg-primary/10
                  text-primary
                  flex
                  items-center
                  justify-center
                  "
                >

                  <Music2 size={20} />

                </div>

                <div>

                  <h4 className="font-medium">

                    {scene.music.title}

                  </h4>

                  <p className="text-sm text-muted mt-1">

                    {scene.music.artist || "Uploaded Music"}

                  </p>

                </div>

              </div>

              <button
                onClick={onPreviewMusic}
                className="text-primary"
              >

                <PlayCircle size={26} />

              </button>

            </div>

          </>

        ) : (

          <div className="text-center py-6">

            <Music2
              size={30}
              className="mx-auto text-muted"
            />

            <p className="mt-3 text-sm text-muted">

              No music selected

            </p>

          </div>

        )}

      </div>


      {/* Library */}

      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">

        {filtered.map((track) => {

          const active = selected === track.id;

          return (

            <button
              key={track.id}
              onClick={() => {
                setSelected(track.id);
                onSelectTrack?.(track);
              }}
              className={`
                w-full
                rounded-2xl
                border
                p-3
                text-left
                transition

                ${
                  active
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary"
                }
              `}
            >

              <div className="flex justify-between">

                <div className="min-w-0">

                  <h4 className="font-medium truncate">
                    {track.title}
                  </h4>

                  <p className="text-xs text-muted mt-1">
                    {track.genre} • {track.duration}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaying(
                      playing === track.id ? null : track.id
                    );
                  }}
                  className="text-primary"
                >

                  {playing === track.id ? (
                    <PauseCircle size={22}/>
                  ) : (
                    <PlayCircle size={22}/>
                  )}

                </button>

              </div>

            </button>

          );

        })}

      </div>

      {/* Volume */}

      <div className="space-y-3">

        <div className="flex justify-between">

          <label className="flex items-center gap-2 text-sm font-medium">

            <Volume2 size={15}/>

            Volume

          </label>

          <span className="text-sm text-muted">

            {volume}%

          </span>

        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => {
            const value = Number(e.target.value);
            setVolume(value);
            update({ volume: value });
          }}
          className="w-full accent-primary"
        />

      </div>

      {/* Fade */}

      <div className="space-y-3">

        <label className="flex items-center justify-between">

          <span className="text-sm">

            Fade In

          </span>

          <input
            type="checkbox"
            checked={fadeIn}
            onChange={()=>setFadeIn(!fadeIn)}
            className="accent-primary"
          />

        </label>

        <label className="flex items-center justify-between">

          <span className="text-sm">

            Fade Out

          </span>

          <input
            type="checkbox"
            checked={fadeOut}
            onChange={()=>setFadeOut(!fadeOut)}
            className="accent-primary"
          />

        </label>

      </div>

      {/* Remove */}

      <button
        onClick={onRemoveMusic}
        className="
          w-full
          h-10
          rounded-xl
          border
          border-red-500/20
          text-red-500
          flex
          items-center
          justify-center
          gap-2
          hover:bg-red-500/5
          transition
        "
      >

        <Trash2 size={16}/>

        Remove Music

      </button>

      {/* Tip */}

      <div
        className="
          rounded-2xl
          border
          border-primary/20
          bg-primary/5
          p-3
          text-xs
          text-muted
        "
      >
        AI automatically ducks the background music while narration is speaking to keep dialogue clear.
      </div>

    </div>
  );
}