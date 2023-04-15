SELECT template.run_migration('
-- AlterTable
ALTER TABLE "funds" ADD COLUMN     "backgroundImage" TEXT;
');
