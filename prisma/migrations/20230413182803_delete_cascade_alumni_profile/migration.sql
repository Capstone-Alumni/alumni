SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_alumni_id_fkey";

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
');
