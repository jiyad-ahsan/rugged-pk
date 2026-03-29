# Rugged Guide Library — Complete Spec (v2)

> **Purpose of this document:** Context file for AI sessions tasked with writing Rugged guides and field cards. Contains everything needed to write, structure, and illustrate content without additional context.
> **Last updated:** 2026.03.28
> **Philosophy:** Rugged aims to be a survival encyclopedia. If someone opens the app in a crisis — any crisis, any location in Pakistan — the answer should be there. We are not just writing for urban Karachi apartment dwellers. We are writing for anyone who might need this.

---

## Task Tracker

> **How to use this:** When you complete a task, change `[ ]` to `[x]` and add the date and any notes. If a task is in progress, change to `[~]`. If you're an AI session, update this section before finishing so the next session knows where things stand.

### Infrastructure (do first)
- [ ] Finalize markdown rendering pipeline (guide.md → page.jsx) — needs frontmatter parser, MDX or remark/rehype setup
- [ ] Add `type` field ("guide" | "field-card") to frontmatter schema and update listing page to handle both content types
- [ ] Add new tags to `tagColor` object in listing page: `planning`, `resilience`, `environment`, `skills`
- [ ] Add Field Card visual treatment to listing page (badge, shorter card variant, different read time display)
- [ ] Create `/content/guides/` and `/content/field-cards/` directory structure
- [ ] Build "Related Field Cards" and "Parent Guide" cross-reference UI in guide detail page
- [ ] PWA/offline caching for guide content (flagged as Week 1-2 priority)

### Phase 1 — Main Guides (write in this order)
- [ ] **G1** The 30-Minute Window (`30-minute-window`) — ~14 min read
- [ ] **G2** Shelter in Place (`shelter-in-place`) — ~13 min read
- [ ] **G5** Trauma First Aid (`trauma-first-aid`) — ~18 min read
- [ ] **G4** Water When the Taps Stop (`water-when-taps-stop`) — ~10 min read
- [ ] **G3** Sattu, Chana, and Staying Fed (`sattu-chana-emergency-food`) — ~9 min read
- [ ] **G6** When the Towers Go Down (`towers-go-down`) — ~11 min read
- [ ] **G7** Your Go-Bag (`go-bag-guide`) — ~12 min read
- [ ] **G8** The Family Emergency Plan (`family-emergency-plan`) — ~15 min read

### Phase 1 — Voice & Quality Gate
- [ ] After G1-G3 are written, extract voice/tone reference examples and add to "Notes for AI Sessions" section below — these become the benchmark for all subsequent content
- [ ] Jiyad review and sign-off on voice for G1-G3 before continuing

### FC Phase A — Field Cards (launch alongside Phase 1 guides)
*These can be written by Sonnet sessions using this spec + completed Phase 1 guides as voice reference.*

**Medical:**
- [ ] FC9 Tourniquet (`fc-tourniquet`)
- [ ] FC10 Wound Disinfection (`fc-wound-disinfection`)
- [ ] FC11 Wound Packing (`fc-wound-packing`)
- [ ] FC13 Chest Seal (`fc-chest-seal`)
- [ ] FC15 Improvised Splint (`fc-splint`)
- [ ] FC32 Pressure Bandage (`fc-pressure-bandage`)
- [ ] FC37 Build a First Aid Kit (`fc-build-first-aid-kit`)
- [ ] FC40 ORS from Scratch (`fc-ors`)

**Skills & Essentials:**
- [ ] FC1 Go-Bag Packing Checklist (`fc-go-bag-packing`)
- [ ] FC2 Door Barricade (`fc-door-barricade`)
- [ ] FC3 Window Reinforcement (`fc-window-reinforce`)
- [ ] FC4 Starting a Fire Safely (`fc-start-fire`)
- [ ] FC5 Improvised Stove (`fc-improvised-stove`)
- [ ] FC6 Bleach Water Purification (`fc-bleach-purify`)
- [ ] FC8 Boiling Water for Safety (`fc-boil-purify`)
- [ ] FC12 Shutting Off Utilities (`fc-shutoff-utilities`)
- [ ] FC14_doc Document Go-Pouch (`fc-document-pouch`)
- [ ] FC18 Essential Knots (`fc-essential-knots`)
- [ ] FC19 No-Cook Emergency Meals (`fc-no-cook-meals`)
- [ ] FC27 Walkie-Talkie Quick Start (`fc-walkie-quickstart`)
- [ ] FC35 Blackout Curtains (`fc-blackout-curtains`)

### Phase 2 — Main Guides
- [ ] **G9** Your Street Is Your First Responder (`neighbourhood-cluster`)
- [ ] **G10** When the City Goes Dark (`extended-blackout`)
- [ ] **G11** Curfew: Day 1 to Day 7 (`surviving-a-curfew`)
- [ ] **G12** Protests, Roadblocks & Civil Unrest (`civil-unrest`)
- [ ] **G13** Your Medicine Cabinet for a Crisis (`crisis-medicine-kit`)
- [ ] **G14** Earthquake Ready (`earthquake-ready`)
- [ ] **G15** Monsoon & Flood Preparedness (`monsoon-floods`)
- [ ] **G16** Extreme Heat Survival (`extreme-heat`)

### FC Phase B — Field Cards
- [ ] FC7 SODIS (`fc-sodis`)
- [ ] FC14 Fireman's Carry (`fc-fireman-carry`)
- [ ] FC16 Improvised Stretcher (`fc-stretcher`)
- [ ] FC17 Fuel Siphoning (`fc-siphon-fuel`)
- [ ] FC20 Food Preservation (`fc-food-preservation`)
- [ ] FC22 Rainwater Collection (`fc-rainwater`)
- [ ] FC23 CPR Adult (`fc-cpr-adult`)
- [ ] FC24 CPR Child/Infant (`fc-cpr-child`)
- [ ] FC25 Choking Adult (`fc-choking-adult`)
- [ ] FC26 Choking Child/Infant (`fc-choking-child`)
- [ ] FC28 Burns (`fc-burns`)
- [ ] FC29 Snakebite (`fc-snakebite`)
- [ ] FC30 Shock (`fc-shock`)
- [ ] FC31 Recovery Position (`fc-recovery-position`)
- [ ] FC33 Arm Sling (`fc-sling`)
- [ ] FC39 Heatstroke Response (`fc-heatstroke-response`)
- [ ] FC41 Dehydration (`fc-dehydration`)
- [ ] FC42 Oil/Grease Fire (`fc-oil-fire`)
- [ ] FC43 Fire Types (`fc-fire-types`)
- [ ] FC44 Escape Building Fire (`fc-escape-fire`)
- [ ] FC46 Household Water Sources (`fc-household-water`)
- [ ] FC50 Food Safety Check (`fc-food-safety`)
- [ ] FC51 Tarp Shelter (`fc-tarp-shelter`)
- [ ] FC53 Securing Load to Vehicle (`fc-secure-load`)
- [ ] FC54 Flood Barriers (`fc-sandbag-alternatives`)
- [ ] FC60 Change Car Tyre (`fc-change-tyre`)
- [ ] FC61 Motorcycle Puncture (`fc-motorcycle-puncture`)
- [ ] FC62 Jump-Start Car (`fc-jumpstart`)
- [ ] FC65 Carrying a Child While Fleeing (`fc-carry-child-flee`)
- [ ] FC66 Emergency Phone Settings (`fc-phone-emergency-setup`)
- [ ] FC70 Crowd Escape (`fc-crowd-escape`)
- [ ] FC71 Cooling Without AC (`fc-wet-cooling`)
- [ ] FC72 Earthquake Positions (`fc-earthquake-position`)
- [ ] FC73 Flood Driving (`fc-flood-driving`)

### Phase 3 — Main Guides
- [ ] **G17** Keeping Kids Calm (`kids-in-crisis`)
- [ ] **G18** Financial Preparedness (`financial-preparedness`)
- [ ] **G19** Preparing Your Vehicle (`vehicle-preparedness`)
- [ ] **G20** Cooking Without Your Kitchen (`cooking-without-kitchen`)
- [ ] **G21** After the Crisis (`post-crisis-recovery`)
- [ ] **G22** Apartment vs House (`apartment-vs-house`)
- [ ] **G23** Digital Security (`digital-security-crisis`)
- [ ] **G24** Fire Safety in the Home (`home-fire-safety`)
- [ ] **G25** Elderly & Disabled Members (`elderly-disabled-preparedness`)

### FC Phase C — Field Cards (complete the encyclopedia)
- [ ] FC21 Sprouting (`fc-sprouting`)
- [ ] FC34 Eye Injury (`fc-eye-injury`)
- [ ] FC36 Scorpion Sting (`fc-scorpion-sting`)
- [ ] FC38 Emergency Childbirth (`fc-emergency-delivery`)
- [ ] FC45 Finding Water in the Wild (`fc-find-water`)
- [ ] FC47 Container Gardening (`fc-container-garden`)
- [ ] FC48 Basic Fishing (`fc-fishing-basics`)
- [ ] FC49 Cooking Without Utensils (`fc-cooking-no-utensils`)
- [ ] FC52 Rope from Fabric (`fc-rope-from-fabric`)
- [ ] FC55 Roof Patch (`fc-roof-patch`)
- [ ] FC56 Shelter from Nothing (`fc-emergency-shelter`)
- [ ] FC57 Direction Without Compass (`fc-direction-no-compass`)
- [ ] FC58 Signal for Rescue (`fc-signal-for-rescue`)
- [ ] FC59 Reading a Map (`fc-read-map`)
- [ ] FC63 Push-Start Vehicle (`fc-push-start`)
- [ ] FC64 Descend a Building (`fc-descend-building`)
- [ ] FC67 VPN Setup (`fc-vpn-setup`)
- [ ] FC68 Encrypted Messaging (`fc-encrypted-messaging`)
- [ ] FC69 Break Car Window (`fc-break-car-window`)
- [ ] FC74 Sterilizing Containers (`fc-clean-drinking-vessel`)
- [ ] FC75 Night Movement (`fc-night-movement`)
- [ ] FC76 Improvised Tools (`fc-improvised-tools`)

### Illustrations
- [ ] Create new Sketch components: `SketchPlan`, `SketchPower`, `SketchClock`, `SketchBarricade`, `SketchPills`, `SketchQuake`, `SketchFlood`, `SketchSun`, `SketchFamily`, `SketchCash`, `SketchVehicle`, `SketchStove`, `SketchSunrise`, `SketchLock`, `SketchFire`, `SketchElderly`, `SketchKnot`, `SketchCompass`
- [ ] Commission or generate inline illustrations for completed guides (ongoing as guides are written)
- [ ] Commission or generate step illustrations for completed field cards (ongoing)

### Review & Quality
- [ ] Technical accuracy review: all medical field cards reviewed against current first aid standards
- [ ] Pakistan-specific fact check: prices, brand availability, hospital names, phone numbers, locations
- [ ] Walkie-talkie range claims verified against real Karachi urban testing (not manufacturer specs)
- [ ] All food shelf-life claims verified for 40°C+ storage conditions

---

## What Is Rugged

Rugged (rugged.pk) is Pakistan's first consumer preparedness brand. It sells emergency kits and publishes free survival guides targeting Pakistani families — primarily urban middle-class in Karachi, but the content must be useful nationwide and across scenarios.

**Primary positioning:** Geopolitical and conflict anxiety (India-Pakistan tensions, Afghanistan border, Balochistan insurgency, domestic political instability, Middle East spillover). This is the MAIN hook — not natural disasters.

**Secondary positioning:** Natural disaster preparedness (earthquakes, monsoon flooding, extreme heat).

**Tertiary positioning:** Comprehensive survival reference — the app you trust because it has everything, not just the basics.

**Brand tone:** Direct, serious, distinctly Pakistani. NOT imported Western survival culture. NOT tactical/military fetishism. NOT preachy NGO-speak. Think: a sharp, well-read older cousin who's actually been through a curfew telling you what to do.

**The founder (Jiyad)** is a relatively new father. This personal motivation appears in community content but should not dominate guide voice.

---

## Two Content Types

### 1. Main Guides
Full narrative guides. 8-18 minute reads. Open with a scenario, have multiple sections, include inline and full-width illustrations. These teach you how to think about a situation — they give context, decision frameworks, and comprehensive coverage of a topic.

### 2. Field Cards
Short, single-skill reference cards. 2-4 minute reads. Mostly visual — 70% illustration, 30% text. Designed to be printed on a single page and kept in a go-bag or taped to a wall. These teach you how to do one specific thing, right now, when you don't have time to read.

**The relationship:** Guides reference Field Cards ("for step-by-step tourniquet application, see the Tourniquet Field Card"). Field Cards reference parent Guides ("for more context, read *Trauma First Aid*"). A user might read the Guide at home on a Tuesday night. They'll pull up the Field Card when their hands are shaking and someone is bleeding.

Both types appear in the same listing page but Field Cards are visually distinct (shorter cards, "field card" badge, different read time expectations).

---

## Technical Setup

- Both types are **markdown files** (`.md`)
- Rendered through Next.js at `app/guides/[slug]/page.jsx`
- Metadata: `slug`, `title`, `subtitle`, `tag`, `date`, `readTime`, `sketch`, `sections`, `type` ("guide" or "field-card"), `relatedGuides` (array of slugs), `relatedCards` (array of slugs)
- Listing page supports search across titles, subtitles, excerpts, tags, section names
- All content downloadable for offline access — the moment you need this is the moment the internet might not be there
- Field Cards should be especially optimised for offline/PWA caching — small file sizes, embedded SVGs where possible

---

## Writing Rules

### Voice & Tone (Both Types)
- Second person ("you"), present tense for instructions
- Short paragraphs. Punchy sentences. No fluff.
- Casual but not jokey — this is life-or-death content delivered without drama
- Pakistani English naturally. "Torch" not "flashlight." "Petrol" not "gas." "Mobile" not "cell phone."
- Urdu/local terms where natural: chana, sattu, roti, paratha, tanker, UPS, loadshedding, sui gas. No need to explain — the audience lives here.
- Numbers: Rs. (rupees), km, litres, kg, °C.
- DO NOT write like an AI. No "In this comprehensive guide..." No "It's important to note..." No excessive dashes. No structured filler.

### Structure — Main Guides
- Opens with a **scenario** — drops the reader into the situation
- Brief "what this guide covers" line (1-2 sentences, not a bulleted TOC)
- Sections with clear headings, each actionable
- Closes with a short, grounding human beat — not a summary, not a CTA
- Include **specific products** (brands available in Pakistan, PKR prices, where to buy)
- Include **specific quantities** (litres, calories, rupee denominations, walkie-talkie channels)
- Cross-reference related guides and field cards

### Structure — Field Cards
- Opens with: **"Use this when:"** — one line describing the situation
- Then **numbered steps** with an illustration for each step (or every other step minimum)
- Each step: 1-3 sentences max
- Ends with **"Don't"** callout box — common mistakes
- Total: 300-600 words (illustrations carry the load)
- Cross-references parent guide: "For more context, read [Guide Name]"

### Technical Accuracy
- **Walkie-talkie ranges:** 1-2km standard, 2-3km long-range for urban Karachi. NEVER manufacturer open-field specs.
- **Solar panels:** "daytime recharge in direct sun" — not "indefinite charge"
- **Kit descriptions:** Lead with capability specs (meals/calories, water volume, component counts)
- **Power banks:** Unbranded Chinese power banks explicitly excluded
- **Food:** Pakistan-specific items (sattu, chana, dates, rusks, glucose biscuits). NOT MREs, NOT freeze-dried Western meals.
- **Medical:** Always framed as "until professional help arrives." Never suggest replacing medical care.
- **Never recommend cauterization** — causes tissue damage, increases infection risk, not legitimate civilian field medicine.

---

## Tag System

| Tag | Color (light/dark) | Used by |
|-----|---------------------|---------|
| `essentials` | rugged-500 / rugged-400 | Core survival: evacuation, shelter-in-place, curfews |
| `food & water` | cyan-700 / cyan-400 | Food, water purification, storage, rationing, foraging |
| `comms` | amber-800 / amber-500 | Communication when networks fail |
| `community` | emerald-700 / emerald-400 | Neighbourhood coordination, mutual aid |
| `medical` | rose-700 / rose-400 | First aid, trauma, medical preparedness |
| `planning` | violet-700 / violet-400 | Family plans, financial prep, vehicle readiness |
| `resilience` | sky-700 / sky-400 | Psychological preparedness, kids, recovery |
| `environment` | teal-700 / teal-400 | Earthquakes, floods, heatwaves, monsoon |
| `skills` | stone-700 / stone-400 | Practical hands-on skills — knots, fire, shelter-building, navigation |

---

## Illustration Approach

### Style
- Black ink line drawings on off-white/cream background (Rugged's paper texture aesthetic)
- Field manual style — clear, labelled, functional. Not polished vector art.
- Labels in IBM Plex Mono or handwritten-style
- Think: what you'd sketch on the back of an envelope to explain something

### Types
1. **Inline sketches** — Small (80x80px), next to step text. One concept per sketch.
2. **Full-width illustrations** — Wider diagrams: floor plans, flow charts, comparison charts.
3. **Hero sketch** — One per piece, shown on listing card and header.
4. **Step illustrations** (Field Cards) — Numbered sequential drawings, one per step. Primary content of a field card.

### Technical
- SVG preferred, PNG fallback
- Stored: `/content/guides/[slug]/images/` or `/content/field-cards/[slug]/images/`
- Every illustration gets alt-text
- Hero sketches map to React components in `@/components/Sketches`

---

## MAIN GUIDES

### PHASE 1 — Launch Essentials (8 guides)
*Sell the kits, establish credibility, immediately actionable.*

---

#### G1. The 30-Minute Window
- **Slug:** `30-minute-window`
- **Subtitle:** A Family Evacuation Plan You Can Build Tonight
- **Tag:** `essentials` · **Read time:** ~14 min · **Sketch:** `backpack`
- **Sections:** Rally points · Vehicle prep · Grab bag checklist · Communication tree
- **Opening scenario:** A border escalation hits the news. Your wife calls. You have maybe 30 minutes before the roads clog. Where do you go? What do you grab? Who do you call first?
- **Core content:**
  - Why 30 minutes is the realistic window before Karachi roads become unusable
  - 2-3 family rally points (primary, secondary, out-of-city) with Karachi-specific examples
  - Vehicle prep: never-below-half fuel policy, car kit, motorcycle considerations
  - The grab bag: exactly what goes in, packed by the front door
  - Communication tree: you call 3, each calls 3 — 12 informed in 2 minutes
  - Pre-agreed walkie-talkie backup channel
  - Documents: CNIC, passport, property papers, medical records (physical copies)
  - Cash: Rs. 500 and Rs. 1000 notes, not Rs. 5000
- **Related Field Cards:** FC1, FC14, FC17
- **Illustrations:** Grab bag layout, communication tree, fuel gauge marker, document pouch, rally point criteria

---

#### G2. Shelter in Place
- **Slug:** `shelter-in-place`
- **Subtitle:** When Leaving Isn't an Option
- **Tag:** `essentials` · **Read time:** ~13 min · **Sketch:** `shelter`
- **Sections:** Home hardening · Resource management · Information gathering · Decision framework
- **Opening scenario:** Gunfire in the distance. News says curfew imposed, effective immediately. The roads are already blocked. You're not going anywhere — so now what?
- **Core content:**
  - Door reinforcement, window covering, entry point priorities
  - Safe room selection: interior, away from exterior walls/windows, lower floor
  - Light discipline, noise discipline
  - Resource inventory: water, food, medicine, batteries, cash — what do you have right now?
  - UPS runtime, device charging priorities, phone battery conservation
  - Information sources: radio frequencies, trusted news, social media verification
  - Decision framework: when "shelter" becomes "we need to leave" — specific triggers
  - Waste management when services stop
- **Related Field Cards:** FC2, FC3, FC12, FC35
- **Illustrations:** Apartment floor plan with safe zones, door barricade, window reinforcement, resource checklist, stay-vs-go flowchart

---

#### G3. Sattu, Chana, and Staying Fed
- **Slug:** `sattu-chana-emergency-food`
- **Subtitle:** When the Supply Chain Breaks
- **Tag:** `food & water` · **Read time:** ~9 min · **Sketch:** `food`
- **Sections:** Why local foods win · Sourcing guide · Storage in heat · Calorie planning
- **Opening scenario:** Day three of a curfew. The fridge stopped being useful on day one. The kids are hungry and you're rationing whatever was in the pantry. Except you planned for this.
- **Core content:**
  - Why Western emergency food advice is useless here
  - Pakistan's emergency food advantages: sattu, roasted chana, dried dates/apricots, rusks, glucose biscuits, gur
  - Sattu deep dive: no Western equivalent, mixes with water, calorie-dense, dirt cheap
  - Calorie planning: ~2000 cal/day sedentary adult, table for family of 4
  - Storage in 40°C+ heat, rotation schedule
  - Sourcing: bulk from local markets, approximate PKR costs
  - No-cook meal combinations
  - Cooking without sui gas: portable stoves, fuel tablets (ventilation warnings)
- **Related Field Cards:** FC4, FC5, FC19, FC20, FC21
- **Illustrations:** Calorie density comparison, no-cook assembly, storage containers, rationing timeline

---

#### G4. Water When the Taps Stop
- **Slug:** `water-when-taps-stop`
- **Subtitle:** Purification, Storage, and Rationing for Karachi
- **Tag:** `food & water` · **Read time:** ~10 min · **Sketch:** `water`
- **Sections:** Daily water needs · Purification methods · Storage in heat · Rationing protocol
- **Opening scenario:** The tanker didn't come today. It's not coming tomorrow either. Your overhead tank has maybe 200 litres left and there are five people in the house. That's not as much time as you think.
- **Core content:**
  - Karachi's fragile water system: tanker dependency, K-Electric pumps, Hub Dam
  - Daily needs: 3-4 litres/person for drinking. Family of 4 = 12-16 litres/day minimum
  - Storage: overhead tank awareness, food-grade jerry cans, bathtub as first response
  - Purification ranked: rolling boil, Aquatabs, bleach method, LifeStraw/filters (Daraz prices), SODIS
  - Tanker vs tap vs bottled: what's safe, what needs treatment
  - Rationing protocol for unknown duration
  - Dehydration recognition in children and elderly
- **Related Field Cards:** FC6, FC7, FC8, FC22
- **Illustrations:** Purification comparison, storage stacking, daily needs visual, chlorine dosage, dehydration chart

---

#### G5. Trauma First Aid
- **Slug:** `trauma-first-aid`
- **Subtitle:** What to Do Before the Ambulance That Isn't Coming
- **Tag:** `medical` · **Read time:** ~18 min · **Sketch:** `medical`
- **Sections:** Tourniquet basics · Wound packing · Chest seal · Shock management
- **Opening scenario:** Someone is bleeding — badly. You've called 1122 but the line is busy, or they said 45 minutes, or nobody answered. The blood is soaking through whatever you've pressed against it. You have what's in this room and what's in your head. Right now, the second one matters more.
- **Core content:**
  - Framed as "until professional help arrives" — not a substitute for medical care
  - Scene safety first
  - Tourniquet: when, how (step by step), timing, improvised from belts/fabric
  - Wound packing: for torso/neck/groin wounds. Gauze into cavity, pressure
  - Chest seal: recognizing chest wound, improvised from plastic wrap + tape
  - Shock: recognition (pale, cold, rapid pulse), positioning, body temperature
  - What NOT to do: don't remove embedded objects, no tourniquet on neck/torso
  - Basic triage: who needs help first
  - Local hospitals: Aga Khan, South City, Jinnah. Rescue 1122.
- **Related Field Cards:** FC9, FC10, FC11, FC13, FC15, FC16, FC23, FC24, FC25, FC26, FC30
- **Illustrations:** Tourniquet 4-panel, wound packing cross-section, pressure points, chest seal, shock position, triage flowchart

---

#### G6. When the Towers Go Down
- **Slug:** `towers-go-down`
- **Subtitle:** Emergency Comms for Pakistani Families
- **Tag:** `comms` · **Read time:** ~11 min · **Sketch:** `radio`
- **Sections:** Walkie-talkie basics · Channel planning · Family check-in protocol · Mesh networks
- **Opening scenario:** February 2024. The government shut down mobile internet for "security reasons." Millions couldn't reach their families. It lasted days. It will happen again.
- **Core content:**
  - Why networks fail: overload, government shutdown (2024 precedent), damage, power failure
  - Walkie-talkies: Baofeng UV-5R (budget), Motorola Talkabout (simple). PKR prices, where to buy.
  - REALISTIC urban ranges: 1-2km standard, 2-3km long-range. Never trust 10km+ claims.
  - Channel planning, radio etiquette
  - Check-in protocol: hourly for 3 hours, then every 3 hours. Pre-agreed phrases.
  - Offline messaging: Bridgefy, Briar
  - FM radio frequencies for Pakistan news
  - Mesh networking (advanced)
- **Related Field Cards:** FC27
- **Illustrations:** Walkie-talkie operation, communication tree, urban range reality, check-in template, channel assignment card

---

#### G7. Your Go-Bag
- **Slug:** `go-bag-guide`
- **Subtitle:** Pack It Tonight, Forget It Exists Until You Can't
- **Tag:** `planning` · **Read time:** ~12 min · **Sketch:** `backpack`
- **Sections:** What goes in · Weight limits · Seasonal adjustments · Kids' bags · Maintenance
- **Opening scenario:** You will not have time to pack when it matters. You'll be shaking, your kids will be crying, your wife will be on the phone with her mother, and you'll forget half the important stuff. Pack it now. Put it by the door. Check it every 3 months.
- **Core content:**
  - Individual (72hr): documents, cash, water purification, 3-day food, torch, batteries, first aid, charger, meds, clothes
  - Family additions: kids' needs, larger water capacity, family documents pouch
  - Weight: 7-10kg max individual (you're also carrying a child)
  - Seasonal: summer (extra water, electrolytes) vs winter (warm layer, emergency blanket)
  - Kids' bags: age 5+, snacks, water bottle, comfort item, ID card with parent's number, torch
  - Cash: Rs. 50,000 mixed denominations, waterproof, split between bags
  - Quarterly maintenance: rotate food, check batteries, update documents
  - What NOT to pack: sentimental items, too many clothes, untested gear
- **Related Field Cards:** FC1, FC14, FC17, FC18
- **Illustrations:** Bag exploded view, weight distribution, kids' bag, maintenance calendar, cash split

---

#### G8. The Family Emergency Plan
- **Slug:** `family-emergency-plan`
- **Subtitle:** A One-Page Agreement That Could Save Your Family
- **Tag:** `planning` · **Read time:** ~15 min · **Sketch:** NEW `SketchPlan`
- **Sections:** Meeting points · Contact chain · Document prep · Roles & responsibilities · The rehearsal
- **Opening scenario:** If something happened while your family was scattered — you at work, wife at home, kids at school, parents across town — does everyone know what to do? Where to meet? Who to call? If the answer is "we'd figure it out," that's not a plan.
- **Core content:**
  - One-page family plan: lives in every bag, wallet, and on the fridge
  - Meeting points: primary (home), secondary (walking distance landmark), tertiary (out-of-neighbourhood)
  - Contact chain: 3-person rule, out-of-city relay contact
  - Documents: photocopy, digitise, encrypted USB, cloud backup with 2FA
  - Pakistani family considerations: joint families, domestic staff, elderly parents
  - Pre-assigned roles: who grabs bag, who gets kids, who handles vehicle, who calls family
  - School pickup protocol with alternate authorized persons
  - The rehearsal: walk through it once as a family exercise
  - Printable one-page template
- **Related Field Cards:** FC14, FC27
- **Illustrations:** Family plan template, meeting point criteria, contact chain, document priority list

---

### PHASE 2 — Depth & Community (8 guides)
*Build trust, fill gaps, support forum/community layer.*

---

#### G9. Your Street Is Your First Responder
- **Slug:** `neighbourhood-cluster`
- **Subtitle:** Building a Neighbourhood Cluster
- **Tag:** `community` · **Read time:** ~16 min · **Sketch:** `houses`
- **Sections:** Starting the conversation · Skills mapping · Communication setup · Mutual aid agreements
- **Opening scenario:** In 2023's Karachi rains, it wasn't the government. It wasn't Edhi. It was the uncle three houses down with a generator and a pump. Your neighbours are your first responders — but only if you've talked to them before the emergency.
- **Core content:** Why mohalla culture already works, how to start without sounding paranoid, skills mapping (medical, generator, vehicle, tools), shared resources agreements, WhatsApp group setup (broadcast vs group), mutual aid agreements, collective security during curfews, cluster size (3-5 households)

---

#### G10. When the City Goes Dark
- **Slug:** `extended-blackout`
- **Subtitle:** Beyond Loadshedding — Multi-Day Power Failure
- **Tag:** `essentials` · **Read time:** ~12 min · **Sketch:** NEW `SketchPower`
- **Sections:** UPS reality check · Device priorities · Food preservation · Generator basics
- **Opening scenario:** Loadshedding you're used to. But what happens when the power goes out and doesn't come back for two days? Your UPS has maybe 4-6 hours. Then what?
- **Core content:** UPS runtime reality, device charging priority (phone > torch > everything else), power bank tiers (AA → branded power bank → solar hybrid), food preservation without fridge, generator safety (NEVER indoors — CO kills), solar reality (charges phones, not fridges), candle fire safety, modem/router uselessness when ISP backbone is down

---

#### G11. Curfew: Day 1 to Day 7
- **Slug:** `surviving-a-curfew`
- **Subtitle:** A Day-by-Day Guide to Staying Home When You Have To
- **Tag:** `essentials` · **Read time:** ~14 min · **Sketch:** NEW `SketchClock`
- **Sections:** Day 1 triage · Rationing framework · Kids & routine · Information discipline · When to break curfew
- **Opening scenario:** Indefinite curfew. Section 144 imposed. Shoot on sight after dark. It's happened before in this country. It'll happen again.
- **Core content:** Day 1 inventory, rationing framework by family size, daily routine for kids (structure prevents panic), information discipline (3x/day checks, one "information officer"), boredom management, when to break curfew (medical emergency, water depletion, direct threat), interacting with security forces

---

#### G12. Protests, Roadblocks & Civil Unrest
- **Slug:** `civil-unrest`
- **Subtitle:** Reading the Room When the Streets Aren't Safe
- **Tag:** `essentials` · **Read time:** ~10 min · **Sketch:** NEW `SketchBarricade`
- **Sections:** Situational awareness · Vehicle protocol · Caught in a crowd · Keeping kids safe
- **Opening scenario:** You're driving home from work. Traffic's stopped. Smoke ahead, shouting. WhatsApp says there's a dharna at the intersection. You've got your 4-year-old in the back seat.
- **Core content:** Reading escalation signs (burning tyres, stone-throwing, tear gas), vehicle protocol near roadblocks, on-foot crowd escape (edges, don't fight flow, find a building), tear gas basics (wet cloth, upwind), don't photograph unless you understand the risk, alternate routes, at-home shelter-in-place activation

---

#### G13. Your Medicine Cabinet for a Crisis
- **Slug:** `crisis-medicine-kit`
- **Subtitle:** What to Stock, Where to Buy It, How to Store It
- **Tag:** `medical` · **Read time:** ~11 min · **Sketch:** NEW `SketchPills`
- **Sections:** Essential medications · Pharmacy guide · Heat storage · Prescription planning
- **Opening scenario:** Pharmacies close during curfews. Supply chains break during floods. That one medicine your mother takes every morning — do you have a 2-week supply right now?
- **Core content:** OTC essentials (paracetamol, ibuprofen, ORS, antihistamines, Pyodine, bandages, gauze), prescription buffer strategy, Pakistan pharmacy reality (Dvago, Servaid vs neighbourhood stores), heat storage (30°C+ degrades medications), antibiotics guidance, children's dosage charts, quarterly expiry checks

---

#### G14. Earthquake Ready
- **Slug:** `earthquake-ready`
- **Subtitle:** Karachi Is on a Fault Line and Nobody Talks About It
- **Tag:** `environment` · **Read time:** ~12 min · **Sketch:** NEW `SketchQuake`
- **Sections:** Karachi's seismic risk · During the shaking · After the quake · Building assessment
- **Opening scenario:** October 2005. 7.6 magnitude killed over 70,000 in northern Pakistan. Karachi felt it. Karachi hasn't had its own major quake in recent memory — which doesn't mean it won't.
- **Core content:** Fault lines, soil liquefaction in reclaimed areas, drop-cover-hold without sturdy desks (almari, charpai, kitchen alternatives), what falls (ceiling fans, almaris, TVs, water tanks), post-quake gas check, structural damage indicators (diagonal cracks = bad), aftershock awareness, if trapped (tap pipes, don't shout)

---

#### G15. Monsoon & Flood Preparedness
- **Slug:** `monsoon-floods`
- **Subtitle:** When Karachi's Drains Give Up
- **Tag:** `environment` · **Read time:** ~10 min · **Sketch:** NEW `SketchFlood`
- **Sections:** Flood risk mapping · Protecting your home · Vehicle decisions · After the water
- **Opening scenario:** August monsoon. Rain at 2 PM. Street is a river by 5 PM. Water at your doorstep by 8 PM. This happens every year. Every year, people are caught off guard.
- **Core content:** Karachi drainage reality, known flood areas (Gulshan, Surjani, Orangi, Korangi, Landhi, FB Area underpasses), home protection (elevate electronics/documents, sandbag alternatives), vehicle depth limits (mid-tyre max, motorcycles worse), electrical safety (kill main breaker — electrocution kills every monsoon), flood water is sewage (disease risk), post-flood mould/mosquito/electrical checks

---

#### G16. Extreme Heat Survival
- **Slug:** `extreme-heat`
- **Subtitle:** When 45°C Meets 16 Hours of Loadshedding
- **Tag:** `environment` · **Read time:** ~9 min · **Sketch:** NEW `SketchSun`
- **Sections:** Heatstroke recognition · Cooling without AC · Hydration · Protecting the vulnerable
- **Opening scenario:** June 2015. A heatwave killed over 1,200 people in Karachi in five days. Most died because they didn't recognize the symptoms, didn't hydrate properly, or couldn't cool down during extended power cuts.
- **Core content:** Heatstroke vs heat exhaustion (key: heatstroke = NO sweating, confusion, hot dry skin = EMERGENCY), cooling without AC (wet towels on neck/wrists, cross-ventilation, wet curtains, cold water on feet), hydration beyond water (ORS, nimbu pani with salt, lassi, 4-5 litres minimum), vulnerable populations (elderly, infants, pregnant women), collapse response, power outage during heatwave (prioritize cooling over everything), wet sheet sleeping technique

---

### PHASE 3 — Comprehensive Library (9 guides)
*Complete the picture. Driven by community feedback and seasonal relevance.*

---

#### G17. Keeping Kids Calm When You're Not
- **Slug:** `kids-in-crisis`
- **Subtitle:** Age-by-Age Guide to Helping Children Through Emergencies
- **Tag:** `resilience` · **Read time:** ~12 min · **Sketch:** NEW `SketchFamily`
- **Sections:** Age-appropriate communication · Routines that help · Signs of distress · Activities during lockdown
- **Core content:** How kids process fear by age (toddlers, school-age, teens), what to say and what NOT to say, structure as medicine (mealtimes, storytime, play), distress signs (regression, sleep changes, clinginess, aggression), screen-free activities, managing your own anxiety, post-crisis: when to worry, when to seek help

---

#### G18. Financial Preparedness
- **Slug:** `financial-preparedness`
- **Subtitle:** Money Moves Before the Crisis Hits
- **Tag:** `planning` · **Read time:** ~8 min · **Sketch:** NEW `SketchCash`
- **Sections:** Cash reserves · Bank access · Document protection · Digital wallets
- **Core content:** Cash is king (ATMs offline, digital needs internet), 2-week family expenses minimum, small denominations (Rs. 100, 500, 1000), multi-bank strategy, JazzCash/Easypaisa as mobile backup, financial document copies and digital backups

---

#### G19. Preparing Your Vehicle
- **Slug:** `vehicle-preparedness`
- **Subtitle:** Your Car or Bike Might Be Your Lifeline
- **Tag:** `planning` · **Read time:** ~9 min · **Sketch:** NEW `SketchVehicle`
- **Sections:** Fuel discipline · Vehicle emergency kit · Motorcycle section · Basic maintenance
- **Core content:** Half-tank rule, vehicle kit (torch, jumper cables, toolkit, first aid, water, tyre repair), motorcycle-specific section (more Pakistanis ride bikes than drive cars), monthly checks (tyre pressure, coolant, oil, battery), safe fuel storage (metal jerry can, NOT plastic), parking facing out

---

#### G20. Cooking Without Your Kitchen
- **Slug:** `cooking-without-kitchen`
- **Subtitle:** Hot Chai When Everything Else Has Gone Cold
- **Tag:** `food & water` · **Read time:** ~8 min · **Sketch:** NEW `SketchStove`
- **Sections:** Portable stove options · Safe indoor fuel use · No-cook alternatives · Feeding kids
- **Core content:** When sui gas dies, portable gas stoves (PKR prices, where to buy), solid fuel tablets, charcoal OUTDOOR ONLY (CO kills), ventilation requirements, making chai (morale matters), no-cook Pakistani meals (sattu drinks, chana chaat, rusk with powdered milk), feeding kids during stress (calories first, nutrition later)

---

#### G21. After the Crisis
- **Slug:** `post-crisis-recovery`
- **Subtitle:** The First 48 Hours Back to Normal
- **Tag:** `resilience` · **Read time:** ~10 min · **Sketch:** NEW `SketchSunrise`
- **Sections:** Home safety check · Restocking priorities · Processing what happened · When to get help
- **Core content:** Structural/water/electrical/gas damage checks, restock order (water, medicine, food, batteries), emotional processing (normal to feel off for weeks), children's recovery, when to seek professional help, plan update (what worked, what didn't)

---

#### G22. Apartment vs House
- **Slug:** `apartment-vs-house`
- **Subtitle:** Different Homes, Different Prep
- **Tag:** `planning` · **Read time:** ~10 min · **Sketch:** `houses`
- **Sections:** High-rise considerations · Ground floor risks · Storage solutions · Evacuation differences
- **Core content:** Tower living (elevator/pump dependency, stairwell evacuation, rooftop access), independent house (more storage, more entry points, generator feasibility), ground floor (flooding, break-in), upper floor (supply carrying, water pressure, fire), apartment storage solutions (vertical, balcony, under-bed), DHA/gated community considerations

---

#### G23. Digital Security During a Crisis
- **Slug:** `digital-security-crisis`
- **Subtitle:** Protecting Your Data When the State Isn't Protecting You
- **Tag:** `comms` · **Read time:** ~10 min · **Sketch:** NEW `SketchLock`
- **Sections:** VPN basics · Encrypted messaging · Protecting your phone · Social media safety
- **Opening scenario:** The internet is back — but it's being monitored. Or maybe it's still off and you're using whatever connection you can find. Your phone has your photos, your messages, your banking apps, your entire life. Who else can see it?
- **Core content:**
  - VPN setup and why it matters during shutdowns (government monitoring, content filtering)
  - Encrypted messaging: Signal vs WhatsApp (WhatsApp is convenient but Facebook-owned), Briar for no-internet
  - Phone security: lock screen, biometrics, remote wipe capability, what to do before going through a checkpoint
  - Social media during crises: what not to post (your location, your route, your supplies), screenshot vs share (screenshots don't have metadata)
  - Cloud backups: what to enable, what to disable, Google/Apple account security
  - SIM card security: PIN lock, what happens if your phone is taken
  - Two-factor authentication: set it up NOW, not during the crisis
- **Illustrations:** VPN concept diagram, app comparison chart, phone security checklist

---

#### G24. Fire Safety in the Home
- **Slug:** `home-fire-safety`
- **Subtitle:** The Emergency That Starts in Your Own Kitchen
- **Tag:** `environment` · **Read time:** ~9 min · **Sketch:** NEW `SketchFire`
- **Sections:** Prevention · Fire types · Responding · Escape from apartments
- **Opening scenario:** Loadshedding. Candles lit in three rooms. A curtain catches. In a Karachi apartment with one exit and bars on the windows, you have less time than you think.
- **Core content:**
  - Why fire risk increases during crises (candles during blackouts, improvised cooking, overloaded generators)
  - Fire types and how to fight them: electrical (never water), grease/oil (smother, never water), fabric/wood (water OK)
  - Kitchen fire response (especially oil fires — extremely common in Pakistani cooking)
  - Fire extinguisher basics (types, where to buy in Pakistan, PKR prices, placement)
  - Apartment escape: window bars are a death trap during fire — discuss grille release mechanisms
  - Smoke inhalation: stay low, wet cloth over face, crawl to exit
  - High-rise evacuation: never use lift, stairwell procedure, smoke direction
  - Candle and diya safety rules during loadshedding
- **Illustrations:** Fire type response chart, oil fire smothering technique, escape route planning, smoke movement in apartment

---

#### G25. Caring for Elderly & Disabled Family Members
- **Slug:** `elderly-disabled-preparedness`
- **Subtitle:** They Can't Run — So Plan Around That
- **Tag:** `planning` · **Read time:** ~11 min · **Sketch:** NEW `SketchElderly`
- **Sections:** Medication dependencies · Mobility planning · Communication · Evacuation adaptations
- **Opening scenario:** Your mother lives alone in Nazimabad. She takes three medications daily, can't walk fast, doesn't really understand WhatsApp, and her building has no lift. If something happens at 2 AM, what's her plan? Does she even have one?
- **Core content:**
  - Medication: 30-day buffer, clearly labelled, written schedule (not just "she knows"), backup supply at another family member's house
  - Mobility limitations: evacuation with wheelchair/walker, stairwell descent assistance, pre-identified helpers in building
  - Communication: simplified phone setup, ICE contacts visible, physical card with medical info and emergency numbers on their person at all times
  - Power dependency: medical devices that need electricity (CPAP, oxygen concentrator, nebulizer), battery backup for critical devices
  - Heat vulnerability: elderly are first to die in heatwaves — active cooling plan
  - Psychological: elderly may resist leaving, may not understand urgency, may be confused by disruption
  - Domestic staff: the maid or caretaker may be their only daily contact — what's THEIR emergency plan?
  - Joint family dynamics: assigning elderly care to a specific person, not assuming "someone will handle it"
- **Illustrations:** Medication card template, simplified phone setup, medical info card for wallet, stairwell assistance positions

---

## FIELD CARDS

Field Cards are organised by category. Each has a slug, title, parent guide reference, and description of what the card covers. Illustration requirements are implicit — every field card is primarily visual with step-by-step diagrams.

### Priority:
- **FC Phase A** (launch with Phase 1 guides): Cards directly supporting Phase 1 guides
- **FC Phase B** (launch with Phase 2 guides): Additional skills that deepen the library
- **FC Phase C** (comprehensive): Complete the survival encyclopedia

---

### MEDICAL & FIRST AID

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC9 | `fc-tourniquet` | How to Apply a Tourniquet | `medical` | A | G5 | Step-by-step tourniquet on upper arm and thigh. When to use (life-threatening limb bleed only). Improvised from belt or dupatta. Time marking. |
| FC10 | `fc-wound-disinfection` | Cleaning & Disinfecting a Wound | `medical` | A | G5 | Clean water rinse, Pyodine/Dettol application, what NOT to put on wounds (toothpaste, ghee — common Pakistani home remedies that cause infection), bandaging. |
| FC11 | `fc-wound-packing` | Packing a Deep Wound | `medical` | A | G5 | When direct pressure isn't enough. Gauze packing into wound cavity step-by-step. Maintaining pressure. When to NOT pack (abdominal). |
| FC13 | `fc-chest-seal` | Improvised Chest Seal | `medical` | A | G5 | Recognizing a chest wound (sucking sound, bubbles). Plastic wrap/bag + tape construction. Vented vs non-vented. Positioning. |
| FC15 | `fc-splint` | Making an Improvised Splint | `medical` | A | G5 | Arm and leg splints from household items (rulers, magazines, wooden spoons, cardboard). Padding, securing without cutting circulation. Sling from dupatta. |
| FC16 | `fc-stretcher` | Building an Improvised Stretcher | `medical` | B | G5 | Two poles + blanket/sheet/chador method. Four-person carry. Two-person alternatives. Testing before loading. |
| FC23 | `fc-cpr-adult` | CPR — Adults | `medical` | B | G5 | Chest compression position, rate (100-120/min, "Stayin' Alive" beat), depth, rescue breaths. When to start, when to stop. |
| FC24 | `fc-cpr-child` | CPR — Children & Infants | `medical` | B | G5 | Modified technique for children (one hand) and infants (two fingers). Different depth/rate. |
| FC25 | `fc-choking-adult` | Choking Response — Adults | `medical` | B | G5 | Heimlich manoeuvre step-by-step. Self-Heimlich using chair back. When to switch to back blows. |
| FC26 | `fc-choking-child` | Choking Response — Children & Infants | `medical` | B | G13 | Back blows + chest thrusts for infants. Abdominal thrusts for children. What NOT to do (don't finger sweep blindly). |
| FC28 | `fc-burns` | Treating Burns | `medical` | B | G13 | Degree classification (visual). Cool running water 10-20 min. What NOT to apply (ice, butter, toothpaste). When it needs a hospital. Chemical burn differences. |
| FC29 | `fc-snakebite` | Snakebite Response | `medical` | B | G13 | Common venomous snakes in Sindh/Punjab. What to do (immobilize limb, keep calm, get to hospital). What NOT to do (don't cut, don't suck, don't tourniquet). Photo identification if safe. |
| FC30 | `fc-shock` | Recognizing & Managing Shock | `medical` | B | G5 | Signs (pale, cold, rapid weak pulse, confusion). Legs elevated. Maintain warmth. Don't give food/water. Keep talking to them. |
| FC31 | `fc-recovery-position` | The Recovery Position | `medical` | B | G5 | Step-by-step placing an unconscious breathing person on their side. Why it matters (choking on vomit). |
| FC32 | `fc-pressure-bandage` | Applying a Pressure Bandage | `medical` | A | G5 | Firm direct pressure, bandage wrapping technique, checking circulation below bandage. |
| FC33 | `fc-sling` | Arm Sling from Cloth | `medical` | B | G5 | Triangular bandage sling from dupatta/chunni. Securing. Elevation for swelling. |
| FC34 | `fc-eye-injury` | Foreign Object in Eye | `medical` | C | G13 | Flush with clean water, don't rub, when to patch and get to hospital, chemical splash response. |
| FC36 | `fc-scorpion-sting` | Scorpion Sting Response | `medical` | C | G13 | Common in Sindh/Balochistan. Clean the area, cold compress, pain management, when to seek medical help (children, elderly, allergic reaction). |
| FC37 | `fc-build-first-aid-kit` | Building a First Aid Kit from a Pharmacy Run | `medical` | A | G13 | Exact shopping list with Pakistani brand names and approximate PKR prices. What to ask for at the counter. Storage container recommendations. |
| FC38 | `fc-emergency-delivery` | Emergency Childbirth | `medical` | C | G13 | When you absolutely cannot get to a hospital. Basic steps, cord management (don't cut — wait for medics if possible), keeping mother and baby warm, when to call for help vs when to transport. |
| FC39 | `fc-heatstroke-response` | Heatstroke Emergency Response | `medical` | B | G16 | Recognizing heatstroke (hot, dry, confused — EMERGENCY). Rapid cooling methods. What NOT to do. When this is a hospital-now situation. |
| FC40 | `fc-ors` | Making ORS from Scratch | `medical` | A | G4, G16 | Exact measurements: 1 litre clean water + 6 level teaspoons sugar + ½ level teaspoon salt. Why proportions matter. Taste test ("tears taste"). |
| FC41 | `fc-dehydration` | Recognizing Dehydration | `medical` | B | G4, G16 | Signs by severity (mild/moderate/severe). Skin pinch test. Children's specific signs (no tears, sunken fontanelle, fewer wet nappies). When ORS isn't enough. |

---

### FIRE & COOKING

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC4 | `fc-start-fire` | Starting a Fire Safely | `skills` | A | G3, G20 | Three methods ranked by practicality: (1) Lighter/matches + tinder (cotton balls, paper, dry leaves), (2) Battery + steel wool, (3) Friction (bow drill — last resort, hard to master). Fire lay construction (tinder → kindling → fuel). Safety: surface selection, wind management, extinguishing completely. |
| FC5 | `fc-improvised-stove` | Building an Improvised Stove | `skills` | A | G3, G20 | Brick stove (3 bricks, U-shape), tin can stove (large tin, ventilation holes), rocket stove concept. Fuel efficiency. OUTDOOR USE guidance. Indoor alternative: solid fuel tablet in ventilated area. |
| FC42 | `fc-oil-fire` | Putting Out an Oil/Grease Fire | `skills` | B | G24 | NEVER water on oil. Smother with metal lid or wet towel. Baking soda for small flames. Turn off heat source. When to evacuate instead of fight. |
| FC43 | `fc-fire-types` | Fighting Different Fire Types | `skills` | B | G24 | Electrical (cut power first, never water), oil/grease (smother), fabric/wood (water OK), gas leak (evacuate, don't fight). Fire extinguisher types (ABC vs kitchen). |
| FC44 | `fc-escape-fire` | Escaping a Building Fire | `skills` | B | G24 | Stay low (smoke rises), feel doors before opening (hot = don't open), wet cloth over face, stairwell not lift, window as last resort, signalling from window. |

---

### WATER & PURIFICATION

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC6 | `fc-bleach-purify` | Water Purification with Bleach | `food & water` | A | G4 | Exact drops per litre of unscented household bleach. Wait time (30 min). Smell test. What type of bleach works (not scented, not colour-safe). |
| FC7 | `fc-sodis` | Solar Water Disinfection (SODIS) | `food & water` | B | G4 | Clear PET bottle, fill, lay in direct sun 6+ hours (full day if cloudy). Why it works (UV-A). Limitations (doesn't remove chemicals, only works in clear water). |
| FC8 | `fc-boil-purify` | Boiling Water for Safety | `food & water` | A | G4 | Rolling boil for 1 minute (3 minutes above 2000m elevation — relevant for northern Pakistan). Let cool naturally. Storage after boiling. |
| FC22 | `fc-rainwater` | Rainwater Collection Setup | `food & water` | B | G4 | Tarp/sheet funnel into container. First-flush diversion (first 5 minutes of rain washes roof grime — divert away). Storage. Still needs purification. |
| FC45 | `fc-find-water` | Finding Water in the Wild | `food & water` | C | — | Following animal tracks, morning dew collection, plant indicators (green vegetation in dry areas), digging seep wells in dry riverbeds, solar still construction. Pakistan-specific: canal systems, tube wells, mosque water taps in rural areas. |
| FC46 | `fc-household-water` | Emergency Water from Your Home | `food & water` | B | G4 | Water heater tank (geyser), toilet cistern (tank, NOT bowl — and only if no chemical cleaners used), ice from freezer, canned food liquid. How to drain pipes. |

---

### FOOD, GROWING & SOURCING

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC19 | `fc-no-cook-meals` | No-Cook Emergency Meals | `food & water` | A | G3 | 5 combinations using Pakistani shelf-stable foods: sattu drink (water + sattu + salt), chana chaat (roasted chana + onion + lemon), dates + peanuts energy mix, rusk + powdered milk, glucose biscuits + peanut butter. Calorie counts per serving. |
| FC20 | `fc-food-preservation` | Preserving Food Without a Fridge | `food & water` | B | G3 | Sun drying (meat, fruit — works well in Karachi heat), salt curing, sugar preservation (murabbas — Pakistani tradition), vinegar pickling (achar method), what spoils first and what lasts. |
| FC21 | `fc-sprouting` | Growing Sprouts at Home | `food & water` | C | G3 | Moong, chana, and methi sprouts in a jar or cloth. Ready in 2-4 days. Fresh nutrition when supply chains break. Requires only seeds + water + a jar. No soil, no sunlight needed. |
| FC47 | `fc-container-garden` | Balcony & Rooftop Container Gardening | `food & water` | C | — | Fast-growing edibles for Karachi climate: mirch, tamatar, palak, pudina, dhaniya. Container selection, soil mix, watering schedule. Timeline: some harvestable in 3-4 weeks. Long-term resilience, not crisis response. |
| FC48 | `fc-fishing-basics` | Basic Fishing — Line, Hook, and Patience | `food & water` | C | — | Pakistan has 1,000+ km of coastline, five major rivers, and canal systems everywhere. Basic hand-line fishing: hook, line, weight, bait (bread, insects, small pieces of meat). Where to fish (canals, river banks, coastal rocks). Catch cleaning and cooking. Simple snare trap for small birds (controversial but legitimate survival skill — frame as absolute last resort for extended displacement). |
| FC49 | `fc-cooking-no-utensils` | Cooking Without Utensils | `food & water` | C | G20 | Wrapping food in leaves/foil for ember cooking. Flat stone as tawa. Tin can as pot. Stick roasting. Green bamboo as cooking vessel (found in Sindh/Punjab). |
| FC50 | `fc-food-safety` | Is This Food Still Safe to Eat? | `food & water` | B | G3 | Visual/smell/texture checks. Refrigerated food after power outage (4-hour rule, frozen food lasts longer). Canned food with dents/swelling (never eat swollen cans). Reheating safety. |

---

### KNOTS, ROPE & RIGGING

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC18 | `fc-essential-knots` | 5 Knots That Could Save Your Life | `skills` | A | G7 | (1) Bowline — secure loop that won't slip (rescue, hoisting), (2) Clove hitch — quick tie to a post/pole, (3) Trucker's hitch — mechanical advantage for securing loads, (4) Square/reef knot — joining two ropes, (5) Taut-line hitch — adjustable tension (tarps, shelters). Step-by-step tying diagrams for each. |
| FC51 | `fc-tarp-shelter` | Setting Up a Tarp Shelter | `skills` | B | — | A-frame, lean-to, and ground-cover configurations. Uses for displacement, monsoon rain protection, sun shade. Requires: tarp/plastic sheet + rope/cord + anchor points. Knot cross-reference. |
| FC52 | `fc-rope-from-fabric` | Making Rope from Fabric | `skills` | C | — | Tearing sheets/dupattas into strips, twisting technique, braiding for strength. Load-bearing capacity limitations (enough for tying, NOT for climbing). |
| FC53 | `fc-secure-load` | Tying a Load to a Vehicle | `skills` | B | G19 | Rooftop load securing for car. Motorcycle load balancing. Which knots to use. Checking during travel. Weight distribution. |

---

### BUILDING, SHELTER & HOME

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC2 | `fc-door-barricade` | Barricading a Door | `skills` | A | G2 | Sofa/almari positioning against inward-opening doors. Wedge technique for doors without locks. Belt/rope handle tie for pull-doors. What stops a forced entry vs what just slows it down. |
| FC3 | `fc-window-reinforce` | Reinforcing Windows | `skills` | A | G2 | Tape X-patterns (reduces shatter spray, doesn't prevent breakage). Plywood/cardboard covering. Blackout methods. Existing window grill as advantage. |
| FC12 | `fc-shutoff-utilities` | Shutting Off Gas, Electric & Water Mains | `skills` | A | G2, G14 | Sui gas meter valve location and operation. Main electrical breaker identification and shutoff. Water main valve. When to shut off each (earthquake = gas, flooding = electric, evacuation = all three). |
| FC35 | `fc-blackout-curtains` | Improvised Blackout Curtains | `skills` | A | G2 | Why light discipline matters (advertising your home has power/resources). Black garbage bags, dark blankets, cardboard. Taping edges to prevent light leaks. |
| FC54 | `fc-sandbag-alternatives` | Flood Barriers Without Sandbags | `skills` | B | G15 | Plastic shopping bags filled with soil/sand. Garbage bags + dirt. Plywood + plastic sheeting for doorways. Brick + tarp barriers. |
| FC55 | `fc-roof-patch` | Emergency Roof Leak Patching | `skills` | C | G15 | Tarp + bricks for immediate coverage. Plastic sheeting + adhesive for smaller leaks. When it's safe to go on the roof vs when it's not. Monsoon-specific. |
| FC56 | `fc-emergency-shelter` | Building a Basic Shelter from Nothing | `skills` | C | — | For displacement/outdoor situations. Debris hut (insulation, warmth), lean-to (rain protection), branch framework + plastic/tarp covering. Site selection (elevated, away from water runoff, wind protection). |

---

### NAVIGATION & SIGNALING

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC57 | `fc-direction-no-compass` | Finding Direction Without a Compass | `skills` | C | — | (1) Sun method: rises east, sets west, shadow stick technique for north-south. (2) Stars: Polaris (North Star) identification. (3) Mosque orientation: qibla faces Makkah — in Pakistan that's roughly west-southwest. (4) Satellite dishes: in Pakistan, most point southwest toward ArabSat/PakSat — rough directional indicator. |
| FC58 | `fc-signal-for-rescue` | Signaling for Help | `skills` | C | — | Mirror/glass reflection (flash toward aircraft/vehicles), smoke signals (green vegetation on fire = white smoke, visible from distance), ground signals (SOS, large X from clothing/debris), whistle (three blasts = distress), torch/phone light at night (three flashes). |
| FC59 | `fc-read-map` | Reading a Basic Map | `skills` | C | — | Orienting map to terrain, scale bars, contour lines (hills/valleys), identifying your position using landmarks, basic grid reference. Offline map apps (Maps.me, Google offline maps — download before crisis). |

---

### VEHICLE & TRANSPORT

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC60 | `fc-change-tyre` | Changing a Car Tyre | `skills` | B | G19 | Jack placement points, lug nut sequence (loosen before lifting), spare tyre check (most people's spares are flat), safety (handbrake, gear, flat ground, warning triangle). |
| FC61 | `fc-motorcycle-puncture` | Fixing a Motorcycle Puncture | `skills` | B | G19 | Tube-type tyre: removal, finding leak (water basin), patching, reinstallation. Tubeless: plug kit method. Both are roadside-doable. Every motorcyclist in Pakistan should know this. |
| FC62 | `fc-jumpstart` | Jump-Starting a Car | `skills` | B | G19 | Cable connection order (positive first, negative to ground — NOT to battery). Which car runs first. Disconnection order (reverse). Common mistakes that damage electronics. |
| FC63 | `fc-push-start` | Push-Starting a Manual Vehicle | `skills` | C | G19 | Car: second gear, clutch in, push, release clutch at speed. Motorcycle: same principle on a slope. Only works with manual transmission. |
| FC17 | `fc-siphon-fuel` | Siphoning Fuel Safely | `skills` | B | G19 | Tube into tank, mouth suction (spit immediately — petrol is toxic) or pump siphon, container below tank level. When you'd need this (transferring between vehicles, fueling generator). Safety: no sparks, ventilation, spill containment. |

---

### MOVEMENT & CARRYING

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC14 | `fc-fireman-carry` | The Fireman's Carry | `skills` | B | G5 | Lifting technique, weight distribution, walking with casualty. When to use (unconscious person, need to move fast). When NOT to use (suspected spinal injury). Alternative: two-person seat carry. |
| FC64 | `fc-descend-building` | Emergency Descent from a Building | `skills` | C | G22, G24 | When stairs are blocked (fire, collapse). Knotted bedsheet/rope descent: anchor points, knot spacing, hand-over-hand technique, weight limits of fabric. Lowering children first. Realistic: this works for 2-3 floors, not 10. Balcony-to-balcony if possible. |
| FC65 | `fc-carry-child-flee` | Carrying a Child While Moving Fast | `skills` | B | G1 | Front carry (toddler), hip carry, back carry using dupatta/chadar as wrap. Keeping hands free. Age/weight considerations. Older children: holding hands vs. wrist grip (wrist grip doesn't slip). |

---

### DOCUMENTS & DIGITAL

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC1 | `fc-go-bag-packing` | Go-Bag Packing Checklist | `planning` | A | G7 | Visual packing list. Priority layers (critical → important → nice-to-have). What goes in first (documents, cash, meds), what goes in last (clothes). |
| FC14_doc | `fc-document-pouch` | The Document Go-Pouch | `planning` | A | G7, G8 | What to include: CNIC copies, passport copies, property papers, medical records, medication list, family plan sheet, insurance papers, 2x passport photos each person, USB drive with digital copies. Waterproof pouch (ziplock bag works). |
| FC66 | `fc-phone-emergency-setup` | Emergency Phone Settings | `comms` | B | G23 | ICE contacts setup, offline maps download (Google Maps, Maps.me), emergency SOS feature activation, medical ID setup, battery saver configuration, turning off unnecessary background apps, keeping phone in Airplane mode to extend battery while checking periodically. |
| FC67 | `fc-vpn-setup` | Setting Up a VPN | `comms` | C | G23 | What a VPN does in simple terms. Recommended VPN apps available in Pakistan. Setup steps. When to activate (internet shutdown/throttle, monitored connection). Free vs paid considerations. |
| FC68 | `fc-encrypted-messaging` | Setting Up Encrypted Messaging | `comms` | C | G23 | Signal: install, verify safety numbers, disappearing messages. Briar: install, works without internet (Bluetooth/WiFi direct). When to use which. |

---

### PERSONAL SAFETY

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC69 | `fc-break-car-window` | Breaking a Car Window Safely | `skills` | C | — | When you need to (submerged vehicle, child locked in hot car, trapped after accident). Tempered glass: hit corners, not centre. Tool options: headrest post, spark plug ceramic, dedicated window breaker. Side windows vs windshield (laminated — don't bother). Cover your face. |
| FC70 | `fc-crowd-escape` | Escaping a Dense Crowd | `skills` | B | G12 | Move diagonally to edges (not against flow). Arms up, elbows out (breathing space). If you fall: fetal position, protect head, get up immediately. Carrying children above crowd level. Pre-identify exits when entering any crowded space. |

---

### WEATHER & ENVIRONMENT

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC71 | `fc-wet-cooling` | Cooling Down Without AC or Electricity | `environment` | B | G16 | Wet towel on neck, wrists, forehead. Wet curtain in window with airflow. Cold water on feet. Cross-ventilation setup. Wet sheet for sleeping. Spray bottle misting. |
| FC72 | `fc-earthquake-position` | Safe Positions During an Earthquake | `environment` | B | G14 | Drop-cover-hold without a desk: interior wall, under heavy table, next to bed (not on it). Away from windows, almaris, ceiling fans. Doorframe only if reinforced. Kitchen: away from crockery shelves. What if you're in bed, on stairs, outside, in a car. |
| FC73 | `fc-flood-driving` | Driving Through Flood Water | `environment` | B | G15 | When it's "maybe OK" (hubcap-deep, slow, steady speed, low gear). When it's absolutely NOT (flowing water, above mid-tyre, can't see road surface). Motorcycle is even less safe. Stalled engine: don't restart (hydrolocked). Get out, get to high ground. |

---

### MISC / GENERAL SURVIVAL

| # | Slug | Title | Tag | Phase | Parent Guide | Description |
|---|------|-------|-----|-------|--------------|-------------|
| FC74 | `fc-clean-drinking-vessel` | Sterilizing Containers for Water Storage | `food & water` | C | G4 | Bleach rinse, boiling water rinse, sun drying. Why it matters (dirty containers recontaminate clean water). Applicable to jerry cans, bottles, buckets. |
| FC75 | `fc-night-movement` | Moving Safely at Night | `skills` | C | — | Without a torch (preserve night vision — no phone screens for 10 min before, red light if available). With a torch (point down, not ahead — less visible from distance). Noise discipline. Route planning by daylight. When to move at night vs wait for dawn. |
| FC76 | `fc-improvised-tools` | Improvised Tools from Household Items | `skills` | C | — | Pry bar from steel pipe/car jack handle. Cutting tool from broken ceramic/glass (wrap handle end). Digging tool from flat metal/pan. Funnel from cut bottle. Container from cut jerry can. The point: look at what's around you differently. |
| FC27 | `fc-walkie-quickstart` | Walkie-Talkie Quick Start Card | `comms` | A | G6 | One-page: turn on, set channel, press PTT, speak, release. Channel assignment. Battery conservation (lower power when close, turn off when not in use). Printable, wallet-sized. |

---

## TOPICS CONSIDERED BUT EXCLUDED (and why)

These were evaluated and deliberately left out:

| Topic | Reason for exclusion |
|-------|---------------------|
| **Wound cauterization** | Modern trauma medicine strongly advises against it. Causes tissue damage, dramatically increases infection risk, destroys tissue that could heal. Not legitimate civilian field medicine. Proper wound packing and pressure are superior in every scenario. Including it would be irresponsible. |
| **Detailed weapons/self-defence** | Not Rugged's lane. Tactical/military content conflicts with brand positioning. Pakistan has its own complex legal/cultural context around weapons. Stay out of it. |
| **Advanced wilderness survival** (multi-week bushcraft) | The audience may end up in rural/semi-rural situations temporarily, and we cover those skills. But extended bushcraft (building permanent shelters, tanning hides, advanced trapping) is beyond scope. If someone needs that, they're past what an app can help with. |
| **Political commentary** | Guides reference geopolitical situations as scenarios but never take political positions. "The government shut down the internet" is a fact. "The government was wrong to..." is commentary. Stay factual. |
| **Religious guidance** | Pakistan is a Muslim-majority country and faith is part of how many people cope with crisis. But Rugged is a preparedness brand, not a religious one. Don't include religious guidance, prayers, or spiritual content. Respect the role of faith without assuming or prescribing it. |

---

## Sketch Component Registry

### Existing
| Key | Component | Used by |
|-----|-----------|---------|
| `backpack` | `SketchBackpack` | G1, G7 |
| `shelter` | `SketchShelter` | G2 |
| `food` | `SketchFood` | G3, G20 |
| `water` | `SketchWater` | G4 |
| `medical` | `SketchMedical` | G5 |
| `radio` | `SketchRadio` | G6 |
| `houses` | `SketchHouses` | G9, G22 |

### Needs Creation
| Key | Component | Used by |
|-----|-----------|---------|
| `plan` | `SketchPlan` | G8 |
| `power` | `SketchPower` | G10 |
| `clock` | `SketchClock` | G11 |
| `barricade` | `SketchBarricade` | G12 |
| `pills` | `SketchPills` | G13 |
| `quake` | `SketchQuake` | G14 |
| `flood` | `SketchFlood` | G15 |
| `sun` | `SketchSun` | G16 |
| `family` | `SketchFamily` | G17 |
| `cash` | `SketchCash` | G18 |
| `vehicle` | `SketchVehicle` | G19 |
| `stove` | `SketchStove` | G20 |
| `sunrise` | `SketchSunrise` | G21 |
| `lock` | `SketchLock` | G23 |
| `fire` | `SketchFire` | G24 |
| `elderly` | `SketchElderly` | G25 |
| `knot` | `SketchKnot` | FC18 |
| `compass` | `SketchCompass` | FC57 |

Field Cards will primarily reuse parent guide sketches or use inline step illustrations rather than unique hero sketches.

---

## Priority & Sequencing

### Main Guides
| Phase | Guides | Count | Goal |
|-------|--------|-------|------|
| **Phase 1** | G1-G8 | 8 | Launch. Sells kits, establishes authority. |
| **Phase 2** | G9-G16 | 8 | Depth. Community building, seasonal topics. |
| **Phase 3** | G17-G25 | 9 | Comprehensive. Driven by community demand. |

### Field Cards
| Phase | Cards | Count | Goal |
|-------|-------|-------|------|
| **FC Phase A** | FC1-FC13, FC18, FC19, FC27, FC32, FC35, FC37, FC40 | ~20 | Launch alongside Phase 1 guides. Core survival skills. |
| **FC Phase B** | FC14, FC16-FC17, FC20, FC22-FC26, FC28-FC31, FC33, FC39, FC41-FC44, FC46, FC50, FC51, FC53, FC54, FC60-FC62, FC65-FC66, FC70-FC73 | ~35 | Depth. Fills out the encyclopedia. |
| **FC Phase C** | Everything else | ~20 | Comprehensive. Full survival encyclopedia. |

### Recommended Writing Order (Phase 1 Guides)
1. **The 30-Minute Window** — most visceral, most shareable, directly tied to kit sales
2. **Shelter in Place** — paired opposite of #1 (covers "go" and "stay")
3. **Trauma First Aid** — highest stakes, establishes medical credibility
4. **Water When the Taps Stop** — universal concern, high search value
5. **Sattu, Chana, and Staying Fed** — unique differentiator ("why Pakistani prep is different")
6. **When the Towers Go Down** — comms, ties to walkie-talkies in kits
7. **Your Go-Bag** — direct kit tie-in
8. **The Family Emergency Plan** — planning framework tying everything together

---

## File Structure

```
/content/
├── guides/
│   ├── 30-minute-window/
│   │   ├── guide.md
│   │   └── images/
│   ├── shelter-in-place/
│   │   ├── guide.md
│   │   └── images/
│   └── ... (same pattern)
├── field-cards/
│   ├── fc-tourniquet/
│   │   ├── card.md
│   │   └── images/
│   ├── fc-start-fire/
│   │   ├── card.md
│   │   └── images/
│   └── ... (same pattern)
```

---

## Markdown Frontmatter Schema

### Main Guide
```yaml
---
type: "guide"
slug: "30-minute-window"
title: "The 30-Minute Window"
subtitle: "A Family Evacuation Plan You Can Build Tonight"
tag: "essentials"
date: "2026-03"
readTime: "14 min"
sketch: "backpack"
sections:
  - "Rally points"
  - "Vehicle prep"
  - "Grab bag checklist"
  - "Communication tree"
excerpt: "A border escalation hits the news. Your wife calls..."
relatedCards: ["fc-go-bag-packing", "fc-document-pouch", "fc-siphon-fuel"]
status: "published"
---
```

### Field Card
```yaml
---
type: "field-card"
slug: "fc-tourniquet"
title: "How to Apply a Tourniquet"
subtitle: "Stop life-threatening limb bleeding"
tag: "medical"
date: "2026-03"
readTime: "3 min"
useWhen: "Someone has life-threatening bleeding from an arm or leg and direct pressure isn't stopping it."
parentGuide: "trauma-first-aid"
relatedCards: ["fc-wound-disinfection", "fc-pressure-bandage"]
status: "published"
---
```

---

## Content Totals

| Type | Count |
|------|-------|
| Main Guides | 25 |
| Field Cards | ~76 |
| **Total content pieces** | **~101** |

---

## Notes for AI Sessions

1. **Read the Writing Rules section carefully.** The voice is the brand.

2. **Be specific.** "Store 20 litres per person in food-grade jerry cans from the hardware store on Tariq Road, Rs. 800 each" — that's a guide. "Keep water stored" is not.

3. **Every claim should be survivable.** Err conservative on ranges, battery life, shelf life.

4. **The primary audience is urban middle-class Pakistani families** — but the content must also be useful for anyone in Pakistan in any crisis scenario. Someone displaced from their city, someone in rural Sindh, someone in northern areas. The encyclopedia covers everything.

5. **Cross-reference** guides and field cards. Don't repeat content — link to it.

6. **Illustration notes are instructions for a human illustrator or AI image generation.** Be specific. These are functional diagrams, not art.

7. **The opening scenario is the most important paragraph** (main guides). Stomach clench. Not fear-mongering — recognition. "Oh. That could be me."

8. **Field Cards are mostly illustrations.** The text supports the pictures, not the other way around. If you can't picture the illustrations clearly, the card isn't ready.

9. **Prices in PKR, distances in km, temperatures in °C, weights in kg.** Always.

10. **Test: "would I print this and put it in a bag?"** If not, it's not ready.

11. **Never recommend cauterization, weapons use, or politically charged actions.** Stay in the survival lane.

12. **Pakistan-specific context matters.** Dupatta as sling. Charpai positions during earthquakes. Mosque qibla for direction-finding. Almari securing. Sui gas meter shutoff. These details are what make this not-a-translated-Western-guide.
