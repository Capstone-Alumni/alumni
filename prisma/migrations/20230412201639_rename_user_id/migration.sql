/*
  Warnings:

  - You are about to drop the column `userId` on the `informations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[alumni_id]` on the table `informations` will be added. If there are existing duplicate values, this will fail.

*/
SELECT template.run_migration('
-- DropForeignKey
ALTER TABLE "event_interests" DROP CONSTRAINT "event_interests_userId_fkey";

-- DropForeignKey
ALTER TABLE "event_participants" DROP CONSTRAINT "event_participants_userId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_user_id_fkey";

-- DropForeignKey
ALTER TABLE "fund_reports" DROP CONSTRAINT "fund_reports_user_id_fkey";

-- DropForeignKey
ALTER TABLE "fund_saved" DROP CONSTRAINT "fund_saved_user_id_fkey";

-- DropForeignKey
ALTER TABLE "fund_transactions" DROP CONSTRAINT "fund_transactions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "funds" DROP CONSTRAINT "funds_user_id_fkey";

-- DropForeignKey
ALTER TABLE "informations" DROP CONSTRAINT "informations_userId_fkey";

-- DropForeignKey
ALTER TABLE "pings" DROP CONSTRAINT "pings_pingerInfoId_fkey";

-- DropForeignKey
ALTER TABLE "post_comments" DROP CONSTRAINT "post_comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "post_likes" DROP CONSTRAINT "post_likes_author_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_fkey";

-- DropForeignKey
ALTER TABLE "recruitment_applications" DROP CONSTRAINT "recruitment_applications_applicationOwnerId_fkey";

-- DropIndex
DROP INDEX "informations_userId_key";

-- AlterTable
ALTER TABLE "informations" DROP COLUMN "userId",
ADD COLUMN     "alumni_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "informations_alumni_id_key" ON "informations"("alumni_id");

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_interests" ADD CONSTRAINT "event_interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funds" ADD CONSTRAINT "funds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_saved" ADD CONSTRAINT "fund_saved_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transactions" ADD CONSTRAINT "fund_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_reports" ADD CONSTRAINT "fund_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_applications" ADD CONSTRAINT "recruitment_applications_applicationOwnerId_fkey" FOREIGN KEY ("applicationOwnerId") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pings" ADD CONSTRAINT "pings_pingerInfoId_fkey" FOREIGN KEY ("pingerInfoId") REFERENCES "informations"("alumni_id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
