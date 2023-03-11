/*
  Warnings:

  - You are about to drop the column `approved_status` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `current_balance` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `is_ended` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `is_offline` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `statement_file` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `target_updated` on the `funds` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "funds" DROP COLUMN "approved_status",
DROP COLUMN "current_balance",
DROP COLUMN "is_ended",
DROP COLUMN "is_offline",
DROP COLUMN "location",
DROP COLUMN "statement_file",
DROP COLUMN "target_updated",
ALTER COLUMN "end_time" SET DEFAULT CURRENT_TIMESTAMP;
');
