SELECT template.run_migration('
-- AlterTable
ALTER TABLE "recruitments" ADD COLUMN     "company_image_url" TEXT;
');