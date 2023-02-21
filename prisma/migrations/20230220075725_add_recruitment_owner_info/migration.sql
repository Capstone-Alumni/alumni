SELECT template.run_migration('
-- AlterTable
ALTER TABLE "recruitments" ALTER COLUMN "recruitment_owner_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "recruitments" ADD CONSTRAINT "recruitments_recruitment_owner_id_fkey" FOREIGN KEY ("recruitment_owner_id") REFERENCES "informations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
')