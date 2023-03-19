/*
  Warnings:

  - You are about to drop the column `tag_news_id` on the `news` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_tag_news_id_fkey";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "tag_news_id";

-- CreateTable
CREATE TABLE "_news_to_tag_news" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_news_to_tag_news_AB_unique" ON "_news_to_tag_news"("A", "B");

-- CreateIndex
CREATE INDEX "_news_to_tag_news_B_index" ON "_news_to_tag_news"("B");

-- AddForeignKey
ALTER TABLE "_news_to_tag_news" ADD CONSTRAINT "_news_to_tag_news_A_fkey" FOREIGN KEY ("A") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_news_to_tag_news" ADD CONSTRAINT "_news_to_tag_news_B_fkey" FOREIGN KEY ("B") REFERENCES "tags_news"("id") ON DELETE CASCADE ON UPDATE CASCADE;
');
