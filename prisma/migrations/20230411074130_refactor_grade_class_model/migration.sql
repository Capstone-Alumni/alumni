/*
  Warnings:

  - You are about to drop the column `description` on the `alum_classes` table. All the data in the column will be lost.
  - You are about to drop the column `access_level` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `access_status` on the `alumni` table. All the data in the column will be lost.
  - You are about to drop the column `account_email` on the `alumni` table. All the data in the column will be lost.
  - Added the required column `end_year` to the `grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_year` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "alum_classes" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "alumni" DROP COLUMN "access_level",
DROP COLUMN "access_status",
DROP COLUMN "account_email",
ALTER COLUMN "account_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "end_year" INTEGER NOT NULL,
ADD COLUMN     "start_year" INTEGER NOT NULL,
ALTER COLUMN "code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "informations" ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AlumniToClass" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alum_class_id" TEXT NOT NULL,
    "alumni_id" TEXT NOT NULL,

    CONSTRAINT "AlumniToClass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlumniToClass" ADD CONSTRAINT "AlumniToClass_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "alum_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumniToClass" ADD CONSTRAINT "AlumniToClass_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');