/*
  Warnings:

  - The primary key for the `tags_news_on_news` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tags_news_on_news` table. All the data in the column will be lost.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "tags_news_on_news" DROP CONSTRAINT "tags_news_on_news_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "tags_news_on_news_pkey" PRIMARY KEY ("news_id", "tag_news_id");
');
