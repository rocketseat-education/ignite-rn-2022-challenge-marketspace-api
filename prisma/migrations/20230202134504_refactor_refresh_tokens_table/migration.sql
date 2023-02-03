/*
  Warnings:

  - You are about to drop the `UsersTokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favorited_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `deleted_at` on the `Products` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UsersTokens_user_id_key";

-- DropIndex
DROP INDEX "_favorited_products_B_index";

-- DropIndex
DROP INDEX "_favorited_products_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UsersTokens";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_favorited_products";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RefreshTokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expires_in" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RefreshTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("accept_trade", "created_at", "description", "id", "is_active", "is_new", "name", "price", "updated_at", "user_id") SELECT "accept_trade", "created_at", "description", "id", "is_active", "is_new", "name", "price", "updated_at", "user_id" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_user_id_key" ON "RefreshTokens"("user_id");
