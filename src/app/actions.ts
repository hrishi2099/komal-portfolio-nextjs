"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";

export async function updateHero(formData: FormData) {
  const heading = formData.get("heading") as string;
  const subheading = formData.get("subheading") as string;
  const file = formData.get("backgroundImageFile") as File;
  
  let backgroundImage = formData.get("backgroundImage") as string;
  
  const uploadedPath = await uploadFile(file);
  if (uploadedPath) {
    backgroundImage = uploadedPath;
  }

  await prisma.hero.update({
    where: { id: 1 },
    data: { heading, subheading, backgroundImage },
  });
  revalidatePath("/");
}

export async function updateAbout(formData: FormData) {
  const heading = formData.get("heading") as string;
  const subheading = formData.get("subheading") as string;
  const content = formData.get("content") as string;
  const yearsExp = formData.get("yearsExp") as string;
  const projectsCount = formData.get("projectsCount") as string;
  const profileName = formData.get("profileName") as string;
  const profileTitle = formData.get("profileTitle") as string;
  
  const file = formData.get("imageFile") as File;
  let image = formData.get("image") as string;
  
  const uploadedPath = await uploadFile(file);
  if (uploadedPath) {
    image = uploadedPath;
  }

  await prisma.about.update({
    where: { id: 1 },
    data: { heading, subheading, content, image, yearsExp, projectsCount, profileName, profileTitle },
  });
  revalidatePath("/");
}

export async function updateContact(formData: FormData) {
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const ctaText = formData.get("ctaText") as string;
  const ctaSub = formData.get("ctaSub") as string;
  const instagram = formData.get("instagram") as string;
  const linkedin = formData.get("linkedin") as string;
  const behance = formData.get("behance") as string;

  await prisma.contact.update({
    where: { id: 1 },
    data: { email, phone, address, ctaText, ctaSub, instagram, linkedin, behance },
  });
  revalidatePath("/");
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  
  const file = formData.get("imageFile") as File;
  let image = formData.get("image") as string || "/placeholder.jpg"; 

  const uploadedPath = await uploadFile(file);
  if (uploadedPath) {
    image = uploadedPath;
  }

  await prisma.project.create({
    data: { title, category, image },
  });
  revalidatePath("/");
}

export async function deleteProject(id: number) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/");
}

export async function updateProjectDetails(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const description = formData.get("description") as string;
  const year = formData.get("year") as string;
  const location = formData.get("location") as string;
  const area = formData.get("area") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  
  const file = formData.get("imageFile") as File;
  let image = formData.get("image") as string;

  const uploadedPath = await uploadFile(file);
  if (uploadedPath) {
    image = uploadedPath;
  }

  await prisma.project.update({
    where: { id },
    data: { title, category, image, description, year, location, area },
  });
  revalidatePath("/");
  revalidatePath(`/projects/${id}`);
}

export async function addProjectGalleryImage(formData: FormData) {
  const projectId = parseInt(formData.get("projectId") as string);
  const file = formData.get("file") as File;
  
  const uploadedPath = await uploadFile(file);
  
  let url = formData.get("url") as string;
  if (uploadedPath) {
      url = uploadedPath;
  }

  if (url) {
    await prisma.projectImage.create({
        data: {
        projectId,
        url,
        },
    });
    revalidatePath(`/projects/${projectId}`);
  }
}

export async function deleteProjectGalleryImage(id: number) {
  const img = await prisma.projectImage.findUnique({ where: { id }});
  if (img) {
      await prisma.projectImage.delete({
        where: { id },
      });
      revalidatePath(`/projects/${img.projectId}`);
  }
}