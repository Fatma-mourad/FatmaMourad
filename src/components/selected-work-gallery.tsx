import * as Dialog from "@radix-ui/react-dialog";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
  type Ref,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useSearch } from "@tanstack/react-router";
import { selectedWork, type WorkProject } from "@/lib/selected-work";
import "./selected-work.css";

export function SelectedWorkGallery() {
  const search = useSearch({ strict: false });
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; left: number; active: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  const updateEdges = () => {
    const track = trackRef.current;
    if (track) {
      const next = {
        start: track.scrollLeft <= 2,
        end: track.scrollLeft >= track.scrollWidth - track.clientWidth - 2,
      };
      setEdges((previous) =>
        previous.start === next.start && previous.end === next.end ? previous : next,
      );
    }
  };
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    updateEdges();
    return () => observer.disconnect();
  }, []);
  const advance = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector<HTMLElement>(".sw-card");
    const step = (first?.offsetWidth ?? 0) + parseFloat(getComputedStyle(track).columnGap);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * step, behavior: reduced ? "instant" : "smooth" });
  };
  const endDrag = (element: HTMLDivElement) => {
    const current = drag.current;
    drag.current = null;
    delete element.dataset["dragging"];
    if (current && element.hasPointerCapture(current.id)) element.releasePointerCapture(current.id);
  };
  const dialogHandles = useRef<Record<string, { reset: () => void } | null>>({});
  return (
    <section className="sw-carousel" aria-label="Selected projects" aria-roledescription="carousel">
      <div className="sw-carousel-toolbar">
        <span>Seven projects. Seven stories.</span>
        <div className="sw-carousel-navigation" aria-label="Project carousel controls">
          <button
            type="button"
            onClick={() => advance(-1)}
            disabled={edges.start}
            aria-label="Previous project"
            aria-controls="selected-project-track"
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            disabled={edges.end}
            aria-label="Next project"
            aria-controls="selected-project-track"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        className="sw-gallery"
        id="selected-project-track"
        ref={trackRef}
        tabIndex={0}
        aria-label="Project cards; scroll horizontally to explore"
        onScroll={updateEdges}
        onKeyDown={(event) => {
          if (!(event.target instanceof Node) || !event.currentTarget.contains(event.target))
            return;
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            advance(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onPointerDown={(event) => {
          suppressClick.current = false;
          if (
            event.pointerType !== "mouse" ||
            event.button !== 0 ||
            !event.currentTarget.contains(event.target as Node)
          )
            return;
          drag.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            left: event.currentTarget.scrollLeft,
            active: false,
          };
        }}
        onPointerMove={(event) => {
          const current = drag.current;
          if (!current || current.id !== event.pointerId) return;
          if (event.buttons === 0) {
            endDrag(event.currentTarget);
            return;
          }
          const dx = event.clientX - current.x;
          if (
            !current.active &&
            Math.abs(dx) > 7 &&
            Math.abs(dx) > Math.abs(event.clientY - current.y)
          ) {
            current.active = true;
            suppressClick.current = true;
            event.currentTarget.dataset["dragging"] = "true";
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          if (current.active) {
            event.preventDefault();
            event.currentTarget.scrollLeft = current.left - dx;
          }
        }}
        onPointerUp={(event) => endDrag(event.currentTarget)}
        onPointerCancel={(event) => endDrag(event.currentTarget)}
        onLostPointerCapture={(event) => endDrag(event.currentTarget)}
        onClickCapture={(event) => {
          if (
            event.detail > 0 &&
            suppressClick.current &&
            event.currentTarget.contains(event.target as Node)
          ) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        {selectedWork.map((project, index) => (
          <Dialog.Root
            key={project.protected ? `${project.slug}-${search.project ?? ""}` : project.slug}
            defaultOpen={Boolean(project.protected && search.project === "omnilor")}
            onOpenChange={(open) => {
              if (!open && project.protected) dialogHandles.current[project.slug]?.reset();
            }}
          >
            <article
              className={`sw-card sw-card-${project.slug}`}
              aria-label={`${index + 1} of ${selectedWork.length}`}
            >
              <Dialog.Trigger className="sw-trigger" aria-label={`Explore ${project.title}`}>
                <div className="sw-preview">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                  <span className="sw-number">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="sw-caption">
                  <div>
                    <span className="sw-category">{project.category}</span>
                    <h2>{project.title}</h2>
                  </div>
                  <span className="sw-arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
              </Dialog.Trigger>
            </article>
            <ProjectDialog
              project={project}
              ref={(handle) => {
                dialogHandles.current[project.slug] = handle;
              }}
            />
          </Dialog.Root>
        ))}
      </div>
    </section>
  );
}

function ProjectDialog({
  project,
  ref,
}: {
  project: WorkProject;
  ref: Ref<{ reset: () => void }>;
}) {
  const [unlocked, setUnlocked] = useState<WorkProject | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const requestRef = useRef<AbortController | null>(null);
  const granted = useRef(false);
  useEffect(() => () => requestRef.current?.abort(), []);
  const reset = () => {
    granted.current = false;
    requestRef.current?.abort();
    requestRef.current = null;
    setUnlocked(null);
    setPassword("");
    setError("");
    setPending(false);
  };
  useImperativeHandle(ref, () => ({ reset }));
  if (!project.protected || unlocked)
    return <ProjectPanel project={unlocked ?? project} onClose={reset} />;
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="sw-backdrop" />
      <Dialog.Content
        className="sw-panel sw-access-panel"
        data-project={project.slug}
        aria-describedby="omnilor-access-description"
        onCloseAutoFocus={(event) => {
          if (granted.current) event.preventDefault();
          else reset();
        }}
      >
        <div className="sw-panel-bar">
          <span>Private project</span>
          <Dialog.Close className="sw-close" aria-label="Close project">
            <span>Close</span>
            <X aria-hidden="true" />
          </Dialog.Close>
        </div>
        <div className="sw-access-body">
          <Dialog.Title className="sw-info-title">Omnilor</Dialog.Title>
          <Dialog.Description id="omnilor-access-description">
            This project is password protected.
          </Dialog.Description>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (pending) return;
              const controller = new AbortController();
              requestRef.current = controller;
              setPending(true);
              setError("");
              try {
                const response = await fetch("/api/omnilor/unlock", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "same-origin",
                  cache: "no-store",
                  body: JSON.stringify({ password }),
                  signal: controller.signal,
                });
                const result = await response.json();
                if (controller.signal.aborted) return;
                if (!response.ok) {
                  setError(result.error || "Unable to unlock the project. Please try again.");
                  return;
                }
                setPassword("");
                granted.current = true;
                setUnlocked(result as WorkProject);
              } catch {
                if (!controller.signal.aborted) setError("Unable to connect. Please try again.");
              } finally {
                if (!controller.signal.aborted) setPending(false);
              }
            }}
          >
            <label htmlFor="omnilor-password">Project password</label>
            <input
              id="omnilor-password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={1024}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "omnilor-access-error" : undefined}
            />
            {error && (
              <p id="omnilor-access-error" role="alert" className="sw-access-error">
                {error}
              </p>
            )}
            <button className="sw-unlock" type="submit" disabled={pending}>
              {pending ? "Unlocking..." : "Unlock Project"}
            </button>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function ProjectPanel({ project, onClose }: { project: WorkProject; onClose: () => void }) {
  const [imageIndex, setImageIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const images = project.images;
  const image = images[imageIndex] ?? images[0]!;
  const multiple = images.length > 1;
  const navigate = (direction: number) => {
    setImageIndex((current) => (current + direction + images.length) % images.length);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (
      !multiple ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      target.closest("input, textarea, select, [contenteditable=true]")
    )
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      navigate(event.key === "ArrowRight" ? 1 : -1);
    }
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="sw-backdrop" />
      <Dialog.Content
        className="sw-panel"
        data-project={project.slug}
        aria-describedby={project.overview ? `sw-description-${project.slug}` : undefined}
        onOpenAutoFocus={() => setImageIndex(0)}
        onKeyDown={handleKeyDown}
        onCloseAutoFocus={onClose}
      >
        <div className="sw-panel-bar">
          <Dialog.Title>{project.title}</Dialog.Title>
          <Dialog.Close className="sw-close" aria-label="Close project">
            <span>Close</span>
            <X aria-hidden="true" />
          </Dialog.Close>
        </div>
        <div className="sw-panel-body">
          <section
            className="sw-media"
            aria-label={`${project.title} image gallery`}
            aria-roledescription="carousel"
          >
            <div
              className="sw-media-stage"
              onTouchStart={(event) => {
                const touch = event.touches[0];
                touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
              }}
              onTouchCancel={() => {
                touchStart.current = null;
              }}
              onTouchEnd={(event) => {
                const start = touchStart.current;
                const touch = event.changedTouches[0];
                touchStart.current = null;
                if (!multiple || !start || !touch) return;
                const dx = touch.clientX - start.x;
                const dy = touch.clientY - start.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5)
                  navigate(dx < 0 ? 1 : -1);
              }}
            >
              <img
                key={image.src}
                className="sw-gallery-image"
                src={image.src}
                alt={image.alt}
                decoding="async"
                draggable={false}
              />
            </div>
            {multiple && (
              <div className="sw-gallery-controls">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  aria-label="Previous project image"
                >
                  <ArrowLeft aria-hidden="true" />
                </button>
                <span aria-live="polite" aria-atomic="true">
                  {String(imageIndex + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => navigate(1)} aria-label="Next project image">
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </section>
          <div className="sw-project-info">
            <p className="sw-category">{project.category}</p>
            <h2 className="sw-info-title">{project.title}</h2>
            {project.overview && (
              <Dialog.Description id={`sw-description-${project.slug}`} className="sw-overview">
                {project.overview}
              </Dialog.Description>
            )}
            <div className="sw-detail-grid">
              {[
                ["My role", project.role],
                ["The challenge", project.challenge],
                ["The approach", project.approach],
                ["What I learned", project.learned],
              ].map(([label, content]) => (
                <section key={label}>
                  <h3>{label}</h3>
                  <p>{content || "To be added."}</p>
                </section>
              ))}
            </div>
            {project.tools?.length ? (
              <section>
                <h3>Tools</h3>
                <p>{project.tools.join(" / ")}</p>
              </section>
            ) : null}
            {project.links?.length ? (
              <div className="sw-links">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
