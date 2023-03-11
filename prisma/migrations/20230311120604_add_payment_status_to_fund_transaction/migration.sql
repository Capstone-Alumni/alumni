SELECT template.run_migration('
-- AlterTable
ALTER TABLE "fund_transactions" ADD COLUMN     "payment_status" INTEGER NOT NULL DEFAULT 0;
');
