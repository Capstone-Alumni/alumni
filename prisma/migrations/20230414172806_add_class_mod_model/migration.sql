SELECT template.run_migration('
-- AlterTable
ALTER TABLE "alumni_to_class" ADD COLUMN     "is_class_mod" BOOLEAN NOT NULL DEFAULT false;
')
