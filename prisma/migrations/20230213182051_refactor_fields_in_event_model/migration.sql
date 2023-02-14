/*
  Warnings:

  - You are about to drop the column `hostInformationId` on the `events` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_hostInformationId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "hostInformationId",
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "end_time" DROP NOT NULL;
');
