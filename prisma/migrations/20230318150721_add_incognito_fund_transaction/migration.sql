SELECT template.run_migration('
-- AlterTable
ALTER TABLE "fund_transactions" ADD COLUMN     "incognito" BOOLEAN NOT NULL DEFAULT false;
');
