/*
  Warnings:

  - You are about to alter the column `year` on the `Month` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Month" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL
);
INSERT INTO "new_Month" ("id", "name", "year") SELECT "id", "name", "year" FROM "Month";
DROP TABLE "Month";
ALTER TABLE "new_Month" RENAME TO "Month";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
