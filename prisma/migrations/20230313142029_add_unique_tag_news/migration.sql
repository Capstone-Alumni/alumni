/*
  Warnings:

  - A unique constraint covering the columns `[tag_name]` on the table `tags_news` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
SELECT template.run_migration('
CREATE UNIQUE INDEX "tags_news_tag_name_key" ON "tags_news"("tag_name");
');
