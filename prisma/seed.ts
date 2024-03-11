import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const language = await prisma.language.upsert({
    where: { key: "en" },
    update: {
      name: "English",
    },
    create: {
      key: "en",
      name: "English",
    },
  });
  console.log({ language });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
