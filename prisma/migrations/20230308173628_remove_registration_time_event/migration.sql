/*
  Warnings:

  - You are about to drop the column `registration_time` on the `events` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "events" DROP COLUMN "registration_time";
');
