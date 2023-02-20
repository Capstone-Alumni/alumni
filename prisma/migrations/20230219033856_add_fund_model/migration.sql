SELECT template.run_migration('
-- CreateTable
CREATE TABLE "funds" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "is_offline" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "is_ended" BOOLEAN NOT NULL DEFAULT false,
    "target_balance" INTEGER NOT NULL DEFAULT 0,
    "current_balance" INTEGER NOT NULL DEFAULT 0,
    "target_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_status" INTEGER NOT NULL DEFAULT -1,
    "publicity" "template"."AccessLevel" NOT NULL DEFAULT ''ALUMNI'',
    "public_participant" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "funds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fund_saved" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fund_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "fund_saved_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "funds" ADD CONSTRAINT "funds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_saved" ADD CONSTRAINT "fund_saved_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_saved" ADD CONSTRAINT "fund_saved_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
');
