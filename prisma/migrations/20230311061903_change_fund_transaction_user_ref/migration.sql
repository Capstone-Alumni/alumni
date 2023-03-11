SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "fund_transactions" DROP CONSTRAINT "fund_transactions_user_id_fkey";

-- AddForeignKey
ALTER TABLE "fund_transactions" ADD CONSTRAINT "fund_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
');
