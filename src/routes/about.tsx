import { createFileRoute } from "@tanstack/react-router";
import { Coffee, Compass, Eye, MessageCircle } from "lucide-react";
import fatmaImage from "@/assets/fatma.jpg";
import { ComicPanel, SectionTitle, SpeechBubble, Tag } from "@/components/portfolio-ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Fatma Mourad" },
      {
        name: "description",
        content:
          "Meet Fatma Mourad, a product designer who makes complicated things feel clear and human.",
      },
      { property: "og:title", content: "About Fatma Mourad" },
      {
        property: "og:description",
        content: "Product designer, systems thinker, curious observer.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="page-shell about-page">
      <SectionTitle eyebrow="Behind the screens" index="03">
        Curious by nature.
        <br />
        <em>Designer by practice.</em>
      </SectionTitle>
      <div className="about-story">
        <div className="portrait-scene" aria-label="A stylized portrait scene for Fatma">
          <img className="portrait-photo" src={fatmaImage} alt="Fatma Mourad" />
          <span className="doodle-star">✦</span>
          <SpeechBubble>
            I’m always asking:
            <br />
            <strong>“What are we really solving?”</strong>
          </SpeechBubble>
        </div>
        <div className="about-copy">
          <p className="lead">
            I’m Fatma, a product designer who likes finding the calm, logical thread inside messy
            problems.
          </p>
          <p>
            I enjoy turning complex ideas into simple interfaces while thinking about both the user
            and the product behind the screen. I’m curious, detail-oriented, and always learning
            something new - from product design and business to languages, technology and even
            Blockchain!{" "}
          </p>
          <p className="location-note">
            <strong>• Currently based in:</strong> Heliopolis, Cairo.
          </p>
        </div>
      </div>
      <div className="philosophy-grid">
        <ComicPanel>
          <Eye />
          <span>01</span>
          <h2>Notice deeply</h2>
          <p>The useful clues are often hiding in plain sight.</p>
        </ComicPanel>
        <ComicPanel>
          <Compass />
          <span>02</span>
          <h2>Frame clearly</h2>
          <p>A strong question can save a team months of motion.</p>
        </ComicPanel>
        <ComicPanel>
          <MessageCircle />
          <span>03</span>
          <h2>Make together</h2>
          <p>Design gets better when the room has many voices.</p>
        </ComicPanel>
      </div>
      <section className="about-details">
        <div>
          <h2>What I do</h2>
          <div className="tag-cloud">
            {[
              "Product strategy",
              "User research",
              "Interaction design",
              "Prototyping",
              "Design systems",
              "Motion & micro interaction",
            ].map((x) => (
              <Tag key={x}>{x}</Tag>
            ))}
          </div>
        </div>
        <div>
          <h2>Tools I use</h2>
          <p>
            <strong className="tool-label">Design Tools:</strong> Figma · Framer · Balsamiq ·
            Illustrator · Photoshop · Obsidian
          </p>
          <p>
            <strong className="tool-label">AI Tools:</strong> Claude · Perplexity · Runway ·
            Antigravity · ChatGPT · Codex · Manus
          </p>
          <p>
            <strong className="tool-label">Tech Tools:</strong> Github · Vercel · VS Code
          </p>
        </div>
        <div className="personal-note">
          <Coffee />
          <p>
            Offline, I watch animated sitcoms, read comic books, listen to a lot of music, and draw
            comics badly. The last one may or may not explain this website.
          </p>
        </div>
      </section>
    </div>
  );
}
