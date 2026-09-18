# Fatma Mourad — Comic-World Product Design Portfolio

## Overview
Build a responsive multi-view portfolio that feels like a sophisticated, hand-printed comic world rather than a marketing landing page. The experience will use persistent navigation, dedicated case-study pages, editorial layouts, original illustrated imagery, and restrained motion.

## Views and navigation
- Add persistent desktop navigation with a hand-drawn active indicator and a compact animated mobile menu.
- Create dedicated routes for Home, Work, About, Resume, and Contact so each view is shareable and transitions without full-page reloads.
- Make both hero actions route directly to Work and About.
- Add three dedicated case-study routes reached from the project archive.

## Visual system
- Define reusable paper, ink, dusty blue, coral, mustard, olive, and orange tokens in the global design system.
- Pair an expressive hand-lettered display face with a readable monospace/sans-serif UI face.
- Establish irregular ink borders, offset shadows, subtle halftone/grain treatments, paper layers, doodles, arrows, labels, and speech bubbles as reusable patterns.
- Use the generated landscape and project artwork as the visual foundation, with clear image framing and accessible alt text.

## Page composition
- **Home:** Full-viewport illustrated opening panel with Fatma Mourad, Product Designer, concise positioning, two actions, ambient clouds, and a visible cue toward selected work.
- **Work:** Interactive editorial archive with three varied comic-panel compositions, project metadata, image movement, arrow feedback, and strong focus states.
- **About:** Visual narrative combining an introduction, philosophy, capabilities, tools, and personal notes without a corporate biography layout.
- **Resume:** Cleaner editorial timeline for experience and education, supported by compact skill/tool groupings and comic-system details.
- **Contact:** Direct email and profile links inside a playful illustrated closing scene, without a generic contact form.
- **Case studies:** Individual story-driven pages with overview, role, constraints, process, decisions, outcomes, and navigation to adjacent projects.

## Interaction and accessibility
- Add lightweight route/view reveals, card movement, image scaling, animated arrows, cloud drift, and subtle parallax.
- Respect reduced-motion preferences and keep all content functional without animation.
- Provide semantic landmarks, keyboard navigation, visible focus treatment, descriptive labels, strong contrast, and mobile-friendly targets.
- Ensure layouts remain coherent from small phones through wide desktop screens.

## Technical details
- Build reusable navigation, button, panel, speech bubble, tag, section title, project card, illustration, and case-study components.
- Use TanStack Router links for in-app transitions and route-specific metadata for every public view.
- Keep project content in a shared typed data module so archive cards and case studies stay consistent.
- Verify the live portfolio at desktop and mobile sizes, including menus, links, case-study transitions, overflow, and runtime errors.
