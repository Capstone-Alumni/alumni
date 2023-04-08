/*
  Warnings:

  - A unique constraint covering the columns `[grade_id,name]` on the table `alum_classes` will be added. If there are existing duplicate values, this will fail.

*/
SELECT template.run_migration('
-- CreateIndex
CREATE UNIQUE INDEX "alum_classes_grade_id_name_key" ON "alum_classes"("grade_id", "name");
');
