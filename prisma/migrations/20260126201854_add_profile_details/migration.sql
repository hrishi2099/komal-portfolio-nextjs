-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "heading" TEXT NOT NULL,
    "subheading" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "yearsExp" TEXT NOT NULL,
    "projectsCount" TEXT NOT NULL,
    "profileName" TEXT NOT NULL DEFAULT 'Ar. Komal Amle',
    "profileTitle" TEXT NOT NULL DEFAULT 'Principal Architect'
);
INSERT INTO "new_About" ("content", "heading", "id", "image", "projectsCount", "subheading", "yearsExp") SELECT "content", "heading", "id", "image", "projectsCount", "subheading", "yearsExp" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
