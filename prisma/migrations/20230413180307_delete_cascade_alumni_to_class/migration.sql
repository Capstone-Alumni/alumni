SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "alumni_to_class" DROP CONSTRAINT "alumni_to_class_alum_class_id_fkey";

-- DropForeignKey
ALTER TABLE "alumni_to_class" DROP CONSTRAINT "alumni_to_class_alumni_id_fkey";

-- AddForeignKey
ALTER TABLE "alumni_to_class" ADD CONSTRAINT "alumni_to_class_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "alum_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumni_to_class" ADD CONSTRAINT "alumni_to_class_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
');
