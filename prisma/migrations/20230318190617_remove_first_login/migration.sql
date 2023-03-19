/*
  Warnings:

  - You are about to drop the column `first_login` on the `alumni` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "alumni" DROP COLUMN "first_login";
');
