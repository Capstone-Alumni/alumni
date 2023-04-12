/*
  Warnings:

  - You are about to drop the column `fullName` on the `informations` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "informations" DROP COLUMN "fullName",
ADD COLUMN     "full_name" TEXT;
');
