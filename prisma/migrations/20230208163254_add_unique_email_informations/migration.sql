/*
  Warnings:

  - You are about to drop the column `email_publicity` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `informations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `informations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `informations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
SELECT template.run_migration('
ALTER TABLE "informations" DROP COLUMN "email_publicity",
DROP COLUMN "user_email",
ADD COLUMN     "email" TEXT NOT NULL;
');

-- CreateIndex
SELECT template.run_migration('
CREATE UNIQUE INDEX "informations_email_key" ON "informations"("email");
');