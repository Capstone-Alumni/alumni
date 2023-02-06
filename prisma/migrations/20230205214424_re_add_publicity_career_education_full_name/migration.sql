-- AlterTable
SELECT run_migration('
ALTER TABLE "informations" ADD COLUMN     "career_publicity" "public"."ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
ADD COLUMN     "education_publicity" "public"."ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
ADD COLUMN     "fullName" TEXT;
');
