/*
  Warnings:

  - You are about to drop the column `is_approved` on the `events` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "events" DROP COLUMN "is_approved",
ADD COLUMN     "approved_status" INTEGER NOT NULL DEFAULT -1;
');
