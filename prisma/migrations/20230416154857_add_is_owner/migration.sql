SELECT template.run_migration('
-- AlterTable
ALTER TABLE "alumni" ADD COLUMN     "is_owner" BOOLEAN NOT NULL DEFAULT false;
');
