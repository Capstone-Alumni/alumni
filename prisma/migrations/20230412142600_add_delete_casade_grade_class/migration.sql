SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "alum_classes" DROP CONSTRAINT "alum_classes_grade_id_fkey";

-- AddForeignKey
ALTER TABLE "alum_classes" ADD CONSTRAINT "alum_classes_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
');
