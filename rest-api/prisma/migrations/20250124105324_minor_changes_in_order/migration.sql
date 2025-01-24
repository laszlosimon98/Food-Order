/*
  Warnings:

  - Added the required column `fullname` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orders" (
    "orderId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalOrderPrice" INTEGER NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "fullname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "deliveryStatusId" INTEGER NOT NULL,
    CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_deliveryStatusId_fkey" FOREIGN KEY ("deliveryStatusId") REFERENCES "DeliveryStatus" ("statusId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("address", "createdAt", "deliveryStatusId", "orderDate", "orderId", "phoneNumber", "totalOrderPrice", "updatedAt", "userId") SELECT "address", "createdAt", "deliveryStatusId", "orderDate", "orderId", "phoneNumber", "totalOrderPrice", "updatedAt", "userId" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
