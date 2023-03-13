/*
  Warnings:

  - You are about to alter the column `target_balance` on the `funds` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `currect_balance` on the `funds` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "funds" ALTER COLUMN "target_balance" SET DATA TYPE INTEGER,
ALTER COLUMN "currect_balance" SET DATA TYPE INTEGER;
');
