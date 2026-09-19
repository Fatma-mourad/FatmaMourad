import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowLeft, ArrowRight, CloudSun } from "lucide-react";
import { ComicPanel, Tag } from "@/components/portfolio-ui";
import { DashboardPlayer } from "@/components/dashboard-player";
import { getProject, projects } from "@/lib/portfolio-data";
import type { ReactNode } from "react";
import audioImage from "@/assets/audio component.png";
import garlicPdf from "@/assets/GarLicCaseStudy.pdf?url";
import mintroPdf from "@/assets/UX research- Mintro.pdf?url";
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
  return null;
}

const bluesDetail = {
  category: "Brand E-commerce · Design System",
  description:
    "A minimalist, high-end shopping experience for a fictional fashion brand built entirely around one color.",
  tags: ["Product designer", "2 weeks", "2026"],
  setupHeading: "A little love letter to blue",
  goal: "the goal was to create a minimalist, high-end e-commerce experience for a fictional fashion brand built around a monochromatic blue identity.",
  approach:
    "Combine typography, photography, motion, and ambient audio into one editorial fashion experience without making shopping feel complicated.",
  process: [
    ["Define", "Shape the brand idea and the shopping structure it needs to support."],
    ["Direct", "Establish the blue visual language across mood, tone, and imagery."],
    ["Design", "Design the e-commerce screens, states, and reusable components."],
    ["Build", "Translate the system into a responsive, working website."],
  ],
  changed: [
    "One visual language shared across every screen, from homepage to checkout.",
    "Reusable components - buttons, cards, inputs - instead of one-off screens.",
    "Multiple interface states designed up front, not patched in later.",
  ],
  audioDescription:
    "An ambient soundtrack could easily distract from shopping. The player needed to feel present without ever asking for attention.",
  audioPoints: [
    "Starts as a small, unobtrusive control tucked into the corner of the screen.",
    "The user chooses whether to interact nothing plays without consent.",
    "The player expands in place to reveal playback controls.",
    "Audio supports the mood of the collection without ever interrupting the shop.",
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
      <div className="case-container case-back-row">
        <Link to="/work" className="back-link">
          <ArrowLeft /> All work
        </Link>
      </div>
      <div className="case-title">
        <p>
          {category}
          {project.slug === "mintro" && <span className="case-year">2026</span>}
        </p>
        <h1>{project.title}</h1>
        <p className="case-deck">{description}</p>
        <div className="case-tags">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <div className="case-cover">
        {project.slug === "omnilor" && (
          <i className="case-spark" aria-hidden="true">
            ✦
          </i>
        )}
        {project.slug === "garlic" && <CloudSun className="case-weather" aria-hidden="true" />}
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
    "Communicate the services",
    "Build trust",
    "Make the offer easy to understand",
    "A modern visual identity",
    "Arabic & English support",
  ];
  const architecture = [
    "Main value proposition",
    "Services",
    "Solutions",
    "Supporting information",
    "Contact",
  ];
  const visual = [
    "Strong typography",
    "Generous spacing",
    "Clear content hierarchy",
    "Controlled visual elements",
    "Consistent components",
  ];
  return (
    <article className="case-study custom-case garlic-case-study">
      <DetailHero
        project={project}
        next={next}
        current={current}
        category="Website Design · Brand Direction · Bilingual Experience"
        description="A digital solutions website designed to make complex services feel clear, approachable, and easy to understand."
        tags={["Product Designer", "4 weeks", "2026"]}
      />
      <div className="case-body case-container">
        <section className="custom-intro">
          <div>
            <p className="chapter-label">The challenge</p>
            <h2>How can a digital company sound capable without sounding corporate?</h2>
          </div>
          <a className="custom-action" href={garlicPdf} download="Garlic Case Study.pdf">
            <ArrowDownToLine /> Download case study
          </a>
        </section>
        <ComicPanel>
          <p>
            Digital agencies often use the same visual language and generic messaging. The challenge
            was a site that feels professional and trustworthy, while staying approachable and
            distinctive.
          </p>
        </ComicPanel>
        <section className="custom-section" id="garlic-strategy">
          <p className="chapter-label">The Brief</p>
          <h2>
            Clear services.
            <br />{" "}
            <em>
              A stronger first
              <br /> impression
            </em>
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
          heading={
            <>
              What a first-time
              <br /> visitor <em>needs, in order</em>
            </>
          }
          items={architecture}
        />
        <section className="custom-section">
          <p className="chapter-label">Visual direction</p>
          <h2>
            Approachable, modern, <em>and clear</em>
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
            Designing for <em>two</em> reading
            <br /> directions.
          </h2>
          <div className="custom-dual-grid">
            <ComicPanel>
              <strong>English - LTR</strong>
              <h3>Digital solutions, ship simply.</h3>
              <p>Left-aligned heading, left-to-right flow, nav reading left to right.</p>
              <div className="custom-pills">
                <span>Left align</span>
                <span>LTR icons</span>
                <span>Standard spacing</span>
              </div>
            </ComicPanel>
            <ComicPanel>
              <strong lang="ar" dir="rtl">
                العربية - RTL
              </strong>
              <h3 lang="ar" dir="rtl">
                حلول رقمية ، بشكل واضح
              </h3>
              <p>
                Mirrored layout, right-aligned heading, nav and icons flipped to match reading
                direction.
              </p>
              <div className="custom-pills">
                <span>Adjusted line length</span>
                <span>Mirrored icons</span>
                <span>Right align</span>
              </div>
            </ComicPanel>
          </div>
        </section>
        <section className="custom-section">
          <p className="chapter-label">Responsive experience</p>
          <h2>Adapted, not just shrunk.</h2>
          <div className="custom-responsive-grid">
            {["Desktop", "tablet", "Mobile"].map((item) => (
              <div key={item}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
        <CustomOutcome
          heading={
            <>
              A digital solutions website with <em>a clearer voice.</em>
            </>
          }
          items={[
            "Structured information architecture",
            "Reusable UI components",
            "Responsive experience",
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
    ["Discover", "Understand how round-up saving works."],
    ["Connect", "Link a financial source."],
    ["Spend", "Use the connected account normally."],
    ["Save", "Automatically collect the difference."],
    ["Track", "See progress and recent activity."],
  ];
  return (
    <article className="case-study custom-case mintro-case-study">
      <DetailHero
        project={project}
        next={next}
        current={current}
        category="Product Design · Fintech · Product Concept"
        description="A fintech product concept that makes saving money feel automatic and accessible."
        tags={["Product designer", "3 months", "2026"]}
      />
      <div className="case-body case-container">
        <section className="custom-intro">
          <div>
            <p className="chapter-label">The insight</p>
            <h2>
              Saving doesn&apos;t have to feel
              <br /> <em>like another task.</em>
            </h2>
          </div>
          <a className="custom-action" href={mintroPdf} download="Mintro UX Research.pdf">
            <ArrowDownToLine /> Download case study
          </a>
        </section>
        <ComicPanel>
          <p>
            Saving sounds easy in theory, but building a consistent habit is hard - especially when
            the amounts are small. <em className="inline-project-name">MINTRO</em> explores how
            saving could happen naturally, in the background, through automatic round-ups.
          </p>
        </ComicPanel>
        <section className="custom-section" id="mintro-idea">
          <p className="chapter-label">The core idea</p>
          <h2>
            Turn everyday spending{" "}
            <em>
              into
              <br /> small progress.
            </em>
          </h2>
          <div className="mintro-calculation">
            <strong>
              123.50 <span>→</span> 125 EGP
            </strong>
            <b>+1.50 EGP saved</b>
          </div>
          <p>
            The product rounds up everyday purchases and automatically transfers the difference
            toward the user's savings.
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
          <p className="chapter-label">the Product structure</p>
          <h2>
            A simple product, built around <em>visibility.</em>
          </h2>
          <p>
            A lightweight planning loop that makes the sustainable choice feel easier, useful, and
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
          <p className="chapter-label">Trust & Transparency</p>
          <h2>Simple doesn&apos;t mean unclear.</h2>
          <div className="custom-card-grid">
            {[
              ["What was Spent", "The user sees the original transaction amount, unaltered."],
              ["What was Saved", "The rounded-up amount is shown separately, never bundled in."],
              ["Where It Went", "Clear feedback on the destination of every saved amount."],
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
            <p className="chapter-label">Dashboard logic</p>
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
          heading={
            <>
              A small habit with <em>product potential.</em>
            </>
          }
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
        description="A safety dashboard to understand and monitor safety information across physical locations."
        tags={["UI / UX intern", "8 weeks", "2026"]}
      />
      <div className="case-body case-container">
        <section className="custom-section omnilor-context">
          <p className="chapter-label">The context</p>
          <h2>
            Making complex safety
            <br /> data <em>easier to read.</em>
          </h2>
          <p>
            Safety systems can hold a huge amount of information - locations, buildings, alerts,
            incidents, and different status types. The challenge wasn't to show more information. It
            was to help people understand what matters right now.
          </p>
          <ComicPanel className="dot-panel">
            <p className="chapter-label">On the map</p>
            <ul>
              {focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ComicPanel>
        </section>
        <section className="custom-section">
          <p className="chapter-label">The brief</p>
          <h2>
            One dashboard. A <em>clearer</em> view.
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
          className="omnilor-approach"
          heading={
            <>
              From map overview
              <br /> <em>to building detail.</em>
            </>
          }
          description="A transparent care journey that helps patients choose confidently while reducing pressure on support teams."
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
              ["map", "Always visible. The starting point — where am I looking?"],
              ["location markers", "Seen at a glance while scanning. Is anything here?"],
              ["Alerts", "Surfaces only when something needs attention."],
              [
                "building information",
                "Revealed only after a location is selected. What exactly is going on?",
              ],
            ].map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="custom-section omnilor-prototype">
          <p className="chapter-label">The prototype</p>
          <h2>
            Seeing the dashboard <em>live in motion.</em>
          </h2>
          <DashboardPlayer src={omnilorPrototype} />
        </section>
        <section className="custom-section omnilor-proud">
          <div>
            <p className="chapter-label">what I’m proud of</p>
            <h2>A clearer way to read a complex situation.</h2>
          </div>
          <ComicPanel className="dot-panel">
            <ul>
              {[
                "Turned the map from a background into an active interface",
                "Progressive disclosure of detail",
                "Context preserved while opening building detail",
                "Reusable components across states",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ComicPanel>
        </section>
        <CustomOutcome
          heading={
            <>
              A safety dashboard <em>built around context.</em>
            </>
          }
          numbered
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
  description,
}: {
  className?: string;
  eyebrow: string;
  heading: ReactNode;
  items: string[];
  description?: string;
}) {
  return (
    <section className={`custom-section custom-number-section ${className}`}>
      <p className="chapter-label">{eyebrow}</p>
      <h2>{heading}</h2>
      {description && <p className="number-description">{description}</p>}
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

function CustomOutcome({
  heading,
  items,
  numbered = false,
}: {
  heading: ReactNode;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <section className="custom-section custom-outcome">
      <p className="chapter-label">Outcome</p>
      <h2>{heading}</h2>
      <div className="custom-outcome-grid">
        {items.map((item, index) => (
          <div key={item}>
            {numbered && <strong>0{index + 1}</strong>}
            {item}
          </div>
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
        <div className="case-container case-back-row">
          <Link to="/work" className="back-link">
            <ArrowLeft /> All work
          </Link>
        </div>
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
      <div className="case-body case-container">
        <section className="case-opening blues-setup">
          <div>
            <p className="chapter-label">The setup</p>
            <h2>
              A little love letter
              <br /> to <span className="blues-accent">blue</span>
            </h2>
          </div>
          <a
            className="blues-action"
            href={designSystemPdf}
            download="blues design system.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <ArrowDownToLine aria-hidden="true" /> Download Design System
          </a>
        </section>
        <div className="case-columns">
          <ComicPanel>
            <span className="panel-label">The goal</span>
            <p>{bluesDetail.goal}</p>
          </ComicPanel>
          <ComicPanel>
            <span className="panel-label">Approach</span>
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
              A more <em>cohesive experience</em> , built to scale.
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
            <p className="chapter-label">The biggest challenge</p>
            <h2>
              Making <em className="blues-accent">music</em> part of the experience
              <br /> -without making it intrusive.
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
    <img
      className="blues-audio-widget"
      src={audioImage}
      alt="Blues audio interface: an expandable player with playback and volume controls"
      width={366}
      height={137}
    />
  );
}
