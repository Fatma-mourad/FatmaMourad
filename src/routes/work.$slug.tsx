import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowLeft, ArrowRight, Music2 } from "lucide-react";
import { ComicPanel, Tag } from "@/components/portfolio-ui";
import { getProject, projects } from "@/lib/portfolio-data";
import designSystemPdf from "@/assets/blues design system.pdf?url";
import omnilorPrototype from "@/assets/Omnilor Prototype.mp4?url";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} Case Study — Fatma Mourad`
          : "Case Study Not Found — Fatma Mourad",
      },
      {
        name: "description",
        content: loaderData?.description ?? "Product design case study by Fatma Mourad.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.title} — Fatma Mourad` : "Case Study — Fatma Mourad",
      },
      {
        property: "og:description",
        content: loaderData?.description ?? "Product design case study by Fatma Mourad.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudy,
});

function CaseStudy() {
  const project = Route.useLoaderData();
  const current = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(current + 1) % projects.length];
  if (!next) return null;
  if (project.slug === "blues") {
    return <BluesCaseStudy project={project} next={next} current={current} />;
  }
  if (project.slug === "garlic") {
    return <GarlicCaseStudy project={project} next={next} current={current} />;
  }
  if (project.slug === "mintro") {
    return <MintroCaseStudy project={project} next={next} current={current} />;
  }
  if (project.slug === "omnilor") {
    return <OmnilorCaseStudy project={project} next={next} current={current} />;
  }
  return (
    <article className={`case-study case-${project.tone}`}>
      <header className="case-hero">
        <Link to="/work" className="back-link">
          <ArrowLeft /> All work
        </Link>
        <div className="case-title">
          <p>{project.category}</p>
          <h1>{project.title}</h1>
          <p className="case-deck">{project.description}</p>
          <div className="case-tags">
            <Tag>{project.role}</Tag>
            <Tag>{project.duration}</Tag>
            <Tag>{project.year}</Tag>
          </div>
        </div>
        <div className="case-cover">
          <img src={project.image} alt={project.imageAlt} width={1200} height={912} />
          <span>Case study / 0{current + 1}</span>
        </div>
      </header>
      <div className="case-body">
        <section className="case-opening">
          <p className="chapter-label">The setup</p>
          <h2>{project.challenge}</h2>
        </section>
        <div className="case-columns">
          <ComicPanel>
            <span className="panel-label">Challenge</span>
            <p>{project.challenge}</p>
          </ComicPanel>
          <ComicPanel>
            <span className="panel-label">Approach</span>
            <p>{project.approach}</p>
          </ComicPanel>
        </div>
        {project.chapters.map((chapter, chapterIndex) => (
          <section className="case-chapter" key={chapter.title}>
            <p className="chapter-label">{chapter.eyebrow}</p>
            <h2>
              {chapter.title} <em>{chapter.accent}</em>
            </h2>
            {chapter.body && <p className="chapter-copy">{chapter.body}</p>}
            {chapter.items && (
              <div className="process-strip" aria-label={chapter.eyebrow}>
                {chapter.items.map((item, itemIndex) => (
                  <div key={item}>
                    <span>0{itemIndex + 1}</span>
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
            )}
            {chapterIndex === 1 && (
              <div className="prototype-frame">
                <img
                  src={project.image}
                  alt={`${project.title} interface detail`}
                  width={1200}
                  height={912}
                  loading="lazy"
                />
              </div>
            )}
          </section>
        ))}
        <section className="outcome-section">
          <div>
            <p className="chapter-label">What changed</p>
            <h2>
              A clearer path,
              <br />
              <em>made tangible.</em>
            </h2>
            <p>{project.outcome}</p>
          </div>
          <div className="metric-grid">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>
        <Link to="/work/$slug" params={{ slug: next.slug }} className="next-case">
          <span>Next story</span>
          <strong>{next.title}</strong>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

const bluesDetail = {
  category: "Brand E-commerce · Design System",
  description:
    "A minimalist, high-end shopping experience for a fictional fashion brand built entirely around one color.",
  tags: ["Product designer", "2 weeks", "2026"],
  setupHeading: "A little love letter to blue",
  goal: "The goal was to create a minimalist, high-end e-commerce experience for a fictional fashion brand built around a monochromatic blue identity.",
  approach:
    "Combine typography, photography, motion, and ambient audio into an editorial fashion experience without making shopping feel complicated.",
  process: [
    ["Define", "Shape the brand idea and the shopping structure it needs to support."],
    ["Direct", "Establish the blue visual language across mood, tone, and imagery."],
    ["Design", "Design the e-commerce screens, states, and reusable components."],
    ["Build", "Translate the system into a responsive, working website."],
  ],
  changed: [
    "Use visual language shared across every screen, from homepage to checkout.",
    "Reusable components - buttons, cards, inputs - instead of one-off designs.",
    "Fully responsive system available on desktop, tablet, and mobile devices.",
  ],
  audioDescription:
    "An ambient soundtrack could easily distract from shopping. The player needed to feel present without ever competing for attention.",
  audioPoints: [
    "Starts as a small, unobtrusive control tucked into the corner of the screen.",
    "The user chooses whether to interact; nothing plays without consent.",
    "The player expands in place to reveal playback controls.",
    "Audio supports the mood of the collection without ever interrupting the site.",
  ],
  outcome: "From personal inspiration to a working product.",
  outcomes: [
    "Complete responsive e-commerce experience",
    "Supporting design system",
    "Functional website",
    "Editorial brand identity",
  ],
};

type DetailProps = {
  project: (typeof projects)[number];
  next: (typeof projects)[number];
  current: number;
};

function DetailHero({
  project,
  current,
  category,
  description,
  tags,
}: DetailProps & { category: string; description: string; tags: string[] }) {
  return (
    <header className="case-hero">
      <Link to="/work" className="back-link">
        <ArrowLeft /> All work
      </Link>
      <div className="case-title">
        <p>{category}</p>
        <h1>{project.title}</h1>
        <p className="case-deck">{description}</p>
        <div className="case-tags">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="case-cover">
        <img src={project.image} alt={project.imageAlt} width={1200} height={912} />
        <span>Case study / 0{current + 1}</span>
      </div>
    </header>
  );
}

function DetailNext({ next }: { next: (typeof projects)[number] }) {
  return (
    <Link to="/work/$slug" params={{ slug: next.slug }} className="next-case">
      <span>Next story</span>
      <strong>{next.title}</strong>
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}

function GarlicCaseStudy({ project, next, current }: DetailProps) {
  const strategy = [
    "Define product direction",
    "UI/UX design",
    "Brand architecture & system",
    "Build modern frontend",
    "Web & app development",
  ];
  const architecture = [
    "Clear value proposition",
    "Services",
    "Selected work",
    "Process & working style",
    "Contact",
  ];
  const visual = [
    "Strong typography",
    "High contrast colors",
    "Structured content layout",
    "Minimalist visual cadence",
    "Interactive components",
  ];
  return (
    <article className="case-study custom-case garlic-case-study">
      <DetailHero
        project={project}
        next={next}
        current={current}
        category="Branding, Website Design, Content Strategy"
        description="A digital agency portfolio built for clear communication, showcasing digital services, brand strategy, and bilingual support."
        tags={["Website design", "2 weeks", "2023"]}
      />
      <div className="case-body">
        <section className="custom-intro">
          <div>
            <p className="chapter-label">The challenge</p>
            <h2>How can a digital company sound capable without sounding corporate?</h2>
          </div>
          <a className="custom-action" href="#garlic-strategy">
            Visit live website <ArrowRight />
          </a>
        </section>
        <ComicPanel>
          <p>
            A digital agency portfolio needs to speak clearly about services, process, and
            messaging. The challenge was to create a modern agency site that feels competent,
            approachable, and transparent without relying on corporate jargon.
          </p>
        </ComicPanel>
        <section className="custom-section" id="garlic-strategy">
          <p className="chapter-label">The strategy</p>
          <h2>
            Clear services. <em>A stronger first impression.</em>
          </h2>
          <div className="custom-pills">
            {strategy.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <CustomNumberSection
          className="garlic-architecture"
          eyebrow="Content architecture"
          heading="What a first-time visitor needs, in order"
          items={architecture}
        />
        <section className="custom-section">
          <p className="chapter-label">Visual direction</p>
          <h2>
            Approachable, modern, <em>and clear.</em>
          </h2>
          <div className="custom-pills">
            {visual.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <section className="custom-section garlic-bilingual">
          <p className="chapter-label">Bilingual design</p>
          <h2>
            Designing for <em>two reading directions.</em>
          </h2>
          <div className="custom-dual-grid">
            <ComicPanel>
              <strong>English - LTR</strong>
              <p>
                Left-aligned typography and structured layout optimized for reading left to right.
              </p>
              <div className="custom-pills">
                <span>LTR typography</span>
                <span>UI grid</span>
                <span>Balanced spacing</span>
              </div>
            </ComicPanel>
            <ComicPanel>
              <strong>Arabic - RTL</strong>
              <p>Right-aligned typography designed for seamless right-to-left reading flow.</p>
              <div className="custom-pills">
                <span>RTL font pairing</span>
                <span>Consistent spacing</span>
                <span>Equal hierarchy</span>
              </div>
            </ComicPanel>
          </div>
        </section>
        <section className="custom-section">
          <p className="chapter-label">Responsive experience</p>
          <h2>
            Adapted, <em>not just shrunk.</em>
          </h2>
          <div className="custom-responsive-grid">
            {["Desktop", "Tablet", "Mobile"].map((item) => (
              <div key={item}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
        <CustomOutcome
          heading="A digital solutions website with a clearer voice."
          items={[
            "Functional & responsive website layout",
            "Scalable UI components",
            "Precise content architecture",
            "Arabic & English support",
          ]}
        />
        <DetailNext next={next} />
      </div>
    </article>
  );
}

function MintroCaseStudy({ project, next, current }: DetailProps) {
  const journey = [
    ["Discover", "Onboarding and quick feature walkthrough."],
    ["Connect", "Linking payment methods."],
    ["Spend", "Card usage triggers transaction tracking."],
    ["Save", "Auto-roundups accumulate small differences."],
    ["Track", "View accumulated micro-savings."],
  ];
  return (
    <article className="case-study custom-case mintro-case-study">
      <DetailHero
        project={project}
        next={next}
        current={current}
        category="Product Design / Fintech / Product Concept"
        description="A FinTech product concept that makes saving money feel automatic and invisible."
        tags={["Product design", "2 weeks", "2023"]}
      />
      <div className="case-body">
        <section className="custom-intro">
          <div>
            <p className="chapter-label">The thought</p>
            <h2>Saving doesn&apos;t have to feel like another task.</h2>
          </div>
          <a className="custom-action" href="#mintro-idea">
            Download case study <ArrowDownToLine />
          </a>
        </section>
        <ComicPanel>
          <p>
            Saving money routinely is heavy work and building a consistent habit is hard -
            especially when the amounts are small. MINTRO explores how saving could happen naturally
            in the background through automatic round-ups.
          </p>
        </ComicPanel>
        <section className="custom-section" id="mintro-idea">
          <p className="chapter-label">The idea / hook</p>
          <h2>
            Turn everyday spending into <em>small progress.</em>
          </h2>
          <div className="mintro-calculation">
            <strong>
              123.50 <span>→</span> 125 EGP
            </strong>
            <b>+1.50 EGP saved</b>
          </div>
          <p>
            The practice of rounding up everyday purchases and automatically transferring the
            difference toward short-term savings.
          </p>
        </section>
        <section className="custom-section">
          <p className="chapter-label">The user journey</p>
          <h2>
            Five small steps, <em>one habit.</em>
          </h2>
          <div className="custom-process five-columns">
            {journey.map(([title, description], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="custom-section">
          <p className="chapter-label">Product structure</p>
          <h2>
            A simple product, built around <em>visibility.</em>
          </h2>
          <p>
            A lightweight financial loop that makes the accumulation of small balances clear and
            pleasantly ordinary.
          </p>
          <div className="custom-pills">
            {[
              "Onboarding",
              "Account connection",
              "Main dashboard",
              "Round-up activity",
              "Wallet",
              "Notifications",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <section className="custom-section">
          <p className="chapter-label">Built for transparency</p>
          <h2>Simple doesn&apos;t mean unclear.</h2>
          <div className="custom-card-grid">
            {[
              ["What you spent", "The user sees the original transaction amount, unaltered."],
              ["What you saved", "The rounded-up amount is shown secondary, never bundled in."],
              ["Where it went", "Clear feedback on the destination of every saved amount."],
            ].map(([title, text]) => (
              <ComicPanel key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </ComicPanel>
            ))}
          </div>
        </section>
        <section className="custom-section mintro-dashboard">
          <div>
            <p className="chapter-label">Dashboard access</p>
            <h2>
              Everything visible, <em>nothing buried.</em>
            </h2>
          </div>
          <ComicPanel>
            <ul>
              {[
                "Current savings balance",
                "Total saved to date",
                "Recent round-ups",
                "Progress toward goal",
                "Account connection status",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ComicPanel>
        </section>
        <CustomOutcome
          heading="A small habit with product potential."
          items={[
            "Automatic round-up savings",
            "Clear financial feedback",
            "Experience designed around trust",
          ]}
        />
        <DetailNext next={next} />
      </div>
    </article>
  );
}

function OmnilorCaseStudy({ project, next, current }: DetailProps) {
  const focus = [
    "Multiple locations at once",
    "Live safety alerts",
    "Per-building data",
    "Map-based navigation",
  ];
  const pillars = [
    "Centralized overview",
    "Location-based information",
    "Operational interface",
    "Trustworthy experience",
  ];
  const flow = [
    "Scan - people scan the map to read the overall situation.",
    "Identify — location markers communicate different safety states.",
    "Select — people select a location to inspect one building.",
    "Understand — a popup reveals detail without losing map context.",
  ];
  return (
    <article className="case-study custom-case omnilor-case-study">
      <DetailHero
        project={project}
        next={next}
        current={current}
        category="Safety · Dashboard · 2026 "
        description="A safety dashboard for operational teams that brings complex site data into one clear, easy-to-read view."
        tags={["UI / UX intern", "8 weeks", "2026"]}
      />
      <div className="case-body">
        <section className="custom-section omnilor-context">
          <p className="chapter-label">The context</p>
          <h2>
            Making complex safety data <em>easier to read.</em>
          </h2>
          <p>
            Safety systems can hold a huge amount of information - locations, buildings, alerts,
            incidents, and different status types. The challenge wasn't to show more information. It
            was to help people understand what matters right now.
          </p>
          <div className="custom-card-grid">
            {focus.map((item) => (
              <ComicPanel key={item}>
                <span className="custom-dot" />
                {item}
              </ComicPanel>
            ))}
          </div>
        </section>
        <section className="custom-section">
          <p className="chapter-label">The goal</p>
          <h2>
            One dashboard. <em>A clearer view.</em>
          </h2>
          <p>
            The goal was a centralized safety dashboard that gives people a clear overview of
            different locations and helps them spot what's important, fast.
          </p>
          <div className="custom-pills">
            {pillars.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <CustomNumberSection
          eyebrow="the approach"
          heading="From map overview to building detail"
          items={flow}
        />
        <section className="custom-section">
          <p className="chapter-label">information hierarchy</p>
          <h2>
            If everything is important, <em>nothing is.</em>
          </h2>
          <p>
            Not every piece of safety data can sit on screen at once - so each layer below answers a
            different question, and only appears when the person actually needs it.
          </p>
          <div className="custom-alerts">
            {[
              ["location markers", "Seen at a glance while scanning. Is anything here?"],
              ["Alerts", "Surfaces only when something needs attention."],
              [
                "building information",
                "Revealed only after a location is selected. What exactly is going on?",
              ],
              ["map", "Always visible. The starting point — where am I looking?"],
            ].map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="custom-section omnilor-prototype">
          <p className="chapter-label">Interactive prototype</p>
          <h2>
            Seeing the dashboard <em>live in motion.</em>
          </h2>
          <div className="prototype-frame">
            <video src={omnilorPrototype} controls playsInline preload="metadata">
              Your browser does not support video playback.
            </video>
          </div>
        </section>
        <section className="custom-section">
          <p className="chapter-label">what i’m proud of</p>
          <h2>
            A clearer way to read a <em>complex situation.</em>
          </h2>
          <div className="custom-card-grid">
            {[
              "Turned the map from a background into an active interface",
              "Progressive disclosure of detail",
              "Context preserved while opening building detail",
              "Reusable components across states",
            ].map((item) => (
              <ComicPanel key={item}>
                <span className="custom-dot" />
                {item}
              </ComicPanel>
            ))}
          </div>
        </section>
        <CustomOutcome
          heading="A safety dashboard built around context."
          items={[
            "Map-based experience that stays legible under real data load.",
            "Building information layered in without losing the overview.",
            "Reusable design system spanning map, cards, and states.",
          ]}
        />
        <DetailNext next={next} />
      </div>
    </article>
  );
}

function CustomNumberSection({
  className = "",
  eyebrow,
  heading,
  items,
}: {
  className?: string;
  eyebrow: string;
  heading: string;
  items: string[];
}) {
  return (
    <section className={`custom-section custom-number-section ${className}`}>
      <p className="chapter-label">{eyebrow}</p>
      <h2>{heading}</h2>
      <ol>
        {items.map((item, index) => (
          <li key={item}>
            <strong>0{index + 1}</strong>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CustomOutcome({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="custom-section custom-outcome">
      <p className="chapter-label">Outcome</p>
      <h2>{heading}</h2>
      <div className="custom-outcome-grid">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </section>
  );
}

function BluesCaseStudy({
  project,
  next,
  current,
}: {
  project: (typeof projects)[number];
  next: (typeof projects)[number];
  current: number;
}) {
  return (
    <article className="case-study case-blue blues-case-study">
      <header className="case-hero">
        <Link to="/work" className="back-link">
          <ArrowLeft /> All work
        </Link>
        <div className="case-title">
          <p>{bluesDetail.category}</p>
          <h1>{project.title}</h1>
          <p className="case-deck">{bluesDetail.description}</p>
          <div className="case-tags">
            {bluesDetail.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="case-cover">
          <img src={project.image} alt={project.imageAlt} width={1200} height={912} />
          <span>Case study / 0{current + 1}</span>
        </div>
      </header>
      <div className="case-body">
        <section className="case-opening blues-setup">
          <div>
            <p className="chapter-label">The setup</p>
            <h2>
              A little love letter to <span className="blues-accent">blue</span>
            </h2>
          </div>
          <a
            className="blues-action"
            href={designSystemPdf}
            download="blues design system.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <ArrowDownToLine aria-hidden="true" /> Read Design System
          </a>
        </section>
        <div className="case-columns">
          <ComicPanel>
            <span className="panel-label">The goal</span>
            <p>{bluesDetail.goal}</p>
          </ComicPanel>
          <ComicPanel>
            <span className="panel-label">The approach</span>
            <p>{bluesDetail.approach}</p>
          </ComicPanel>
        </div>
        <section className="case-chapter" id="blues-process">
          <p className="chapter-label">The process</p>
          <h2>
            From a color idea to <em className="blues-accent">a working store.</em>
          </h2>
          <div className="process-strip">
            {bluesDetail.process.map(([title, description], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="outcome-section blues-changed">
          <div>
            <p className="chapter-label">What changed</p>
            <h2>
              A more <em>cohesive experience,</em> built to scale.
            </h2>
          </div>
          <ol className="blues-change-list">
            {bluesDetail.changed.map((item, index) => (
              <li key={item}>
                <strong>0{index + 1}</strong>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="case-chapter blues-audio-challenge">
          <div>
            <p className="chapter-label">The audio challenge</p>
            <h2>
              Making <em className="blues-accent">music</em> part of the experience without making
              it intrusive.
            </h2>
            <p className="chapter-copy">{bluesDetail.audioDescription}</p>
            <ol className="blues-audio-points">
              {bluesDetail.audioPoints.map((point, index) => (
                <li key={point}>
                  <span>{index + 1}</span>
                  {point}
                </li>
              ))}
            </ol>
          </div>
          <BluesAudioWidget />
        </section>
        <section className="case-chapter blues-outcome">
          <p className="chapter-label">Outcome</p>
          <h2>
            From personal inspiration to a <em className="blues-accent">working product.</em>
          </h2>
          <div className="blues-outcome-grid">
            {bluesDetail.outcomes.map((outcome) => (
              <div key={outcome}>{outcome}</div>
            ))}
          </div>
        </section>
        <Link to="/work/$slug" params={{ slug: next.slug }} className="next-case">
          <span>Next story</span>
          <strong>{next.title}</strong>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function BluesAudioWidget() {
  return (
    <div className="blues-audio-widget" aria-label="Embedded audio player">
      <div className="blues-audio-title">
        <Music2 aria-hidden="true" />
        <span>You&apos;re gonna look good in blues - play</span>
      </div>
      <small>You Will Look Good in Blues</small>
      <div className="blues-audio-controls">
        <span className="blues-play-dot" aria-hidden="true" />
        <span className="blues-audio-track">
          <i />
        </span>
        <span>VOL</span>
        <span className="blues-volume-track">
          <i />
        </span>
      </div>
    </div>
  );
}
