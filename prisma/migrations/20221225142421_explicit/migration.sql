/*
  Warnings:

  - You are about to drop the `_users_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_users_roles" DROP CONSTRAINT "_users_roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_users_roles" DROP CONSTRAINT "_users_roles_B_fkey";

-- DropTable
DROP TABLE "_users_roles";

-- CreateTable
CREATE TABLE "users_roles" (
    "role_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
