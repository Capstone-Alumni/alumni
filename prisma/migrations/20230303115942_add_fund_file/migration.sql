SELECT template.run_migration('
-- AlterTable
ALTER TABLE "funds" ADD COLUMN     "statement_file" TEXT;
');
