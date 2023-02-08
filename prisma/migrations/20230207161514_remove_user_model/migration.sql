/*
  Warnings:

  - You are about to drop the column `class_name` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `grade_code` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `grade_name` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
SELECT template.run_migration('
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";
');

-- DropForeignKey
SELECT template.run_migration('
ALTER TABLE "careers" DROP CONSTRAINT "careers_user_id_fkey";
');

-- DropForeignKey
SELECT template.run_migration('
ALTER TABLE "educations" DROP CONSTRAINT "educations_user_id_fkey";
');

-- DropForeignKey
SELECT template.run_migration('
ALTER TABLE "informations" DROP CONSTRAINT "informations_userId_fkey";
');

-- DropForeignKey
SELECT template.run_migration('
ALTER TABLE "users" DROP CONSTRAINT "users_class_id_fkey";
');

-- AlterTable
SELECT template.run_migration('
ALTER TABLE "informations" DROP COLUMN "class_name",
DROP COLUMN "grade_code",
DROP COLUMN "grade_name",
ADD COLUMN     "class_id" TEXT;
');

-- DropTable
SELECT template.run_migration('
DROP TABLE "accounts";
');

-- DropTable
SELECT template.run_migration('
DROP TABLE "users";
');

-- AddForeignKey
SELECT template.run_migration('
ALTER TABLE "informations" ADD CONSTRAINT "informations_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
');