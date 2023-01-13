-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_userId_user_email_fkey";

-- DropIndex
DROP INDEX "informations_userId_user_email_key";

-- DropIndex
DROP INDEX "informations_user_email_key";

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
