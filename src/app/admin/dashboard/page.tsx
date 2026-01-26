import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin");
  }

  const hero = await prisma.hero.findFirst();
  const about = await prisma.about.findFirst();
  const contact = await prisma.contact.findFirst();
  const projects = await prisma.project.findMany({
      orderBy: { id: 'desc' },
      include: { gallery: true }
  });

  return <DashboardClient hero={hero} about={about} contact={contact} projects={projects} />;
}
