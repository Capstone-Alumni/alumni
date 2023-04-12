/*
  Warnings:

  - You are about to drop the `AlumniToClass` table. If the table is not empty, all the data it contains will be lost.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "AlumniToClass" DROP CONSTRAINT "AlumniToClass_alum_class_id_fkey";

-- DropForeignKey
ALTER TABLE "AlumniToClass" DROP CONSTRAINT "AlumniToClass_alumni_id_fkey";

-- DropTable
DROP TABLE "AlumniToClass";

-- CreateTable
CREATE TABLE "alumni_to_class" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alum_class_id" TEXT NOT NULL,
    "alumni_id" TEXT NOT NULL,

    CONSTRAINT "alumni_to_class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alumni_to_class" ADD CONSTRAINT "alumni_to_class_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "alum_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumni_to_class" ADD CONSTRAINT "alumni_to_class_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
