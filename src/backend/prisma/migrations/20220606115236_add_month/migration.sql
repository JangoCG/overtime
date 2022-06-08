-- CreateTable
CREATE TABLE "Month" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "year" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Week" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monday" REAL,
    "tusday" REAL,
    "wednesday" REAL,
    "thursday" REAL,
    "friday" REAL,
    "totalHours" REAL,
    "monthId" INTEGER,
    CONSTRAINT "Week_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Week" ("friday", "id", "monday", "thursday", "totalHours", "tusday", "wednesday") SELECT "friday", "id", "monday", "thursday", "totalHours", "tusday", "wednesday" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
