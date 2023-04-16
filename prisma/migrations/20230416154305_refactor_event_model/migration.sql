/*
  Warnings:

  - You are about to drop the column `approved_status` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `is_ended` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `publicity` on the `events` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "events" DROP COLUMN "approved_status",
DROP COLUMN "is_ended",
DROP COLUMN "publicity",
ADD COLUMN     "grade_id" TEXT,
ADD COLUMN     "is_public_school" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE SET NULL ON UPDATE CASCADE;
')
