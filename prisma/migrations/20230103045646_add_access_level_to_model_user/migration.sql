/*
  Warnings:

  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccessLevel" AS ENUM ('SCHOOL_ADMIN', 'ALUMNI', 'CLASS_MOD', 'YEAR_MOD');

-- CreateEnum
CREATE TYPE "AccessMode" AS ENUM ('FULL_ACCESS', 'READ_ONLY');

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "access_level" "AccessLevel" NOT NULL DEFAULT 'ALUMNI',
ADD COLUMN     "access_mode" "AccessMode" NOT NULL DEFAULT 'FULL_ACCESS';

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "users_roles";

-- DropEnum
DROP TYPE "ERole";
