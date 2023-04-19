/*
  Warnings:

  - You are about to drop the column `password` on the `access_requests` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "access_requests" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "alumni" ADD COLUMN     "last_login" TIMESTAMP(3);
')
