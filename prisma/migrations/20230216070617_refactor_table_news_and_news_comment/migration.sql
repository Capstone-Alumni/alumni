/*
  Warnings:

  - You are about to drop the `(news_comment)` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[author_info_id]` on the table `news` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_info_id` to the `news` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "(news_comment)" DROP CONSTRAINT "(news_comment)_commenter_info_id_fkey";

-- DropForeignKey
ALTER TABLE "(news_comment)" DROP CONSTRAINT "(news_comment)_news_id_fkey";

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "author_info_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "(news_comment)";

-- CreateTable
CREATE TABLE "news_comment" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment_content" TEXT NOT NULL,
    "commenter_id" TEXT NOT NULL,
    "commenter_info_id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,

    CONSTRAINT "news_comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_comment_commenter_info_id_key" ON "news_comment"("commenter_info_id");

-- CreateIndex
CREATE UNIQUE INDEX "news_author_info_id_key" ON "news"("author_info_id");

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_author_info_id_fkey" FOREIGN KEY ("author_info_id") REFERENCES "informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_comment" ADD CONSTRAINT "news_comment_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_comment" ADD CONSTRAINT "news_comment_commenter_info_id_fkey" FOREIGN KEY ("commenter_info_id") REFERENCES "informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
