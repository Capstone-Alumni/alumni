/*
  Warnings:

  - You are about to drop the column `expired_at` on the `recruitments` table. All the data in the column will be lost.
  - You are about to drop the column `isApproved` on the `recruitments` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `recruitments` table. All the data in the column will be lost.

*/
-- AlterTable
SELECT template.run_migration('
ALTER TABLE "recruitments" DROP COLUMN "expired_at",
DROP COLUMN "isApproved",
DROP COLUMN "start_at",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
')