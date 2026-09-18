# Comic Portfolio Studio

Design and build a fully responsive interactive Product Designer portfolio website.

IMPORTANT:

This should NOT feel like a traditional marketing landing page.

The hero is the initial entry view, but the website is a complete portfolio experience with multiple sections/views that users actively navigate through using the navigation menu, buttons, and interactive UI elements.

The overall experience should feel like entering a hand-drawn comic book, while still looking sophisticated, intentional, and professional enough for a Product Designer portfolio.

VISUAL DIRECTION

Create a visual language inspired by hand-drawn animated comic/cartoon aesthetics, with the feeling of a 2D illustrated world.

Do NOT make it look like a generic cartoon website.

Do NOT use childish UI.

Do NOT make it look like a gaming website.

Keep the design minimal, editorial, clever, and design-forward.

Use:

- Hand-drawn black ink outlines

- Imperfect organic shapes

- Illustrated environmental elements

- Comic-book panel compositions

- Halftone / subtle print textures

- Speech bubbles

- Hand-drawn arrows

- Doodle accents

- Slightly irregular borders

- Offset shadows

- Layered paper/card effects

- Subtle grain / print texture

- Illustrated clouds, trees, buildings and small environmental details

- Playful but controlled visual rhythm

COLOR SYSTEM

Build the color palette around a muted comic-book palette rather than extremely saturated colors.

Primary colors:

- Soft dusty sky blue

- Warm off-white / paper white

- Deep ink black

Supporting accent colors:

- Muted coral / salmon

- Soft mustard yellow

- Olive / muted green

- Dusty orange

The colors should feel slightly printed and imperfect, similar to a vintage comic illustration.

Create the palette as reusable design tokens / CSS variables.

TYPOGRAPHY

Typography is a major part of the visual identity.

Use a bold hand-drawn comic-style display typeface for:

- Hero headline

- Section titles

- Large project titles

- Important labels

The display typography should have an energetic, hand-lettered, slightly imperfect appearance similar to animated comic title lettering.

For body copy and UI:

Use a highly readable modern sans-serif or monospace font to create contrast with the expressive display type.

Create a clear typography hierarchy:

Display / H1

H2

H3

Body

Small metadata

Navigation

Labels

Do not use the cartoon display font for long paragraphs.

LAYOUT

Use a responsive editorial grid rather than a generic centered website layout.

The hero should occupy approximately 100vh and act as the entrance to the portfolio.

After entering the site, users should be able to navigate between:

HOME

WORK

ABOUT

RESUME

CONTACT

The navigation should remain accessible throughout the experience.

NAVIGATION BEHAVIOR

Use a persistent navigation system.

Desktop:

- Minimal top navigation or floating navigation

- Clear active state

- Hand-drawn underline / indicator for the active section

- Small illustrated decorative details

Mobile:

- Compact menu button

- Animated menu drawer / overlay

- Clear active navigation state

Clicking navigation items should transition smoothly to the corresponding portfolio view/section.

Do not simply reload the page.

Use smooth page/view transitions and subtle motion.

HERO

The hero should feel like the first panel of a comic book.

Include:

- My name: Fatma Mourad

- Title: Product Designer

- Short positioning statement

- Primary CTA: View my work

- Secondary CTA: About me

The hero should contain an illustrated environment rather than a generic gradient background.

Use a large illustrated composition with:

- Sky

- Clouds

- Trees

- Small house/building elements

- Hand-drawn decorative objects

- Comic-style outlines

The environment should frame the typography rather than compete with it.

Add subtle ambient animation such as:

- Slow cloud movement

- Tiny floating elements

- Slight parallax

- Subtle texture movement

Keep animation lightweight and performant.

WORK SECTION

Create an interactive case-study archive rather than a generic project grid.

Projects should feel like comic panels / editorial cards.

Each project card should contain:

- Project title

- Category

- Short description

- Year

- Visual preview

- Small metadata

- CTA / View case study

Use hover interactions:

- Slight card movement

- Hand-drawn outline appearing

- Small arrow animation

- Image scale

- Accent color change

Clicking a project should open its case study as a dedicated view/state or route rather than simply jumping to a random section.

ABOUT

Create an illustrated About section.

Combine:

- Short introduction

- Skills

- Design philosophy

- Tools

- Small personal details

Use visual storytelling rather than a standard corporate About layout.

RESUME

Create a clean resume view that contrasts slightly with the playful visual system.

Use:

- Timeline

- Experience

- Education

- Skills

- Tools

Maintain the same comic-inspired visual language through borders, typography, icons and small illustrations.

CONTACT

Create a simple final interaction rather than a generic contact form.

Include:

- Email

- LinkedIn

- Behance

- GitHub

Add a playful illustrated closing scene.

INTERACTION DESIGN

The website should feel interactive and responsive.

Implement:

- Hover states

- Focus states

- Active states

- Press states

- Smooth transitions

- Scroll-triggered reveals

- Micro-interactions

- Subtle parallax

- Navigation transitions

- Button feedback

- Project card interactions

Motion should support the experience, not overwhelm it.

Use spring-like or slightly organic easing where appropriate, but keep the interface professional.

ACCESSIBILITY

Maintain strong accessibility despite the visual style.

Include:

- WCAG-conscious color contrast

- Keyboard navigation

- Visible focus states

- Semantic HTML

- Accessible buttons and navigation

- Reduced-motion support

- Responsive typography

- Mobile-first behavior

TECHNICAL DIRECTION

Build the interface using reusable components.

Create components for:

- Navigation

- Buttons

- Project cards

- Comic panels

- Speech bubbles

- Tags

- Section headers

- Illustrative decorations

- Case-study layouts

Use reusable design tokens for:

- Colors

- Typography

- Spacing

- Border widths

- Border radius

- Shadows

- Motion durations

Keep the code clean, modular, responsive, and easy to edit.

The final result should feel like:

"An actual Product Designer portfolio that happens to exist inside a hand-drawn comic world."

It should NOT feel like:

- A children's website

- A Nickelodeon fan website

- A generic portfolio template

- A marketing landing page

- A random collection of cartoon decorations

The visual identity should be coherent across the entire experience.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/582a1e22-cd40-4369-9f3f-f37c547ca8da).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
