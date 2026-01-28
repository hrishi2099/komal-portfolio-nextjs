-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heading" TEXT NOT NULL,
    "subheading" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heading" TEXT NOT NULL,
    "subheading" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "yearsExp" TEXT NOT NULL,
    "projectsCount" TEXT NOT NULL,
    "profileName" TEXT NOT NULL DEFAULT 'Ar. Komal Amle',
    "profileTitle" TEXT NOT NULL DEFAULT 'Principal Architect',

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "year" TEXT,
    "location" TEXT,
    "area" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ctaText" TEXT NOT NULL DEFAULT 'Let''s build something beautiful.',
    "ctaSub" TEXT NOT NULL DEFAULT 'Available for new projects and collaborations.',
    "instagram" TEXT NOT NULL DEFAULT '#',
    "linkedin" TEXT NOT NULL DEFAULT '#',
    "behance" TEXT NOT NULL DEFAULT '#',

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
