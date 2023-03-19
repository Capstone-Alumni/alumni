/*
  Warnings:

  - You are about to drop the `_NewsToTagsNews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tag_news_id` to the `news` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "_NewsToTagsNews" DROP CONSTRAINT "_NewsToTagsNews_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToTagsNews" DROP CONSTRAINT "_NewsToTagsNews_B_fkey";

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "tag_news_id" TEXT;

-- DropTable
DROP TABLE "_NewsToTagsNews";

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_tag_news_id_fkey" FOREIGN KEY ("tag_news_id") REFERENCES "tags_news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');