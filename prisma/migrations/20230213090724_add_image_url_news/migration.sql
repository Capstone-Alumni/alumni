/*
  Warnings:

  - You are about to drop the column `isPublic` on the `news` table. All the data in the column will be lost.
  - Added the required column `news_image_url` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
SELECT template.run_migration('
  ALTER TABLE "news" DROP COLUMN "isPublic",
  ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN     "news_image_url" TEXT;
');
