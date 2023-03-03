SELECT template.run_migration('
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "backgroundImage" TEXT;
');
