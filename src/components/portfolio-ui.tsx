import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/portfolio-data";

export function InkButton({
  to,
  children,
  tone = "ink",
}: {
  to: string;
  children: ReactNode;
  tone?: "ink" | "paper";
}) {
  return (
    <Link to={to} className={cn("ink-button group", tone === "paper" && "ink-button-paper")}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}

export function SectionTitle({
  eyebrow,
  children,
  index,
}: {
  eyebrow: string;
  children: ReactNode;
  index: string;
}) {
  return (
    <header className="section-title">
      <p className="eyebrow">
        <span>{index}</span>
        {eyebrow}
      </p>
      <h1>{children}</h1>
      <span className="scribble-line" aria-hidden="true" />
    </header>
  );
}

export function SpeechBubble({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("speech-bubble", className)}>{children}</div>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="comic-tag">{children}</span>;
}

export function ComicPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("comic-panel", className)}>{children}</div>;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={cn("project-card group", `project-${project.tone}`)}>
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        aria-label={`View ${project.title} case study`}
      >
        <div className="project-image-wrap">
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={912}
            loading="lazy"
          />
          <span className="panel-number">0{index + 1}</span>
          {project.slug === "omnilor" && (
            <span className="project-doodle-star" aria-hidden="true">
              ✦
            </span>
          )}
        </div>
        <div className="project-copy">
          <div className="project-meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <span className="project-link">
            Read case study <ArrowDownRight aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
