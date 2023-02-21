
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_author_info_id_fkey";

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "author_info_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_author_info_id_fkey" FOREIGN KEY ("author_info_id") REFERENCES "informations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
');
