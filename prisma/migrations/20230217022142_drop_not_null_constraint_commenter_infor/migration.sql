SELECT template.run_migration('
    -- DropForeignKey
    ALTER TABLE "news_comment" DROP CONSTRAINT "news_comment_commenter_info_id_fkey";

    -- AlterTable
    ALTER TABLE "news_comment" ALTER COLUMN "commenter_info_id" DROP NOT NULL;

    -- AddForeignKey
    ALTER TABLE "news_comment" ADD CONSTRAINT "news_comment_commenter_info_id_fkey" FOREIGN KEY ("commenter_info_id") REFERENCES "informations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
');
