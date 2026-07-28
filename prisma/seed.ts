import { prisma } from "../src/lib/prisma/db";

async function main() {
  const member1 = await prisma.member.upsert({
    where: { email: "calvin@cursor.sh" },
    update: {},
    create: {
      name: "Calvin Van",
      email: "calvin@cursor.sh",
      slug: "calvin-van",
      bio: "Builder and full-stack engineer. Cursor Boston × Hult cohort member.",
      githubUrl: "https://github.com/codingwcal",
      twitterUrl: "https://x.com/codingwcal",
      status: "active",
    },
  });

  const member2 = await prisma.member.upsert({
    where: { email: "alex@example.com" },
    update: {},
    create: {
      name: "Alex H.",
      email: "alex@example.com",
      slug: "alex-h",
      bio: "ML engineer building production AI systems.",
      githubUrl: "https://github.com/alexh",
      status: "active",
    },
  });

  const member3 = await prisma.member.upsert({
    where: { email: "sarah@example.com" },
    update: {},
    create: {
      name: "Sarah M.",
      email: "sarah@example.com",
      slug: "sarah-m",
      bio: "Full-stack developer focused on real-time collaboration tools.",
      githubUrl: "https://github.com/sarahm",
      status: "alumni",
    },
  });

  const project1 = await prisma.project.upsert({
    where: { slug: "odyssey-travel-planner" },
    update: {},
    create: {
      title: "Odyssey Travel Planner",
      slug: "odyssey-travel-planner",
      description:
        "A collaborative trip planning app with day-by-day itinerary timelines, interactive Leaflet maps with pinned destinations, budget tracking by category, and real-time collaboration via Supabase subscriptions. Built over one week using Next.js 14 App Router with TypeScript strict mode.",
      techStack: JSON.stringify(["Next.js 14", "Prisma", "Supabase", "Leaflet", "Clerk"]),
      githubUrl: "https://github.com/codingwcal/odyssey",
      liveUrl: "https://odyssey.vercel.app",
      featured: true,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: "automated-hedge-fund" },
    update: {},
    create: {
      title: "Automated Hedge Fund",
      slug: "automated-hedge-fund",
      description:
        "Real-time market analysis platform with ML-based signal detection, automated portfolio rebalancing, and historical backtesting. Python backend with FastAPI, Redis for market data caching, Docker for deployment.",
      techStack: JSON.stringify(["Python", "FastAPI", "Redis", "Docker", "scikit-learn"]),
      githubUrl: "https://github.com/alexh/hedge-fund",
      featured: true,
    },
  });

  const project3 = await prisma.project.upsert({
    where: { slug: "vibe-marketing-platform" },
    update: {},
    create: {
      title: "Vibe Marketing Platform",
      slug: "vibe-marketing-platform",
      description:
        "Curated editorial showcase for Cursor Boston × Hult cohort builds. Features a warm dark mode, editorial card grid, member profiles, and admin content management. Built with Next.js 15 App Router, Tailwind CSS v4, Prisma + SQLite.",
      techStack: JSON.stringify(["Next.js 15", "Tailwind CSS v4", "Prisma", "SQLite", "NextAuth.js"]),
      githubUrl: "https://github.com/codingwcal/cursor-boston-showcase",
      featured: true,
    },
  });

  await prisma.projectMember.upsert({
    where: { projectId_memberId: { projectId: project1.id, memberId: member1.id } },
    update: {},
    create: { projectId: project1.id, memberId: member1.id },
  });

  await prisma.projectMember.upsert({
    where: { projectId_memberId: { projectId: project2.id, memberId: member2.id } },
    update: {},
    create: { projectId: project2.id, memberId: member2.id },
  });

  await prisma.projectMember.upsert({
    where: { projectId_memberId: { projectId: project3.id, memberId: member1.id } },
    update: {},
    create: { projectId: project3.id, memberId: member1.id },
  });

  console.log("Seeded: 3 members, 3 projects, 3 project-member associations");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
