/*
  Warnings:

  - You are about to drop the column `classId` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `gradeId` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `informations` table. All the data in the column will be lost.
  - Added the required column `class_id` to the `informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name` to the `informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade_code` to the `informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade_id` to the `informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade_name` to the `informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_full_name` to the `informations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_classId_fkey";

-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_gradeId_fkey";

-- AlterTable
ALTER TABLE "informations" DROP COLUMN "classId",
DROP COLUMN "email",
DROP COLUMN "gradeId",
DROP COLUMN "name",
ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "class_name" TEXT NOT NULL,
ADD COLUMN     "grade_code" TEXT NOT NULL,
ADD COLUMN     "grade_id" TEXT NOT NULL,
ADD COLUMN     "grade_name" TEXT NOT NULL,
ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_full_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
