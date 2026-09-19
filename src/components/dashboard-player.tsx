import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.floor(seconds) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}

export function DashboardPlayer({ src }: { src: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<FullscreenVideo>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Metadata may already be available by the time the server-rendered page hydrates.
    const media = video.current;
    if (media && media.readyState >= 1) setDuration(media.duration);
    const updateFullscreen = () => setFullscreen(document.fullscreenElement === frame.current);
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);

  async function togglePlayback() {
    const media = video.current;
    if (!media) return;
    setMessage("");
    if (!media.paused) {
      media.pause();
      return;
    }
    try {
      await media.play();
    } catch {
      setMessage("Playback could not start. Please try again.");
    }
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (frame.current?.requestFullscreen) await frame.current.requestFullscreen();
      else if (video.current?.webkitEnterFullscreen) video.current.webkitEnterFullscreen();
      else setMessage("Fullscreen is unavailable in this browser.");
    } catch {
      setMessage("Fullscreen is unavailable in this browser.");
    }
  }

  return (
    <div
      className="prototype-frame dashboard-player"
      ref={frame}
      role="region"
      aria-label="Omnilor dashboard video"
    >
      <video
        ref={video}
        src={src}
        playsInline
        preload="metadata"
        aria-label="Omnilor dashboard prototype demonstration"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onVolumeChange={(event) => {
          setVolume(event.currentTarget.volume);
          setMuted(event.currentTarget.muted);
        }}
        onError={() => setMessage("The video could not load. Please reload the page to try again.")}
      >
        Your browser does not support video playback.
      </video>
      <div className="dashboard-controls" role="group" aria-label="Video controls">
        <button
          type="button"
          className="dashboard-play"
          onClick={togglePlayback}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <input
          className="dashboard-seek"
          type="range"
          aria-label="Video progress"
          aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
          min={0}
          max={Number.isFinite(duration) && duration > 0 ? duration : 0}
          step={0.1}
          value={time}
          disabled={!Number.isFinite(duration) || duration <= 0}
          onChange={(event) => {
            if (!video.current) return;
            video.current.currentTime = Number(event.target.value);
            setTime(video.current.currentTime);
          }}
        />
        <span className="dashboard-time" aria-hidden="true">
          {formatTime(time)} / {formatTime(duration)}
        </span>
        <div className="dashboard-volume">
          <button
            type="button"
            aria-label={muted || volume === 0 ? "Unmute video" : "Mute video"}
            onClick={() => {
              if (!video.current) return;
              if (video.current.volume === 0) {
                video.current.volume = 1;
                video.current.muted = false;
              } else video.current.muted = !video.current.muted;
            }}
          >
            {muted || volume === 0 ? (
              <VolumeX aria-hidden="true" />
            ) : (
              <Volume2 aria-hidden="true" />
            )}
          </button>
          <input
            type="range"
            aria-label="Video volume"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(event) => {
              if (!video.current) return;
              const value = Number(event.target.value);
              video.current.volume = value;
              video.current.muted = value === 0;
              setVolume(value);
              setMuted(value === 0);
            }}
          />
        </div>
        <button
          type="button"
          className="dashboard-fullscreen"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {fullscreen ? <Minimize aria-hidden="true" /> : <Maximize aria-hidden="true" />}
        </button>
      </div>
      {message && (
        <p className="dashboard-message" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
