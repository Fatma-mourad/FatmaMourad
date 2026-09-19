import bluesImage from "@/assets/blues mockup.png";
import omnilorImage from "@/assets/omni 2.png";
import garlicImage from "@/assets/garlic.png";
import mintroImage from "@/assets/mintro.png";

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  duration: string;
  role: string;
  image: string;
  imageAlt: string;
  tone: "blue" | "coral" | "olive" | "lilac";
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  chapters: { eyebrow: string; title: string; accent: string; body?: string; items?: string[] }[];
};

export const projects: Project[] = [
  {
    slug: "blues",
    title: "Blues",
    category: "E-commerce · Design system",
    description:
      "A fashion e-commerce experience shaped around a distinct visual identity and scalable design system.",
    year: "2026",
    duration: "2 weeks",
    role: "Product designer",
    image: bluesImage,
    imageAlt: "Blues fashion e-commerce homepage displayed in a desktop browser",
    tone: "blue",
    challenge:
      "The goal was to create a minimalist, high-end e-commerce experience for a fictional fashion brand built around a monochromatic blue identity.",
    approach:
      "Combine typography, photography, motion, and ambient audio into one editorial fashion experience without making shopping feel complicated.",
    outcome:
      "A cohesive experience built to scale from a personal visual idea into a complete responsive product.",
    metrics: [
      { value: "01", label: "shared visual language" },
      { value: "02", label: "reusable interface system" },
      { value: "03", label: "responsive storefront" },
    ],
    chapters: [
      {
        eyebrow: "The process",
        title: "From a color idea to",
        accent: "a working store.",
        items: ["Define", "Direct", "Design", "Build"],
      },
      {
        eyebrow: "The biggest challenge",
        title: "Making music part of the experience",
        accent: "without making it intrusive.",
        body: "The player begins as a small, unobtrusive control and expands in place only when the shopper asks for it.",
      },
      {
        eyebrow: "Outcome",
        title: "From personal inspiration to a",
        accent: "working product.",
        items: [
          "Complete responsive experience",
          "Supporting design system",
          "Functional website",
          "Editorial brand identity",
        ],
      },
    ],
  },
  {
    slug: "omnilor",
    title: "Omnilor",
    category: "Safety · Dashboard",
    description:
      "A safety dashboard that helps teams understand locations, risks, and incidents through a clearer spatial interface.",
    year: "2026",
    duration: "8 weeks",
    role: "UI / UX intern",
    image: omnilorImage,
    imageAlt: "Omnilor map-based safety dashboard displayed on a laptop",
    tone: "blue",
    challenge:
      "Safety systems can hold a huge amount of information. The challenge was to help people understand what matters right now.",
    approach:
      "A transparent care journey that helps operators move from map overview to building detail without losing context.",
    outcome: "A clearer way to read a complex situation, built around context.",
    metrics: [
      { value: "01", label: "legible map overview" },
      { value: "02", label: "layered building detail" },
      { value: "03", label: "reusable safety system" },
    ],
    chapters: [
      {
        eyebrow: "The brief",
        title: "One dashboard.",
        accent: "A complete view.",
        items: [
          "Centralized overview",
          "Location-based information",
          "Operational interface",
          "Trustworthy experience",
        ],
      },
      {
        eyebrow: "Information hierarchy",
        title: "If everything is important,",
        accent: "nothing is.",
        body: "The person sees the overall situation first, then selects a location, surfaces only active alerts, and reveals building information on demand.",
      },
      {
        eyebrow: "The prototype",
        title: "Seeing the dashboard",
        accent: "live in motion.",
        items: ["Progressive disclosure", "Context preserved", "Reusable components"],
      },
    ],
  },
  {
    slug: "garlic",
    title: "Garlic",
    category: "Digital Solutions · Web Design",
    description:
      "A bilingual website turns a small business's digital presence into something clearer.",
    year: "2026",
    duration: "4 weeks",
    role: "Product designer",
    image: garlicImage,
    imageAlt: "Garlic bilingual digital studio website on two mobile phones",
    tone: "olive",
    challenge:
      "Digital agencies often use the same visual language and generic messaging. The challenge was a site that feels professional and trustworthy while staying approachable and distinctive.",
    approach:
      "Strong typography, generous spacing, clear content hierarchy, controlled visual elements, and consistent components across two reading directions.",
    outcome: "A digital solutions website with a clearer voice.",
    metrics: [
      { value: "01", label: "structured architecture" },
      { value: "02", label: "bilingual components" },
      { value: "03", label: "responsive experience" },
    ],
    chapters: [
      {
        eyebrow: "The brief",
        title: "Clear services.",
        accent: "A stronger first impression.",
        items: ["Communicate services", "Build trust", "Clarify the offer", "Arabic & English"],
      },
      {
        eyebrow: "Content architecture",
        title: "What a first-time visitor",
        accent: "needs, in order.",
        items: [
          "Main value proposition",
          "Services",
          "Solutions",
          "Supporting information",
          "Contact",
        ],
      },
      {
        eyebrow: "Bilingual design",
        title: "Designing for",
        accent: "two reading directions.",
        body: "English and Arabic layouts mirror direction, alignment, icon placement, line length, and spacing without losing the same identity.",
      },
    ],
  },
  {
    slug: "mintro",
    title: "Mintro",
    category: "Fintech · Product design",
    description:
      "A round-up savings app designed to make small, everyday saving feel simple and achievable.",
    year: "2026",
    duration: "3 months",
    role: "Product designer",
    image: mintroImage,
    imageAlt: "Mintro savings application displayed on a smartphone and smartwatch",
    tone: "lilac",
    challenge:
      "Saving sounds easy in theory, but building a consistent habit is hard—especially when the amounts are small.",
    approach:
      "Turn everyday spending into small progress through automatic round-ups, clear feedback, and a lightweight planning loop.",
    outcome: "A small habit with product potential.",
    metrics: [
      { value: "01", label: "automatic round-up savings" },
      { value: "02", label: "clear financial feedback" },
      { value: "03", label: "experience built on trust" },
    ],
    chapters: [
      {
        eyebrow: "The core idea",
        title: "Turn everyday spending into",
        accent: "small progress.",
        body: "The product rounds up everyday purchases and automatically transfers the difference toward a savings goal.",
      },
      {
        eyebrow: "The user journey",
        title: "Five small steps,",
        accent: "one habit.",
        items: ["Discover", "Connect", "Spend", "Save", "Track"],
      },
      {
        eyebrow: "Trust & transparency",
        title: "Simple doesn’t mean",
        accent: "unclear.",
        items: ["What was spent", "What was saved", "Where it went"],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
