/*
  Warnings:

  - A unique constraint covering the columns `[start_year,end_year]` on the table `grades` will be added. If there are existing duplicate values, this will fail.

*/
SELECT template.run_migration('
-- CreateIndex
CREATE UNIQUE INDEX "grades_start_year_end_year_key" ON "grades"("start_year", "end_year");
');
