-- CreateTable
SELECT template.run_migration(
    '
        CREATE TABLE "news" (
            "id" TEXT NOT NULL,
            "archived" BOOLEAN NOT NULL DEFAULT false,
            "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "title" TEXT NOT NULL,
            "content" TEXT NOT NULL,
            "author_id" TEXT NOT NULL,

            CONSTRAINT "news_pkey" PRIMARY KEY ("id")
        );
    '
);
