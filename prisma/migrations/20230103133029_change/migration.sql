/*
  Warnings:

  - The values [YEAR_MOD] on the enum `AccessLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessLevel_new" AS ENUM ('SCHOOL_ADMIN', 'ALUMNI', 'CLASS_MOD', 'GRADE_MOD');
ALTER TABLE "users" ALTER COLUMN "access_level" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "access_level" TYPE "AccessLevel_new" USING ("access_level"::text::"AccessLevel_new");
ALTER TYPE "AccessLevel" RENAME TO "AccessLevel_old";
ALTER TYPE "AccessLevel_new" RENAME TO "AccessLevel";
DROP TYPE "AccessLevel_old";
ALTER TABLE "users" ALTER COLUMN "access_level" SET DEFAULT 'ALUMNI';
COMMIT;
