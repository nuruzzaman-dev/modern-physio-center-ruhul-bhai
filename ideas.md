# Revised Design Direction — “চিকিৎসার নোটবুক”

## Why this revision is different

The previous version used a calm olive-and-cream editorial landing pattern. This revision moves to a **field-notes / humanist clinical journal** system: stronger color blocking, a left-side index rail, typographic labels, offset paper panels, horizontal problem navigation, an asymmetric gallery, and a treatment process that reads like a practical care pathway rather than a standard landing-page scroll.

## Color philosophy

The main canvas is **Linen `#F3EEE6`**, kept warm but less monochromatic than the previous cream. **Burnt Terracotta `#B85C45`** becomes the ownable action color, bringing human warmth and local character to appointment actions. **Ink Navy `#1F2B3A`** replaces forest charcoal for clinical readability and a sharper editorial contrast. Supporting tones are **Powder Blue `#C5D5D9`**, **Dusty Apricot `#E6B49E`**, and **Ochre `#C6943B`**. There are no blue healthcare gradients, neon accents, glass surfaces, or generic green medical cues.

The approximate balance is 50–60% linen and neutral space, 15–20% white paper surfaces, 10–15% ink navy, 8–12% terracotta, and 5–8% powder blue/apricot/ochre accents.

## Layout paradigm

Use a **vertical clinical index rail** on desktop and a compact section stamp on mobile. The page should feel like a well-organized treatment notebook: each major section gets a code, a short Bangla label, and a distinct composition. The hero is a full-width editorial cover with an image inset rather than a normal split-screen. Services become a horizontally navigable condition band. Trust features use a numbered paper strip. The rehab feature is a dark ink spread. Treatment becomes a plotted four-step pathway. Gallery uses a staggered masonry-like composition. Contact ends as a bold appointment desk panel with an embedded map fallback.

## Signature elements

The recurring visual language is a **terracotta care stamp**, **thin navy notebook rules**, **index numbers**, **small corner crop marks**, and **paper cards that look placed rather than uniformly rounded**. Rounded corners are used only for media and primary action controls; most informational blocks use square or lightly clipped edges.

## Typography system

Keep Noto Sans Bengali for readable content, but use a stronger typographic contrast: oversized ink navy display headings, terracotta italic emphasis, and compact uppercase-like Bangla section stamps. Body copy remains generous and calm. Avoid repeating the same large heading size in every section; use a mix of display, medium editorial, and compact utility levels.

## Motion system

Framer Motion handles the mobile drawer, problem-chip focus states, accordion, and paper-panel entrances. GSAP ScrollTrigger handles only the hero cover reveal, the treatment process line drawing, and one rehab image clip reveal. The route-line motif from the previous design is replaced by notebook rules and a plotted care-path line. All non-essential motion is disabled under reduced motion.

## Brand essence

**আপনার সমস্যাকে বুঝে, চলাফেরার পথে বাস্তব সহায়তা।**

Personality: **মানবিক, দায়িত্বশীল, স্পষ্ট**

## Brand voice

Headlines should sound like a clinician who explains clearly, not a marketer who promises outcomes. CTAs should be immediate and practical. Example lines: “সমস্যাটি বলুন, পরের পদক্ষেপটি বুঝে নিন।” and “আপনার সুবিধামতো সেবা সম্পর্কে জানতে ফোন করুন।”

## Wordmark and mark

Use a text-free **care-stamp symbol** built from a terracotta square stamp with a navy open joint-line inside. The wordmark is a two-line Bangla lockup with a small terracotta index number, making it feel like a local practice identity rather than a generic icon plus text.

## Non-negotiable content coverage

The revised page must include: hero, four trust indicators, ten problem chips, five reasons to choose the center, full conditions list, paralysis and rehabilitation explanation, exact physiotherapist profile, four-step treatment process, home physiotherapy conversion section, future video placeholder, centralized image configuration, asymmetric gallery, no-fake-testimonial placeholder, all seven FAQs, contact details, responsive map fallback, mobile sticky CTA, SEO metadata, accessible semantics, responsible medical wording, and explicit temporary-image labels.
