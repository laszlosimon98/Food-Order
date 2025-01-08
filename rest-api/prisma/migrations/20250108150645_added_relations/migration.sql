/*
  Warnings:

  - You are about to drop the `Dishes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ordersOrderId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryStatusStatusId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Dishes_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Dishes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "reviews";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Foods" (
    "foodId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isSpice" BOOLEAN NOT NULL DEFAULT false,
    "isVegetarian" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "orderItemsOrderItemId" INTEGER,
    "categoriesCategoryId" INTEGER NOT NULL,
    CONSTRAINT "Foods_orderItemsOrderItemId_fkey" FOREIGN KEY ("orderItemsOrderItemId") REFERENCES "OrderItems" ("orderItemId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Foods_categoriesCategoryId_fkey" FOREIGN KEY ("categoriesCategoryId") REFERENCES "Categories" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reviews" (
    "reviewId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "reviewDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "usersUserId" INTEGER,
    "foodId" INTEGER,
    CONSTRAINT "Reviews_usersUserId_fkey" FOREIGN KEY ("usersUserId") REFERENCES "Users" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Reviews_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserFavoriteFoods" (
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "addedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "foodId"),
    CONSTRAINT "UserFavoriteFoods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserFavoriteFoods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FoodsToPromotions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FoodsToPromotions_A_fkey" FOREIGN KEY ("A") REFERENCES "Foods" ("foodId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FoodsToPromotions_B_fkey" FOREIGN KEY ("B") REFERENCES "Promotions" ("promotionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItems" (
    "orderItemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ordersOrderId" INTEGER NOT NULL,
    CONSTRAINT "OrderItems_ordersOrderId_fkey" FOREIGN KEY ("ordersOrderId") REFERENCES "Orders" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "usersUserId" INTEGER,
    "deliveryStatusStatusId" INTEGER NOT NULL,
    CONSTRAINT "Orders_usersUserId_fkey" FOREIGN KEY ("usersUserId") REFERENCES "Users" ("userId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Orders_deliveryStatusStatusId_fkey" FOREIGN KEY ("deliveryStatusStatusId") REFERENCES "DeliveryStatus" ("statusId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("createdAt", "orderDate", "orderId", "totalPrice", "updatedAt") SELECT "createdAt", "orderDate", "orderId", "totalPrice", "updatedAt" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Foods_name_key" ON "Foods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodsToPromotions_AB_unique" ON "_FoodsToPromotions"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodsToPromotions_B_index" ON "_FoodsToPromotions"("B");
