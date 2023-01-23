/*
  Warnings:

  - You are about to drop the column `endDate` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `careers` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_title` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `careers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "careers" DROP CONSTRAINT "careers_userId_fkey";

-- DropIndex
DROP INDEX "careers_userId_key";

-- AlterTable
ALTER TABLE "careers" DROP COLUMN "endDate",
DROP COLUMN "jobTitle",
DROP COLUMN "startDate",
DROP COLUMN "userId",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "job_title" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "careers" ADD CONSTRAINT "careers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
