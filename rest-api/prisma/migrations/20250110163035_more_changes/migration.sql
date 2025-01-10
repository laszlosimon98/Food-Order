/*
  Warnings:

  - You are about to drop the `UserFavoriteFoods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `orderItemId` on the `Foods` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[statusName]` on the table `DeliveryStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foodId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foodId` on table `Reviews` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserFavoriteFoods";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FavoritesOnFoods" (
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "addedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "foodId"),
    CONSTRAINT "FavoritesOnFoods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoritesOnFoods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Foods" (
    "foodId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isSpice" BOOLEAN NOT NULL DEFAULT false,
    "isVegetarian" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Foods_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Foods" ("categoryId", "createdAt", "description", "foodId", "imageUrl", "isSpice", "isVegetarian", "name", "price", "updatedAt") SELECT "categoryId", "createdAt", "description", "foodId", "imageUrl", "isSpice", "isVegetarian", "name", "price", "updatedAt" FROM "Foods";
DROP TABLE "Foods";
ALTER TABLE "new_Foods" RENAME TO "Foods";
CREATE UNIQUE INDEX "Foods_name_key" ON "Foods"("name");
CREATE TABLE "new_OrderItems" (
    "orderItemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "orderId" INTEGER,
    "foodId" INTEGER NOT NULL,
    CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders" ("orderId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItems_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("createdAt", "orderId", "orderItemId", "price", "quantity", "updatedAt") SELECT "createdAt", "orderId", "orderItemId", "price", "quantity", "updatedAt" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
CREATE TABLE "new_Orders" (
    "orderId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalPrice" INTEGER NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "deliveryStatusId" INTEGER NOT NULL,
    CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_deliveryStatusId_fkey" FOREIGN KEY ("deliveryStatusId") REFERENCES "DeliveryStatus" ("statusId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("createdAt", "deliveryStatusId", "orderDate", "orderId", "totalPrice", "updatedAt", "userId") SELECT "createdAt", "deliveryStatusId", "orderDate", "orderId", "totalPrice", "updatedAt", "userId" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE TABLE "new_Reviews" (
    "reviewId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "reviewDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("createdAt", "foodId", "rating", "reviewDate", "reviewId", "reviewText", "updatedAt", "userId") SELECT "createdAt", "foodId", "rating", "reviewDate", "reviewId", "reviewText", "updatedAt", "userId" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryStatus_statusName_key" ON "DeliveryStatus"("statusName");
