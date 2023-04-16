SELECT template.run_migration('
-- AlterTable
ALTER TABLE "recruitments" ADD COLUMN     "yearsOfExperience" TEXT;
');