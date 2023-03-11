/*
  Warnings:

  - Added the required column `email` to the `access_requests` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- CreateTable
CREATE TABLE "fund_transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vpn_version" TEXT NOT NULL,
    "vnp_commnad" TEXT NOT NULL,
    "vnp_tmn_code" TEXT NOT NULL,
    "vnp_amount" INTEGER NOT NULL,
    "vnp_bank_code" TEXT,
    "vnp_create_date" TEXT NOT NULL,
    "vnp_CurrCode" TEXT NOT NULL,
    "vnp_ip_addr" TEXT NOT NULL,
    "vnp_locale" TEXT NOT NULL,
    "vnp_order_info" TEXT NOT NULL,
    "vpn_order_type" TEXT NOT NULL,
    "vnp_txn_ref" TEXT NOT NULL,
    "vnp_transaction_no" TEXT,
    "vnp_response_code" TEXT,
    "vnp_transaction_status" TEXT,
    "fund_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "fund_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fund_transactions_vnp_txn_ref_key" ON "fund_transactions"("vnp_txn_ref");

-- AddForeignKey
ALTER TABLE "fund_transactions" ADD CONSTRAINT "fund_transactions_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transactions" ADD CONSTRAINT "fund_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
