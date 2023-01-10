/*
  Warnings:

  - You are about to drop the column `class_id` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `grade_id` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `user_full_name` on the `informations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `informations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,user_email]` on the table `informations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `informations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_class_id_fkey";

-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_userId_fkey";

-- AlterTable
ALTER TABLE "informations" DROP COLUMN "class_id",
DROP COLUMN "grade_id",
DROP COLUMN "user_full_name",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "informations_user_email_key" ON "informations"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "informations_userId_user_email_key" ON "informations"("userId", "user_email");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_email_key" ON "users"("id", "email");

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_userId_user_email_fkey" FOREIGN KEY ("userId", "user_email") REFERENCES "users"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
