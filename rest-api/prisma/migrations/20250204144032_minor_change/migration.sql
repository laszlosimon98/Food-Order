/*
  Warnings:

  - You are about to drop the column `reviewDate` on the `Reviews` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reviews" (
    "reviewId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "isEditable" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("createdAt", "foodId", "isEditable", "rating", "reviewId", "reviewText", "updatedAt", "userId") SELECT "createdAt", "foodId", "isEditable", "rating", "reviewId", "reviewText", "updatedAt", "userId" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
