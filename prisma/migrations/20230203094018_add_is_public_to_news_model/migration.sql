-- AlterTable
SELECT run_migration(
    '
        ALTER TABLE "news" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
    '
)
