import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import { SectionTitle, SpeechBubble } from "@/components/portfolio-ui";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Fatma Mourad" },
      {
        name: "description",
        content: "Get in touch with product designer Fatma Mourad for thoughtful collaborations.",
      },
      { property: "og:title", content: "Let’s Talk — Fatma Mourad" },
      { property: "og:description", content: "Have a tangled product problem? Let’s talk." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
function ContactPage() {
  return (
    <div className="page-shell contact-page">
      <SectionTitle eyebrow="Open line" index="05">
        Have a knotty problem?
        <br />
        <em>Let’s untangle it.</em>
      </SectionTitle>
      <div className="contact-scene">
        <div className="contact-copy">
          <p>
            I’m always happy to hear about thoughtful products, interesting ideas, or just have a
            good conversation. Feel free to reach out.
          </p>
          <a href="mailto:fatmamourad263@gmail.com" className="email-link">
            <Mail />
            fatmamourad263@gmail.com
            <ArrowUpRight />
          </a>
          <div className="social-links">
            <a
              href="https://linkedin.com/in/fatma-mourad-6074a93b0/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight />
            </a>
            <a href="https://www.behance.net/fatmamourad263" target="_blank" rel="noreferrer">
              Behance <ArrowUpRight />
            </a>
            <a href="https://github.com/Fatma-mourad" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="closing-illustration" aria-hidden="true">
          <SpeechBubble>
            See you in
            <br />
            the next panel!
          </SpeechBubble>
          <div className="tiny-house">
            <span />
            <i />
          </div>
          <div className="closing-hill" />
          <div className="closing-sun" />
          <div className="closing-cloud" />
        </div>
      </div>
    </div>
  );
}
