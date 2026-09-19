import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SectionTitle, Tag } from "@/components/portfolio-ui";
import resumePdf from "@/assets/Fatma Mourad.pdf?url";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Fatma Mourad" },
      {
        name: "description",
        content: "Experience, education, and capabilities of product designer Fatma Mourad.",
      },
      { property: "og:title", content: "Resume — Fatma Mourad" },
      {
        property: "og:description",
        content:
          "Product design experience across complex services and human-centered digital products.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResumePage,
});
const roles = [
  {
    years: "May - Jul 2026",
    title: "UI/UX Design Intern",
    company: "PetroCortex",
    text: "Designed digital interfaces and explored user flows and interaction patterns. Also, Collaborated around product and frontend considerations.",
  },
  {
    years: "2025 - 2026",
    title: "UI/UX Projects",
    company: "Freelance",
    text: "Shipped cross-platform products, facilitated discovery, and helped establish a shared design system.",
  },
  {
    years: "2023 - 2025",
    title: "Market Analyst",
    company: "· Cairo",
    text: "Analyze and execute trades across Crypto markets. Develop and test trading strategies through market analysis and backtesting.",
  },
];
function ResumePage() {
  return (
    <div className="page-shell resume-page">
      <SectionTitle eyebrow="The practical bits" index="04">
        Experience,
        <br />
        <em>on paper.</em>
      </SectionTitle>
      <div className="resume-actions">
        <p>
          I design digital products from the first ambiguous question to the final polished
          interaction.
        </p>
        <a
          className="download-button"
          href={resumePdf}
          download="Fatma Mourad.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <Download /> Request PDF
        </a>
      </div>
      <div className="resume-sheet">
        <section>
          <h2>Experience</h2>
          <div className="timeline">
            {roles.map((role, i) => (
              <article key={role.title}>
                <span className="timeline-dot">{i + 1}</span>
                <p className="timeline-year">{role.years}</p>
                <div>
                  <h3>{role.title}</h3>
                  <strong>{role.company}</strong>
                  <p>{role.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <aside>
          <div>
            <h2>Capabilities</h2>
            <div className="tag-cloud">
              {[
                "Product design",
                "User flows",
                "Wireframing",
                "Design systems",
                "Usability thinking",
                "Research",
                "Responsive design",
                "Prototyping",
              ].map((x) => (
                <Tag key={x}>{x}</Tag>
              ))}
            </div>
          </div>
          <div>
            <h2>Education</h2>
            <div className="resume-education">
              <div>
                <h3>BSc, Science</h3>
                <p>Biochemistry &amp; Microbiology</p>
              </div>
              <p>
                2020 - 2024
                <br />
                Grade : A
              </p>
            </div>
          </div>
          <div>
            <h2>Languages</h2>
            <p>
              Arabic - Native
              <br />
              English - Fluent
              <br />
              German - Beginner
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
