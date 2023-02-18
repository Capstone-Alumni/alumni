/*
  Warnings:

  - You are about to drop the column `class_id` on the `informations` table. All the data in the column will be lost.
  - You are about to drop the `classes` table. If the table is not empty, all the data it contains will be lost.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_grade_id_fkey";

-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_class_id_fkey";

-- AlterTable
ALTER TABLE "informations" DROP COLUMN "class_id",
ADD COLUMN     "alum_class_id" TEXT;

-- DropTable
DROP TABLE "classes";

-- CreateTable
CREATE TABLE "alum_classes" (
    "id" TEXT NOT NULL,
    "grade_id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "alum_classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alum_classes" ADD CONSTRAINT "alum_classes_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "alum_classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
');