/*
  Warnings:

  - You are about to drop the column `user_id` on the `careers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `event_interests` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `event_participants` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `fund_reports` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `fund_saved` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `fund_transactions` table. All the data in the column will be lost.
  - You are about to drop the column `author_info_id` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `commenter_info_id` on the `news_comment` table. All the data in the column will be lost.
  - You are about to drop the column `pingAlumniInfoId` on the `pings` table. All the data in the column will be lost.
  - You are about to drop the column `pingerInfoId` on the `pings` table. All the data in the column will be lost.
  - You are about to drop the column `publicity` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `recruitment_owner_info_id` on the `recruitments` table. All the data in the column will be lost.
  - Added the required column `alumni_id` to the `careers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alumni_id` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interesterId` to the `event_interests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participant_id` to the `event_participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `host_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saver_id` to the `fund_saved` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alumni_id` to the `fund_transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pingAlumniId` to the `pings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pingerId` to the `pings` table without a default value. This is not possible if the table is not empty.
  - Made the column `recruitment_owner_id` on table `recruitments` required. This step will fail if there are existing NULL values in that column.

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
ALTER TABLE "news" DROP CONSTRAINT "news_author_info_id_fkey";

-- DropForeignKey
ALTER TABLE "news_comment" DROP CONSTRAINT "news_comment_commenter_info_id_fkey";

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

-- DropForeignKey
ALTER TABLE "recruitments" DROP CONSTRAINT "recruitments_recruitment_owner_info_id_fkey";

-- AlterTable
ALTER TABLE "careers" DROP COLUMN "user_id",
ADD COLUMN     "alumni_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "educations" DROP COLUMN "user_id",
ADD COLUMN     "alumni_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event_interests" DROP COLUMN "userId",
ADD COLUMN     "interesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "event_participants" DROP COLUMN "userId",
ADD COLUMN     "participant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "user_id",
ADD COLUMN     "host_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fund_reports" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "fund_saved" DROP COLUMN "user_id",
ADD COLUMN     "saver_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fund_transactions" DROP COLUMN "user_id",
ADD COLUMN     "alumni_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "news" DROP COLUMN "author_info_id";

-- AlterTable
ALTER TABLE "news_comment" DROP COLUMN "commenter_info_id";

-- AlterTable
ALTER TABLE "pings" DROP COLUMN "pingAlumniInfoId",
DROP COLUMN "pingerInfoId",
ADD COLUMN     "pingAlumniId" TEXT NOT NULL,
ADD COLUMN     "pingerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "publicity",
ADD COLUMN     "alum_class_id" TEXT,
ADD COLUMN     "grade_id" TEXT,
ADD COLUMN     "is_public_school" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "recruitments" DROP COLUMN "recruitment_owner_info_id",
ALTER COLUMN "recruitment_owner_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "careers" ADD CONSTRAINT "careers_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_comment" ADD CONSTRAINT "news_comment_commenter_id_fkey" FOREIGN KEY ("commenter_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_interests" ADD CONSTRAINT "event_interests_interesterId_fkey" FOREIGN KEY ("interesterId") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funds" ADD CONSTRAINT "funds_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_saved" ADD CONSTRAINT "fund_saved_saver_id_fkey" FOREIGN KEY ("saver_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fund_transactions" ADD CONSTRAINT "fund_transactions_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "alum_classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitments" ADD CONSTRAINT "recruitments_recruitment_owner_id_fkey" FOREIGN KEY ("recruitment_owner_id") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_applications" ADD CONSTRAINT "recruitment_applications_applicationOwnerId_fkey" FOREIGN KEY ("applicationOwnerId") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pings" ADD CONSTRAINT "pings_pingAlumniId_fkey" FOREIGN KEY ("pingAlumniId") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pings" ADD CONSTRAINT "pings_pingerId_fkey" FOREIGN KEY ("pingerId") REFERENCES "alumni"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
')
