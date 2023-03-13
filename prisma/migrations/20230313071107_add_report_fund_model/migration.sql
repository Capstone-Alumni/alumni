SELECT template.run_migration('
-- CreateTable
CREATE TABLE "fund_reports" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "fund_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "fund_reports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fund_reports" ADD CONSTRAINT "fund_reports_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_reports" ADD CONSTRAINT "fund_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
');