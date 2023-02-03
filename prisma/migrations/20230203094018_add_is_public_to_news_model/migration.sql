-- AlterTable
SELECT migrate_schema(
    '
        ALTER TABLE "news" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
    '
)
