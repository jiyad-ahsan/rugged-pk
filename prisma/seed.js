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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
