import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
// Create Widget
 await prisma.widgetType.createMany({
  data: [
    {name: "LineChart"},
    {name: "PieChart"},
    {name: "RadarChart"},
  ]
})

// Create Dashboard
  await prisma.dashboard.create({
   data: {  
      name: "Dashboard1",
      description: "Overview of Dashboard1",
      isDefault: true,
      userId: "d1d26628-8052-466a-9c33-0f67a56e1119",
    },
  });
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
