import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email: "admin@rugged.pk" },
    update: {},
    create: {
      email: "admin@rugged.pk",
      name: "Admin",
      password: hashed,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  console.log("Admin user seeded (admin@rugged.pk)");

  // Forum categories
  const categories = [
    { name: "Getting Started", slug: "getting-started", description: "New to preparedness? Start here.", sortOrder: 0 },
    { name: "Family Plans", slug: "family-plans", description: "Rally points, communication trees, roles, and rehearsals.", sortOrder: 1 },
    { name: "Food and Water", slug: "food-water", description: "Storage, rationing, purification, and no-cook meals.", sortOrder: 2 },
    { name: "Medical Readiness", slug: "medical", description: "First aid, trauma care, medications, and kits.", sortOrder: 3 },
    { name: "Communication and Power", slug: "comms-power", description: "Walkie-talkies, FM radio, power banks, and offline messaging.", sortOrder: 4 },
    { name: "Karachi Local Intel", slug: "karachi", description: "Neighbourhood-specific info, routes, hospitals, suppliers.", sortOrder: 5 },
    { name: "Gear and Reviews", slug: "gear", description: "What works, what doesn't, and where to buy it in Pakistan.", sortOrder: 6 },
  ];

  for (const cat of categories) {
    await prisma.forumCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
      create: cat,
    });
  }
  console.log("Forum categories seeded");

  // Mock users
  const mockPassword = await bcrypt.hash("mockuser123", 12);

  const kamran = await prisma.user.upsert({
    where: { email: "kamran@example.com" },
    update: {},
    create: {
      email: "kamran@example.com",
      name: "Kamran A.",
      password: mockPassword,
      emailVerified: new Date(),
    },
  });

  const zainab = await prisma.user.upsert({
    where: { email: "zainab@example.com" },
    update: {},
    create: {
      email: "zainab@example.com",
      name: "Zainab S.",
      password: mockPassword,
      emailVerified: new Date(),
    },
  });

  const bilal = await prisma.user.upsert({
    where: { email: "bilal@example.com" },
    update: {},
    create: {
      email: "bilal@example.com",
      name: "Bilal F.",
      password: mockPassword,
      emailVerified: new Date(),
    },
  });

  console.log("Mock users seeded");

  // Starter threads
  const familyPlansCat = categories.find(c => c.slug === "family-plans");
  const familyPlansDb = await prisma.forumCategory.findUnique({ where: { slug: "family-plans" } });
  const karachiDb = await prisma.forumCategory.findUnique({ where: { slug: "karachi" } });
  const gearDb = await prisma.forumCategory.findUnique({ where: { slug: "gear" } });

  // Thread 1
  const thread1 = await prisma.forumThread.upsert({
    where: { id: "seed-thread-1" },
    update: {},
    create: {
      id: "seed-thread-1",
      title: "We started a 12-house cluster in North Nazimabad — here's how we did it",
      body: `Last month a few of us in Block H, North Nazimabad decided to get organised. We're 12 houses on the same gali, most of us have lived here 10+ years, and we figured if anything ever kicks off we'd rather have a plan than just hope for the best.

Here's what we did:

1. Started with chai. Literally knocked on doors on a Friday evening, said "let's talk about what we'd do if things got bad." 8 out of 12 houses showed up the first time. The other 4 joined over the next two weeks.

2. Made a WhatsApp group — but also agreed on a walkie-talkie channel (Channel 7) in case WhatsApp goes down. Three of us already had Baofengs.

3. Pooled information. Who has medical training? (One uncle is a retired pharmacist.) Who has a generator? (Two houses.) Who has a vehicle that can carry more than 5 people? (One Hilux, one van.)

4. Agreed on rally points. Primary: the mosque at the end of the gali. Secondary: the school two streets over.

5. Set up a shared first aid kit that lives at the mosque. Cost us about Rs. 800 per household.

It's not perfect. Some people are more committed than others. But it exists, and that's more than most streets in Karachi can say.

Has anyone else tried something like this? What worked, what didn't?`,
      authorId: zainab.id,
      categoryId: karachiDb.id,
      tag: "community",
      replyCount: 1,
      lastActivityAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  });

  // Thread 2
  const thread2 = await prisma.forumThread.upsert({
    where: { id: "seed-thread-2" },
    update: {},
    create: {
      id: "seed-thread-2",
      title: "Baofeng UV-5R vs Motorola Talkabout — actual range test in Gulshan",
      body: `I bought both to compare. Tested them last weekend with my brother — I stood on my roof in Gulshan-e-Iqbal Block 13, he walked away with the other radio and we tested at what distance we lost signal.

Results:

Motorola Talkabout T82 (the one that says "10km range" on the box):
- Ground to ground: lost signal at about 400m. Barely covered two galis.
- Roof to ground: about 800m-1km. Could reach the main road from my roof.
- Roof to roof: didn't test (he didn't have roof access at the far end).

Baofeng UV-5R:
- Ground to ground: about 600-700m before it got choppy.
- Roof to ground: solid out to 1.5km. Could reach Johar Chowrangi from my roof in Block 13.
- Roof to roof: roughly 2.5km (tested with a friend in Block 7).

Key takeaway: roof access is more important than which radio you buy. If you can get to your roof, even the cheap Motorola works fine for a neighbourhood cluster. The Baofeng is better but also more complicated — my mother wouldn't be able to figure it out without help.

Battery life: Motorola ran about 18 hours on AAs. Baofeng lasted about 14 hours on its rechargeable.

Both are worth having. I'd say Motorola for simplicity (give it to family members), Baofeng for the person who's willing to learn the menus.`,
      authorId: bilal.id,
      categoryId: gearDb.id,
      tag: "gear",
      replyCount: 1,
      lastActivityAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  });

  // Thread 3
  const thread3 = await prisma.forumThread.upsert({
    where: { id: "seed-thread-3" },
    update: {},
    create: {
      id: "seed-thread-3",
      title: "How do you talk to your kids about emergency planning without scaring them?",
      body: `My kids are 7 and 10. I've been working through the Rugged guides and putting together go-bags, but every time I try to explain to them why we have a "special bag by the door" my 7-year-old gets anxious and my 10-year-old starts asking questions I don't have good answers for.

I don't want to lie to them. But I also don't want them going to school and telling their friends "my dad says there might be bombs." That's not helpful for anyone.

How have other parents handled this? Looking for practical advice on:

- How to explain go-bags and rally points to young kids
- How to do a family practice run without it feeling like a drill
- How to answer "but WHY do we need this?" without going into geopolitics with a 7-year-old

Appreciate any advice. This is the one part of preparedness I'm struggling with.`,
      authorId: kamran.id,
      categoryId: familyPlansDb.id,
      tag: "family",
      replyCount: 1,
      lastActivityAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  // A few replies
  await prisma.forumReply.upsert({
    where: { id: "seed-reply-1" },
    update: {},
    create: {
      id: "seed-reply-1",
      body: "This is excellent. The shared first aid kit at the mosque is a really smart move — it's a neutral location everyone knows. We've been thinking about doing something similar in our building (DHA Phase 6, 8-floor apartment) but coordinating with 40+ families is a different challenge. Any advice for apartment buildings vs streets?",
      threadId: thread1.id,
      authorId: kamran.id,
      createdAt: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.forumReply.upsert({
    where: { id: "seed-reply-2" },
    update: {},
    create: {
      id: "seed-reply-2",
      body: "We framed it as an adventure. \"What if we had to go camping suddenly?\" Our 8-year-old loved it. We packed her bag together — she picked her own torch and chose which snacks to include. The rally point walk became a \"treasure hunt\" where she had to remember the route. She doesn't know it's about anything serious, she just thinks we have a cool family tradition.",
      threadId: thread3.id,
      authorId: zainab.id,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  });

  await prisma.forumReply.upsert({
    where: { id: "seed-reply-3" },
    update: {},
    create: {
      id: "seed-reply-3",
      body: "Good data, jazakallah for actually testing instead of just guessing. One thing to add — the Baofeng's range drops significantly if your battery is below 50%. I noticed mine barely reached 1km on a half charge versus 2km+ on full. Always charge before you need it.",
      threadId: thread2.id,
      authorId: kamran.id,
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    },
  });

  console.log("Starter threads and replies seeded");

  // ── Shop ──
  const shopCategories = [
    { name: "Kits", slug: "kits", sortOrder: 0 },
    { name: "Communication", slug: "communication", sortOrder: 1 },
    { name: "Power", slug: "power", sortOrder: 2 },
    { name: "Water", slug: "water", sortOrder: 3 },
    { name: "Food", slug: "food", sortOrder: 4 },
    { name: "Medical", slug: "medical", sortOrder: 5 },
    { name: "Shelter & Tools", slug: "shelter-tools", sortOrder: 6 },
  ];

  for (const cat of shopCategories) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
  }

  const catMap = {};
  for (const cat of shopCategories) {
    catMap[cat.slug] = (await prisma.productCategory.findUnique({ where: { slug: cat.slug } })).id;
  }

  const products = [
    // Kits
    { name: "Starter Kit", slug: "starter-kit", subtitle: "72 hours. One person.", price: 10000, categoryId: catMap["kits"], isKit: true, isFeatured: true, kitHighlight: "Start here", sortOrder: 0, items: ["9 meals — 1,800+ cal/day, shelf-stable local foods", "Water purification for 72L (3 days drinking + cooking)", "LED torch + 48-hour battery supply", "First aid kit — 35+ components", "Waterproof document safe", "Canvas grab bag — ready to move"], description: "Everything one person needs to survive 72 hours with no infrastructure. Packed in a grab-and-go canvas bag that lives by your front door." },
    { name: "Family Kit", slug: "family-kit", subtitle: "4–5 days. Four people.", price: 40000, categoryId: catMap["kits"], isKit: true, isFeatured: true, kitHighlight: "Most popular", sortOrder: 1, items: ["60+ meals — 2,000 cal/person/day for 4 people", "Gravity water filter — processes 500L+", "Walkie-talkie pair — pre-set, 1–2km urban range", "20,000mAh power bank", "Comprehensive medical kit — 80+ components", "Emergency shelter + 4× thermal blankets"], description: "Your household covered for almost a week. Enough food for four people at full calories, a way to communicate when the networks collapse, and medical supplies that go beyond band-aids." },
    { name: "Urban Conflict Kit", slug: "urban-conflict-kit", subtitle: "5+ days. Full readiness.", price: 95000, categoryId: catMap["kits"], isKit: true, isFeatured: true, kitHighlight: "Complete protection", sortOrder: 2, items: ["80+ meals — 2,000 cal/person/day, 5-day supply for 4", "Filtration system — processes 1,000L of any freshwater", "Long-range walkie-talkies — 2–3km urban, spare batteries", "Solar panel + power bank hybrid — daytime recharge in sun", "Trauma medical — tourniquets, chest seals, splints, 120+ items", "Multi-tool, document safe, full printed inventory"], description: "Built for the scenario nobody wants to say out loud. Trauma-grade medical. Solar power that doesn't depend on anything. Extended comms. Enough to sustain your household while you figure out your next move." },
    // Communication
    { name: "Walkie-Talkie Pair", slug: "walkie-talkie-pair", subtitle: "Pre-set frequencies", price: 6500, categoryId: catMap["communication"], sortOrder: 0 },
    { name: "Long-Range Walkie-Talkies", slug: "long-range-walkie-talkies", subtitle: "2–3km urban range", price: 14000, categoryId: catMap["communication"], sortOrder: 1 },
    { name: "Emergency Whistle (3-pack)", slug: "emergency-whistle-3pack", price: 500, categoryId: catMap["communication"], sortOrder: 2 },
    // Power
    { name: "Rugged Power Bank", slug: "rugged-power-bank", subtitle: "20,000mAh", price: 5500, categoryId: catMap["power"], badge: "branded", sortOrder: 0 },
    { name: "Portable Solar Panel", slug: "portable-solar-panel", subtitle: "Foldable, 20W", price: 12000, categoryId: catMap["power"], sortOrder: 1 },
    { name: "AA Battery Pack", slug: "aa-battery-pack-48", subtitle: "48 count", price: 1200, categoryId: catMap["power"], sortOrder: 2 },
    { name: "LED Torch", slug: "led-torch-500lm", subtitle: "500 lumens, AA powered", price: 1800, categoryId: catMap["power"], sortOrder: 3 },
    { name: "Hand-Crank Radio + Torch", slug: "hand-crank-radio", price: 3500, categoryId: catMap["power"], sortOrder: 4 },
    // Water
    { name: "Gravity Water Filter", slug: "gravity-water-filter", subtitle: "Processes 1000L", price: 8500, categoryId: catMap["water"], sortOrder: 0 },
    { name: "Water Purification Tablets", slug: "water-purification-tablets", subtitle: "100 count", price: 1200, categoryId: catMap["water"], sortOrder: 1 },
    { name: "Collapsible Water Container", slug: "collapsible-water-container", subtitle: "10L", price: 1500, categoryId: catMap["water"], sortOrder: 2 },
    // Food
    { name: "Sattu Emergency Pack", slug: "sattu-emergency-pack", subtitle: "5-day supply", price: 1800, categoryId: catMap["food"], badge: "local", sortOrder: 0 },
    { name: "Dried Dates & Apricot Mix", slug: "dates-apricot-mix", subtitle: "1kg", price: 1200, categoryId: catMap["food"], badge: "local", sortOrder: 1 },
    { name: "Roasted Chana", slug: "roasted-chana-1kg", subtitle: "1kg, vacuum sealed", price: 800, categoryId: catMap["food"], badge: "local", sortOrder: 2 },
    { name: "Complete Food Box", slug: "complete-food-box", subtitle: "4 people, 3 days", price: 4500, categoryId: catMap["food"], badge: "local", sortOrder: 3 },
    // Medical
    { name: "First Aid Essentials Kit", slug: "first-aid-essentials", price: 2500, categoryId: catMap["medical"], sortOrder: 0 },
    { name: "Comprehensive Medical Kit", slug: "comprehensive-medical-kit", price: 7500, categoryId: catMap["medical"], sortOrder: 1 },
    { name: "Trauma Kit", slug: "trauma-kit", subtitle: "Tourniquets, chest seals, splints", price: 15000, categoryId: catMap["medical"], sortOrder: 2 },
    // Shelter & Tools
    { name: "2-Person Emergency Tent", slug: "emergency-tent-2p", price: 8000, categoryId: catMap["shelter-tools"], sortOrder: 0 },
    { name: "Thermal Blankets (4-pack)", slug: "thermal-blankets-4pack", price: 1500, categoryId: catMap["shelter-tools"], sortOrder: 1 },
    { name: "Heavy-Duty Multi-Tool", slug: "multi-tool", price: 3500, categoryId: catMap["shelter-tools"], sortOrder: 2 },
    { name: "Waterproof Documents Pouch", slug: "waterproof-documents-pouch", price: 900, categoryId: catMap["shelter-tools"], sortOrder: 3 },
    { name: "550 Paracord (30m)", slug: "paracord-30m", price: 700, categoryId: catMap["shelter-tools"], sortOrder: 4 },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { name: p.name, price: p.price, subtitle: p.subtitle || null, description: p.description || null, categoryId: p.categoryId, badge: p.badge || null, isKit: p.isKit || false, isFeatured: p.isFeatured || false, kitHighlight: p.kitHighlight || null, items: p.items || [], sortOrder: p.sortOrder || 0 },
      create: { name: p.name, slug: p.slug, price: p.price, subtitle: p.subtitle || null, description: p.description || null, categoryId: p.categoryId, badge: p.badge || null, isKit: p.isKit || false, isFeatured: p.isFeatured || false, kitHighlight: p.kitHighlight || null, items: p.items || [], sortOrder: p.sortOrder || 0, status: "coming_soon" },
    });
  }

  console.log("Shop categories and products seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
