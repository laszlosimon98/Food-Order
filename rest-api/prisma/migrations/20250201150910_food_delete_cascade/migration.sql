-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoritesOnFoods" (
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "addedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "foodId"),
    CONSTRAINT "FavoritesOnFoods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FavoritesOnFoods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FavoritesOnFoods" ("addedAt", "foodId", "userId") SELECT "addedAt", "foodId", "userId" FROM "FavoritesOnFoods";
DROP TABLE "FavoritesOnFoods";
ALTER TABLE "new_FavoritesOnFoods" RENAME TO "FavoritesOnFoods";
CREATE TABLE "new_OrderItems" (
    "orderItemId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "orderId" INTEGER,
    "foodId" INTEGER NOT NULL,
    CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders" ("orderId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItems_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderItems" ("createdAt", "foodId", "orderId", "orderItemId", "quantity", "totalPrice", "updatedAt") SELECT "createdAt", "foodId", "orderId", "orderItemId", "quantity", "totalPrice", "updatedAt" FROM "OrderItems";
DROP TABLE "OrderItems";
ALTER TABLE "new_OrderItems" RENAME TO "OrderItems";
CREATE TABLE "new_Reviews" (
    "reviewId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "reviewText" TEXT,
    "reviewDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "isEditable" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reviews_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods" ("foodId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("createdAt", "foodId", "isEditable", "rating", "reviewDate", "reviewId", "reviewText", "updatedAt", "userId") SELECT "createdAt", "foodId", "isEditable", "rating", "reviewDate", "reviewId", "reviewText", "updatedAt", "userId" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
