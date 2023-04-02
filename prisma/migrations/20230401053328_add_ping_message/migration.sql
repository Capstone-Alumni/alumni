SELECT template.run_migration('
-- CreateTable
CREATE TABLE "pings" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "pingerInfoId" TEXT NOT NULL,

    CONSTRAINT "pings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pings" ADD CONSTRAINT "pings_pingerInfoId_fkey" FOREIGN KEY ("pingerInfoId") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
');