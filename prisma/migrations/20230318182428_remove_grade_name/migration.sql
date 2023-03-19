/*
  Warnings:

  - You are about to drop the column `name` on the `grades` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "grades" DROP COLUMN "name";
');
