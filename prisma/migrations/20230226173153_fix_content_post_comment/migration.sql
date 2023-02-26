SELECT template.run_migration('
-- AlterTable
ALTER TABLE "post_comments" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DATA TYPE TEXT;
');
