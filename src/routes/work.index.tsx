import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/portfolio-ui";
import { SelectedWorkGallery } from "@/components/selected-work-gallery";

export const Route = createFileRoute("/work/")({
  validateSearch: (search: Record<string, unknown>): { project?: string } =>
    search["project"] === "omnilor" ? { project: "omnilor" } : {},
  head: () => ({
    meta: [
      { title: "Selected Work" },
      {
        name: "description",
        content:
          "Product design case studies across e-commerce, safety dashboards, digital services, and savings.",
      },
      { property: "og:title", content: "Selected Work" },
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
          A selection of end-to-end product work built through research, sharp questions, and plenty
          of iteration.
        </p>
        <span>2024—2026</span>
      </div>
      <SelectedWorkGallery />
    </div>
  );
}
