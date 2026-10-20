import blues03 from "@/assets/blues-03.jpg";
import blues04 from "@/assets/blues-04.jpg";
import blues05 from "@/assets/blues-05.jpg";
import blues01 from "@/assets/blues-01.jpg";
import blues02 from "@/assets/blues-02.jpg";
import omnilorMockup from "@/assets/omnilor-mockup-01.jpg";
import fayeMockup from "@/assets/faye-mockup-01.jpg";
import fayePdf from "@/assets/FayeCaseStudy.pdf?url";
import { getProject } from "./portfolio-data";
import faye01 from "@/assets/faye-01.png";
import faye02 from "@/assets/faye-02.png";
import faye03 from "@/assets/faye-03.png";
import faye04 from "@/assets/faye-04.png";
import faye05 from "@/assets/faye-05.png";
import faye06 from "@/assets/faye-06.png";
import faye07 from "@/assets/faye-07.png";
import paylink from "@/assets/paylink.jpg";
import paylinkPoster from "@/assets/paylink-poster.jpg";
import paylink01 from "@/assets/paylink-01.png";
import paylink02 from "@/assets/paylink-02.png";
import paylink03 from "@/assets/paylink-03.png";
import paylink04 from "@/assets/paylink-04.png";
import paylink05 from "@/assets/paylink-05.png";
import paylink06 from "@/assets/paylink-06.png";
import paylinkPdf from "@/assets/PayLink Case Study.pdf?url";
import pulse from "@/assets/the-pulse.png";
import pulse02 from "@/assets/the-pulse-02.png";
import pulseMotion from "@/assets/the-pulse-motion.gif";
import kyc from "@/assets/kyc-onboarding.png";
import kyc01 from "@/assets/kyc-01.png";
import kyc02 from "@/assets/kyc-02.png";
import kyc03 from "@/assets/kyc-03.png";
import kyc04 from "@/assets/kyc-04.png";
import kyc05 from "@/assets/kyc-05.png";
import garlic01 from "@/assets/garlic-01.png";
import garlic02 from "@/assets/garlic-02.png";
import garlicPdf from "@/assets/GarLicCaseStudy.pdf?url";
import bluesPdf from "@/assets/blues design system.pdf?url";

export type WorkProject = {
  protected?: boolean;
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  images: { src: string; alt: string }[];
  tools?: string[];
  overview?: string;
  role?: string;
  challenge?: string;
  approach?: string;
  learned?: string;
  links?: { label: string; href: string }[];
};

function documented(
  slug: "garlic" | "blues",
  category: string,
  links: NonNullable<WorkProject["links"]>,
): Omit<WorkProject, "images"> {
  const project = getProject(slug);
  if (!project) throw new Error(`Missing project data for ${slug}`);
  return {
    slug,
    category,
    title: project.title,
    image: project.image,
    imageAlt: project.imageAlt,
    overview: project.description,
    role: project.role,
    challenge: project.challenge,
    approach: project.approach,
    links,
  };
}

// Optional fields stay absent until supporting case-study material is available.
export const selectedWork: WorkProject[] = [
  {
    slug: "paylink",
    title: "PayLink",
    role: "UI UX Design Intern",
    challenge:
      "Creating a cohesive identity for a payment-link product that communicates its value clearly to small businesses and independent professionals.",
    approach:
      "I explored the product's visual direction, built a consistent design system, and designed a landing page that communicates the product's value proposition through clear messaging and structured layouts.",
    learned:
      "I learned how payment links work and how businesses can use them to collect payments. I also gained practical experience in branding, design systems, and landing page design.",
    category: "Fintech / Product design",
    image: paylink,
    images: [
      { src: paylinkPoster, alt: "PayLink poster with yellow lettering over a dark portrait" },
      {
        src: paylink01,
        alt: "PayLink homepage with yellow chain imagery and payment-link introduction",
      },
      { src: paylink02, alt: "PayLink problem statement and payment friction overview" },
      { src: paylink03, alt: "PayLink three-step flow: create, share, collect" },
      { src: paylink04, alt: "PayLink interactive payment-link concept demo" },
      { src: paylink05, alt: "PayLink payment-links dashboard preview" },
      { src: paylink06, alt: "PayLink benefits: easy sharing, less friction, clearer workflow" },
    ],
    links: [
      { label: "Read Case Study", href: paylinkPdf },
      { label: "View Live Website", href: "https://fatma-mourad.github.io/PayLink/" },
    ],
    imageAlt: "PayLink brand cover with a yellow wordmark over a dramatically lit portrait",
    overview:
      "A B2B payment-link experience designed to simplify how small businesses collect payments.",
  },
  {
    slug: "faye",
    links: [
      { label: "View live", href: "https://faye-personal-portfolio.vercel.app/" },
      { label: "View case study", href: fayePdf },
    ],
    title: "Faye — Editorial Portfolio",
    category: "Editorial / Web design",
    role: "Art Direction, Editorial Design, UI Design, and Front-End Development.",
    challenge:
      "Creating a portfolio that feels like a thoughtfully designed publication rather than a conventional website, while keeping the experience intuitive and easy to navigate.",
    approach:
      "I designed Faye as an interactive digital magazine, combining editorial typography, monochromatic imagery, generous whitespace, and structured page layouts. I translated the familiar experience of turning magazine pages into a digital interaction using HTML, CSS, and JavaScript.",
    learned:
      "I learned how to translate an art direction concept into a cohesive digital experience, build editorial layouts for the web, and use front-end development to bring visual ideas to life. The project also helped me explore the balance between expressive design and usability.",
    image: fayeMockup,
    imageAlt: "Faye editorial portfolio displayed on a desktop monitor with keyboard and mouse",
    images: [
      { src: faye01, alt: "Faye product design journal cover with architectural photography" },
      { src: faye02, alt: "Faye introduction and perspective editorial spread" },
      { src: faye03, alt: "Faye selected work spread featuring Still and Vela" },
      { src: faye04, alt: "Faye Still wellbeing app case-study spread" },
      { src: faye05, alt: "Faye Vela finance dashboard case-study spread" },
      { src: faye06, alt: "Faye design capabilities and tools editorial spread" },
      { src: faye07, alt: "Faye closing notes and contact page" },
    ],
    overview:
      "An interactive digital magazine exploring product design through editorial storytelling.",
  },
  {
    ...documented("garlic", "Branding / Web design", [
      { label: "Read case study (PDF)", href: garlicPdf },
      { label: "View Live Website", href: "https://garlic-lake.vercel.app/" },
    ]),
    role: "Product Designer - Product Design and Case Study Development.",
    challenge:
      "Turning a product concept into a cohesive design experience and communicating the thinking behind the design decisions.",
    approach:
      "I developed the project concept, worked on the design, and documented the process in a case study to present the key decisions and the overall design direction.",
    learned:
      "I learned how to structure a product design case study, communicate design decisions, and present a project as a complete experience rather than a collection of screens.",
    images: [
      {
        src: garlic01,
        alt: "Garlic mobile website mockups showing project examples and the Why Garlic section",
      },
      {
        src: garlic02,
        alt: "Garlic mobile website mockups showing project examples and custom digital solutions",
      },
    ],
  },
  {
    slug: "kyc-onboarding",
    title: "KYC Onboarding",
    links: [
      {
        label: "Read case study",
        href: "https://www.behance.net/gallery/245889691/KYC-Onboarding",
      },
    ],
    role: "Product Designer",
    challenge:
      "Designing an onboarding experience that guides users through identity verification while keeping the process clear and easy to follow.",
    approach:
      "I explored the onboarding journey, focusing on verification steps, clear instructions, and helping users understand what information is required and what to do next.",
    learned:
      "I developed a better understanding of KYC processes, identity verification, and onboarding flows. I also learned how to approach compliance-related requirements as part of the user experience rather than treating them as isolated steps.",
    category: "Fintech / UX design",
    image: kyc,
    images: [
      { src: kyc01, alt: "KYC onboarding introduction and identity verification steps" },
      { src: kyc02, alt: "KYC ID photo instructions and document scanning" },
      { src: kyc03, alt: "KYC document photo review and submission" },
      { src: kyc04, alt: "KYC proof-of-address upload and verification progress" },
      { src: kyc05, alt: "KYC liveness selfie check and completion confirmation" },
    ],
    imageAlt:
      "Two mobile screens showing identity verification introduction and document verification steps",
    overview:
      "An onboarding experience focused on identity verification, clarity, and reducing user friction.",
  },
  {
    slug: "the-pulse",
    title: "The Pulse",
    category: "Fintech / Product design",
    role: "Product Designer - UI Design, Design System, and Motion Design.",
    challenge:
      "Making spending insights feel more intuitive and engaging by helping users understand the context behind their financial activity, rather than just viewing numbers and transactions.",
    approach:
      "I designed the UI and built a consistent design system to support the product's visual language. I also created an animated orbit that pulses and moves dynamically, adding a distinctive visual element to the experience.",
    learned:
      "I learned how to translate a product concept into a cohesive interface, build a reusable design system, and use motion to reinforce a product's identity and make financial insights more engaging.",
    links: [
      {
        label: "Read case study",
        href: "https://www.behance.net/gallery/246029687/Contextual-Spending-Insights",
      },
    ],
    image: pulse,
    images: [
      { src: pulse, alt: "The Pulse mobile interface on two phones" },
      { src: pulse02, alt: "The Pulse spending overview and contextual category insights screens" },
      {
        src: pulseMotion,
        alt: "The Pulse animated spending orbit pulsing around the budget overview",
      },
    ],
    imageAlt: "The Pulse mobile interface shown on two angled phones against a dark background",
  },
  {
    slug: "omnilor",
    title: "Omnilor",
    category: "SaaS / Dashboard design",
    image: omnilorMockup,
    imageAlt: "Omnilor safety dashboard displayed on a laptop against a dark background",
    images: [],
    protected: true,
  },
  {
    ...documented("blues", "E-commerce / Design system", [
      { label: "View Live Website", href: "https://fatma-mourad.github.io/Blues-Website/" },
      { label: "View design system (PDF)", href: bluesPdf },
    ]),
    role: "UI/UX Designer \u2014 E-commerce Design & Design System.",
    challenge:
      "Creating a cohesive e-commerce experience that reflects the brand's identity while keeping the shopping journey clear and intuitive.",
    approach:
      "I translated the brand's visual direction into a website interface and developed a reusable design system to maintain consistency across layouts, typography, colors, and UI components.",
    learned:
      "I learned how to connect brand identity with interface design, structure a reusable design system, and maintain visual consistency throughout an e-commerce experience.",
    images: [
      {
        src: blues01,
        alt: "Blues e-commerce homepage featuring blue fashion photography by the sea",
      },
      {
        src: blues02,
        alt: "Blues Depth of Field campaign editorial with coastal fashion photography",
      },
      { src: blues03, alt: "Blues Midnight Collection featured editorial and fashion portrait" },
      { src: blues04, alt: "Blues brand philosophy presented in expressive editorial typography" },
      { src: blues05, alt: "Blues Blue Edit product grid with clothing photography and prices" },
    ],
  },
];
