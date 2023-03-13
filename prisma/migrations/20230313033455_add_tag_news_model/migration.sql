SELECT template.run_migration('
-- CreateTable
CREATE TABLE "tags_news" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tag_name" TEXT NOT NULL,

    CONSTRAINT "tags_news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_news_on_news" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "news_id" TEXT NOT NULL,
    "tag_news_id" TEXT NOT NULL,

    CONSTRAINT "tags_news_on_news_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tags_news_on_news" ADD CONSTRAINT "tags_news_on_news_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_news_on_news" ADD CONSTRAINT "tags_news_on_news_tag_news_id_fkey" FOREIGN KEY ("tag_news_id") REFERENCES "tags_news"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
