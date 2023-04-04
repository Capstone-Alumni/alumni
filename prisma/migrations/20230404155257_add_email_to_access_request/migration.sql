/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `access_requests` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
SELECT template.run_migration('
ALTER TABLE "access_requests" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "access_requests_email_key" ON "access_requests"("email");
');