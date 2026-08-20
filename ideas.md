# Design Direction — মডার্ন ফিজিওথেরাপি সেন্টার

## Three initial directions

### Theme Name: নীরব নিরাময়
Very Brief Intro: একটি শান্ত, সম্পাদকীয় স্বাস্থ্য-পরিচয় যেখানে উষ্ণ ক্রিম, অলিভ ও স্যান্ড রঙ রোগীকে স্বস্তি এবং বিশ্বাসের অনুভূতি দেয়।
Probability: 0.07

### Theme Name: চলনের রেখা
Very Brief Intro: শরীরের গতি, পুনর্বাসন এবং অগ্রগতিকে বাঁকানো রেখা, রিদমিক টাইপোগ্রাফি ও গতিশীল স্ক্রল-ভিজ্যুয়ালের মাধ্যমে প্রকাশ করা একটি আধুনিক দিক।
Probability: 0.04

### Theme Name: স্থানীয় আলো
Very Brief Intro: মুক্তাগাছার স্থানীয় পরিচয়কে প্রিমিয়াম ক্লিনিক্যাল ডিজাইনের সঙ্গে মিশিয়ে সহজ, মানবিক এবং পরিচিত একটি ডিজিটাল অভিজ্ঞতা।
Probability: 0.02

## Chosen direction: নীরব নিরাময়

### Design Movement
Contemporary editorial healthcare design with the restraint of Scandinavian interiors and the warmth of local print culture. The interface should feel composed, quiet and tactile rather than clinical-template or startup-like.

### Core Principles
1. **Trust through restraint:** generous whitespace, clear information hierarchy and no exaggerated claims.
2. **Human before institutional:** photography and copy should show care, presence and local accessibility.
3. **Editorial rhythm:** sections should vary in composition—profile, horizontal lists, timeline, FAQ and location—rather than repeating card grids.
4. **Motion with purpose:** animation should guide attention and reveal content, never compete with the patient's need for clarity.

### Color Philosophy
Warm Cream `#F5F1E8` is the primary canvas because it lowers visual tension and makes the clinic feel welcoming. Deep Olive `#39483A` carries trust and action without defaulting to medical blue. Forest Charcoal `#26352B` grounds high-contrast moments. Soft Sand `#E5DED0` and Muted Sage `#879887` add tactile variation sparingly, like paper and foliage in a calm treatment room.

### Layout Paradigm
Use an off-center editorial flow: a wide hero with a narrow text rail and image-led counterweight, staggered content blocks, horizontal service bands and a split location/footer composition. Avoid a page made from centered headline-plus-three-card modules.

### Signature Elements
- Thin olive route-lines and small numbered markers that suggest rehabilitation progress.
- Cream paper surfaces with subtle stone rules and offset image frames.
- A compact circular brand mark built from two offset arcs, symbolizing movement returning to balance.

### Interaction Philosophy
Interactions should feel like a calm hand guiding the patient. Buttons respond with a short press and lift, navigation highlights remain understated, and accordions open with measured ease. Important actions—calling, finding the location and requesting an appointment—should always remain obvious and reachable.

### Animation
Use Framer Motion for component entrances, mobile navigation and accordion state. Use GSAP with ScrollTrigger for a single restrained editorial reveal sequence and a gently drawing route-line motif. Prefer opacity, translate, clip-path and scale; avoid bouncing, heavy parallax, aggressive zoom and perpetual floating. Respect `prefers-reduced-motion` by disabling non-essential sequences.

### Typography System
Use `Noto Sans Bengali` for all visible text with generous line-height. Headlines should use 600–700 weight and tight but readable measure; supporting copy should use 400–500 weight and a max width of roughly 36–44 characters on mobile. Small labels use 500 weight with slight tracking and sentence-like capitalization in Bangla.

### Brand Essence
আপনার কাছেই নির্ভরযোগ্য ফিজিওথেরাপি ও পুনর্বাসন সেবা—মুক্তাগাছার মানুষদের জন্য যত্নশীল, আধুনিক ও দায়িত্বশীল চিকিৎসা-সহায়তা।

Personality: **শান্ত, যত্নশীল, নির্ভরযোগ্য**

### Brand Voice
Headlines are clear, warm and locally grounded. CTAs are direct without pressure. Microcopy answers the patient's next question instead of making broad promises.

Example lines:
- “চলাফেরার স্বাচ্ছন্দ্য ফিরে পাওয়ার পথে পাশে আছি।”
- “আপনার সমস্যাটি বলুন—সঠিক সেবার দিকে আপনাকে গাইড করব।”

### Wordmark & Logo
The mark is a bold, text-free circular symbol formed by two offset olive arcs and a small central opening, suggesting a joint in motion and a return to balance. The Bangla wordmark sits beside it in a calm, medium-weight lockup rather than a default bold treatment.

### Signature Brand Color
**Deep Olive `#39483A`** — the ownable color that connects clinical confidence with the grounded warmth of local care.

## Implementation reminders

Every edited component should reinforce the chosen direction. Keep visible copy 100% Bangla. Do not invent reviews, ratings, patient counts or testimonials. Treat all generated/stock imagery as illustrative temporary material, never as the actual clinic, therapist or patient. Keep hero and service imagery replaceable through named constants. Use GSAP and Framer Motion only where they improve hierarchy or comprehension.
