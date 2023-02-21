SELECT template.run_migration('
-- AlterTable
ALTER TABLE "recruitments" ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
');
