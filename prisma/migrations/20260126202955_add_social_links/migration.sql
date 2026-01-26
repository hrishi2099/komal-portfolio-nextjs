-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ctaText" TEXT NOT NULL DEFAULT 'Let''s build something beautiful.',
    "ctaSub" TEXT NOT NULL DEFAULT 'Available for new projects and collaborations.',
    "instagram" TEXT NOT NULL DEFAULT '#',
    "linkedin" TEXT NOT NULL DEFAULT '#',
    "behance" TEXT NOT NULL DEFAULT '#'
);
INSERT INTO "new_Contact" ("address", "ctaSub", "ctaText", "email", "id", "phone") SELECT "address", "ctaSub", "ctaText", "email", "id", "phone" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
