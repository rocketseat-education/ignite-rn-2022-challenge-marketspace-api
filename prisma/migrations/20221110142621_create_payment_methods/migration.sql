/*
  Warnings:

  - You are about to drop the column `payment_methods` on the `Products` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PaymentMethodsToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PaymentMethodsToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "PaymentMethods" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaymentMethodsToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_new" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,
    "accept_trade" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("accept_trade", "created_at", "deleted_at", "description", "id", "is_active", "is_new", "name", "price", "updated_at", "user_id") SELECT "accept_trade", "created_at", "deleted_at", "description", "id", "is_active", "is_new", "name", "price", "updated_at", "user_id" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethods_key_key" ON "PaymentMethods"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentMethodsToProducts_AB_unique" ON "_PaymentMethodsToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentMethodsToProducts_B_index" ON "_PaymentMethodsToProducts"("B");
