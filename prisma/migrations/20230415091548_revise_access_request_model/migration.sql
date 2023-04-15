/*
  Warnings:

  - You are about to drop the column `fullName` on the `access_requests` table. All the data in the column will be lost.
  - You are about to drop the column `grade_id` on the `access_requests` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `access_requests` table. All the data in the column will be lost.
  - You are about to drop the column `alum_class_id` on the `informations` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `access_requests` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `access_requests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `full_name` on table `informations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `alumni_id` on table `informations` required. This step will fail if there are existing NULL values in that column.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "access_requests" DROP CONSTRAINT "access_requests_alum_class_id_fkey";

-- DropForeignKey
ALTER TABLE "access_requests" DROP CONSTRAINT "access_requests_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_alum_class_id_fkey";

-- DropIndex
DROP INDEX "access_requests_email_key";

-- AlterTable
ALTER TABLE "access_requests" DROP COLUMN "fullName",
DROP COLUMN "grade_id",
DROP COLUMN "user_id",
ADD COLUMN     "alumni_id" TEXT,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "is_approved" SET DEFAULT false,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "informations" DROP COLUMN "alum_class_id",
ALTER COLUMN "full_name" SET NOT NULL,
ALTER COLUMN "alumni_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "access_requests" ADD CONSTRAINT "access_requests_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "alum_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_requests" ADD CONSTRAINT "access_requests_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
')
