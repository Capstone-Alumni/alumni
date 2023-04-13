/*
  Warnings:

  - A unique constraint covering the columns `[alum_class_id,alumni_id]` on the table `alumni_to_class` will be added. If there are existing duplicate values, this will fail.

*/
SELECT template.run_migration('
-- CreateIndex
CREATE UNIQUE INDEX "alumni_to_class_alum_class_id_alumni_id_key" ON "alumni_to_class"("alum_class_id", "alumni_id");
');
