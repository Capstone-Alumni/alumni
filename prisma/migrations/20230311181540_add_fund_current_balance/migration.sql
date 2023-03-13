SELECT template.run_migration('
-- AlterTable
ALTER TABLE "funds" ADD COLUMN     "currect_balance" BIGINT NOT NULL DEFAULT 0,
ALTER COLUMN "target_balance" SET DATA TYPE BIGINT;
');
