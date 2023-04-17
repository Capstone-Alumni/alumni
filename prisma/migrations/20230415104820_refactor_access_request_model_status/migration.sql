/*
  Warnings:

  - You are about to drop the column `is_approved` on the `access_requests` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "access_requests" DROP COLUMN "is_approved",
ADD COLUMN     "request_status" INTEGER NOT NULL DEFAULT 0;
')
