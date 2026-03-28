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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
