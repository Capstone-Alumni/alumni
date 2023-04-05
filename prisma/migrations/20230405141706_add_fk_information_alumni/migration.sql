/*
  Warnings:

  - A unique constraint covering the columns `[account_id]` on the table `alumni` will be added. If there are existing duplicate values, this will fail.

*/
SELECT template.run_migration('
-- CreateIndex
CREATE UNIQUE INDEX "alumni_account_id_key" ON "alumni"("account_id");

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "alumni"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
