import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard, SectionTitle } from "@/components/portfolio-ui";
import { projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Selected Work — Fatma Mourad" },
      {
        name: "description",
        content: "Product design case studies across mobility, health, and sustainable living.",
      },
      { property: "og:title", content: "Selected Work — Fatma Mourad" },
      {
        property: "og:description",
        content: "An archive of thoughtful products designed for real human needs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="page-shell work-page">
      <SectionTitle eyebrow="Selected work" index="02">
        Stories of <em>problems untangled.</em>
      </SectionTitle>
      <div className="archive-intro">
        <p>
          A selection of end-to-end product work - built through research, sharp questions, and
          plenty of iteration.
        </p>
        <span>2024—2026</span>
      </div>
      <div className="project-archive">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <div className="work-more-projects">
        <a
          className="ink-button"
          href="https://www.behance.net/fatmamourad263"
          target="_blank"
          rel="noreferrer"
        >
          View More Projects on Behance <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
