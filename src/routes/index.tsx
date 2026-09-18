import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/comic-landscape.jpg";
import { InkButton, SpeechBubble } from "@/components/portfolio-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fatma Mourad — Product Designer" },
      {
        name: "description",
        content:
          "Fatma Mourad designs thoughtful digital products where clarity, curiosity, and human needs meet.",
      },
      { property: "og:title", content: "Fatma Mourad — Product Designer" },
      {
        property: "og:description",
        content: "A product design portfolio told inside a hand-drawn world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="home-view">
      <section className="hero-panel" aria-labelledby="hero-title">
        <img
          className="hero-landscape"
          src={heroImage}
          alt="A hand-drawn coastal landscape with trees, houses, clouds, and a mustard sun"
          width={1600}
          height={1000}
        />
        <div className="cloud cloud-one" aria-hidden="true" />
        <div className="cloud cloud-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-kicker">
            <span>01</span> Hello, I’m Fatma
          </p>
          <h1 id="hero-title">
            I design the
            <br />
            <em>way through.</em>
          </h1>
          <p className="hero-role">Product Designer</p>
          <p className="hero-intro">
            I turn tangled systems into clear, human experiences with curiosity, craft, and a sharp
            eye for what matters.
          </p>
          <div className="hero-actions">
            <InkButton to="/work">View my work</InkButton>
            <InkButton to="/about" tone="paper">
              About me
            </InkButton>
          </div>
        </div>
        <SpeechBubble className="hero-bubble">
          <Sparkles aria-hidden="true" /> Make it useful.
          <br />
          Make it feel obvious.
        </SpeechBubble>
        <div className="scroll-note">
          <ArrowDown aria-hidden="true" />
          <span>Enter the story</span>
        </div>
      </section>
      <section className="home-teaser" aria-label="Portfolio introduction">
        <p>Research-led.</p>
        <span aria-hidden="true">✦</span>
        <p>Systems-minded.</p>
        <span aria-hidden="true">✦</span>
        <p>Built for real life.</p>
      </section>
    </div>
  );
}
