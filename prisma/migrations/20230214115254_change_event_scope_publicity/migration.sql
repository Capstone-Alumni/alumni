/*
  Warnings:

  - The `publicity` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "events" DROP COLUMN "publicity",
ADD COLUMN     "publicity" "template"."AccessLevel" NOT NULL DEFAULT ''ALUMNI'';
');