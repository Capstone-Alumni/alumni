/*
  Warnings:

  - You are about to drop the column `backgroundImage` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `public_participant` on the `funds` table. All the data in the column will be lost.
  - You are about to drop the column `publicity` on the `funds` table. All the data in the column will be lost.
  - Made the column `end_time` on table `funds` required. This step will fail if there are existing NULL values in that column.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "funds" DROP COLUMN "backgroundImage",
DROP COLUMN "public_participant",
DROP COLUMN "publicity",
ADD COLUMN     "background_image" TEXT,
ALTER COLUMN "end_time" SET NOT NULL;
');

-- DropEnum
DROP TYPE "AccessLevel";

-- DropEnum
DROP TYPE "AccessMode";

-- DropEnum
DROP TYPE "AccessStatus";
