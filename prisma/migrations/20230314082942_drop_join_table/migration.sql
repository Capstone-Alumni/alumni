/*
  Warnings:

  - You are about to drop the `tags_news_on_news` table. If the table is not empty, all the data it contains will be lost.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "tags_news_on_news" DROP CONSTRAINT "tags_news_on_news_news_id_fkey";

-- DropForeignKey
ALTER TABLE "tags_news_on_news" DROP CONSTRAINT "tags_news_on_news_tag_news_id_fkey";

-- DropTable
DROP TABLE "tags_news_on_news";

-- CreateTable
CREATE TABLE "_NewsToTagsNews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToTagsNews_AB_unique" ON "_NewsToTagsNews"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToTagsNews_B_index" ON "_NewsToTagsNews"("B");

-- AddForeignKey
ALTER TABLE "_NewsToTagsNews" ADD CONSTRAINT "_NewsToTagsNews_A_fkey" FOREIGN KEY ("A") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToTagsNews" ADD CONSTRAINT "_NewsToTagsNews_B_fkey" FOREIGN KEY ("B") REFERENCES "tags_news"("id") ON DELETE CASCADE ON UPDATE CASCADE;
');
