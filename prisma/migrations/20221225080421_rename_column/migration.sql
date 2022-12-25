/*
  Warnings:

  - You are about to drop the column `roleName` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "roleName",
ADD COLUMN     "role_name" "ERole" NOT NULL DEFAULT 'USER';
