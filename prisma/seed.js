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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
