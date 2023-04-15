/*
  Warnings:

  - The `is_approved` column on the `access_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "access_requests" DROP COLUMN "is_approved",
ADD COLUMN     "is_approved" INTEGER NOT NULL DEFAULT 1;
')
