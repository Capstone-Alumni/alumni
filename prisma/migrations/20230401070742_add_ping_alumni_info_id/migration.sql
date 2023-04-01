/*
  Warnings:

  - Added the required column `pingAlumniInfoId` to the `pings` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "pings" ADD COLUMN     "pingAlumniInfoId" TEXT NOT NULL;
');