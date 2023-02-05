-- AlterTable
SELECT migrate_schema(
    '
      ALTER TABLE "informations" ADD COLUMN     "career_publicity" "ScopePublicity" NOT NULL,
      ADD COLUMN     "education_publicity" "ScopePublicity" NOT NULL,
      ADD COLUMN     "fullName" TEXT;
    '
)
