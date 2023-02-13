-- AlterTable
SELECT template.run_migration('
ALTER TABLE "informations" ADD COLUMN     "career_publicity" "template"."ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
ADD COLUMN     "education_publicity" "template"."ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
ADD COLUMN     "fullName" TEXT;
');
