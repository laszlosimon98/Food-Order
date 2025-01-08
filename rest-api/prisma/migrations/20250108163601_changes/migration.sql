/*
  Warnings:

  - You are about to drop the column `categoriesCategoryId` on the `Foods` table. All the data in the column will be lost.
  - You are about to drop the column `orderItemsOrderItemId` on the `Foods` table. All the data in the column will be lost.
  - You are about to drop the column `ordersOrderId` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryStatusStatusId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `usersUserId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `usersUserId` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryStatusId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
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
    "orderItemId" INTEGER,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Foods_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItems" ("orderItemId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Foods_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Foods" ("createdAt", "description", "foodId", "imageUrl", "isSpice", "isVegetarian", "name", "price", "updatedAt") SELECT "createdAt", "description", "foodId", "imageUrl", "isSpice", "isVegetarian", "name", "price", "updatedAt" FROM "Foods";
DROP TABLE "Foods";
ALTER TABLE "new_Foods" RENAME TO "Foods";
CREATE UNIQUE INDEX "Foods_name_key" ON "Foods"("name");
CREATE TABLE "new_OrderItems" (
    "orderItemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("createdAt", "orderItemId", "price", "quantity", "updatedAt") SELECT "createdAt", "orderItemId", "price", "quantity", "updatedAt" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
CREATE TABLE "new_Orders" (
    "orderId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalPrice" INTEGER NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "deliveryStatusId" INTEGER NOT NULL,
    CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Orders_deliveryStatusId_fkey" FOREIGN KEY ("deliveryStatusId") REFERENCES "DeliveryStatus" ("statusId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("createdAt", "orderDate", "orderId", "totalPrice", "updatedAt") SELECT "createdAt", "orderDate", "orderId", "totalPrice", "updatedAt" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE TABLE "new_Reviews" (
    "reviewId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "reviewDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER,
    "foodId" INTEGER,
    CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Reviews_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("createdAt", "foodId", "rating", "reviewDate", "reviewId", "reviewText", "updatedAt") SELECT "createdAt", "foodId", "rating", "reviewDate", "reviewId", "reviewText", "updatedAt" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
