-- DropIndex
SELECT template.run_migration('
DROP INDEX "news_comment_commenter_info_id_key";
');
