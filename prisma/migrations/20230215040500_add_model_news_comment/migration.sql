
SELECT template.run_migration('
-- CreateTable
CREATE TABLE "(news_comment)" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment_content" TEXT NOT NULL,
    "commenter_id" TEXT NOT NULL,
    "news_id" TEXT NOT NULL,

    CONSTRAINT "(news_comment)_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "(news_comment)" ADD CONSTRAINT "(news_comment)_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
