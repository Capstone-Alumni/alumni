/*
  Warnings:

  - You are about to drop the column `account_id` on the `alumni` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- DropIndex
DROP INDEX "alumni_account_id_key";

-- AlterTable
ALTER TABLE "alumni" DROP COLUMN "account_id";
')
