SELECT template.run_migration('
-- AlterTable
ALTER TABLE "fund_transactions" ALTER COLUMN "vnp_amount" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "funds" ALTER COLUMN "target_balance" SET DATA TYPE BIGINT,
ALTER COLUMN "currect_balance" SET DATA TYPE BIGINT;
')