/*
  Warnings:

  - Added the required column `is_approved` to the `access_requests` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "access_requests" ADD COLUMN     "is_approved" BOOLEAN NOT NULL;
');
