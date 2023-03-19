/*
  Warnings:

  - You are about to drop the column `is_owner` on the `alumni` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "alumni" DROP COLUMN "is_owner";
');
