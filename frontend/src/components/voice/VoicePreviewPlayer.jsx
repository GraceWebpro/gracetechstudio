import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
} from "lucide-react";

export default function VoicePreviewPlayer({
  src,
}) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    function update() {
      setCurrentTime(audio.currentTime);

      setProgress(
        (audio.currentTime / audio.duration) * 100 || 0
      );
    }

    function loaded() {
      setDuration(audio.duration || 0);
    }

    function ended() {
      setPlaying(false);
    }

    audio.addEventListener(
      "timeupdate",
      update
    );

    audio.addEventListener(
      "loadedmetadata",
      loaded
    );

    audio.addEventListener(
      "ended",
      ended
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        update
      );

      audio.removeEventListener(
        "loadedmetadata",
        loaded
      );

      audio.removeEventListener(
        "ended",
        ended
      );
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }

    setPlaying(!playing);
  }

  function handleSeek(e) {
    const audio = audioRef.current;

    const value = Number(e.target.value);

    audio.currentTime =
      (value / 100) * duration;

    setProgress(value);
  }

  function handleVolume(e) {
    const value = Number(e.target.value);

    setVolume(value);

    audioRef.current.volume = value;
  }

  function handleSpeed(e) {
    const value = Number(e.target.value);

    setSpeed(value);

    audioRef.current.playbackRate = value;
  }

  function format(sec) {
    if (!sec) return "0:00";

    const m = Math.floor(sec / 60);

    const s = Math.floor(sec % 60);

    return `${m}:${String(s).padStart(2, "0")}`;
  }

  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-surface
        p-5
      "
    >
      <audio
        ref={audioRef}
        src={src}
      />

      {/* Top */}

      <div className="flex items-center gap-4">

        <button
          onClick={togglePlay}
          className="
            w-14
            h-14
            rounded-full
            bg-primary
            text-white
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          {playing ? (
            <Pause size={24} />
          ) : (
            <Play
              size={24}
              fill="white"
            />
          )}
        </button>

        {/* Fake Waveform */}

        <div className="flex-1">

          <div className="flex items-end gap-[3px] h-12">

            {Array.from({
              length: 48,
            }).map((_, i) => (
              <div
                key={i}
                style={{
                  height:
                    8 +
                    Math.random() * 26,
                }}
                className="
                  w-[4px]
                  rounded-full
                  bg-primary/30
                "
              />
            ))}

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full"
        />

        <div
          className="
            mt-2
            flex
            justify-between
            text-xs
            text-muted
          "
        >
          <span>
            {format(currentTime)}
          </span>

          <span>
            {format(duration)}
          </span>
        </div>

      </div>

      {/* Bottom Controls */}

      <div
        className="
          mt-6
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
        "
      >
        {/* Volume */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Volume2
            size={18}
            className="text-muted"
          />

          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={volume}
            onChange={handleVolume}
            className="w-28"
          />
        </div>

        {/* Speed */}

        <select
          value={speed}
          onChange={handleSpeed}
          className="
            rounded-xl
            border
            border-border
            bg-background
            px-3
            py-2
          "
        >
          <option value={0.75}>
            0.75x
          </option>

          <option value={1}>
            1x
          </option>

          <option value={1.25}>
            1.25x
          </option>

          <option value={1.5}>
            1.5x
          </option>
        </select>

      </div>

    </div>
  );
}