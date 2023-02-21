SELECT template.run_migration('
-- AlterTable
ALTER TABLE "recruitments" ADD COLUMN     "recruitment_owner_info_id" TEXT,
ALTER COLUMN "recruitment_owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "recruitments" ADD CONSTRAINT "recruitments_recruitment_owner_info_id_fkey" FOREIGN KEY ("recruitment_owner_info_id") REFERENCES "informations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
');
