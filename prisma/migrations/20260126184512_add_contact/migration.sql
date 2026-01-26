-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ctaText" TEXT NOT NULL DEFAULT 'Let''s build something beautiful.',
    "ctaSub" TEXT NOT NULL DEFAULT 'Available for new projects and collaborations.'
);
