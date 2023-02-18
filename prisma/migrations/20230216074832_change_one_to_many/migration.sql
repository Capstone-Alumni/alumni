-- DropIndex
SELECT template.run_migration('
DROP INDEX "news_author_info_id_key";
');