/*
  Warnings:

  - Added the required column `commenter_info_id` to the `(news_comment)` table without a default value. This is not possible if the table is not empty.

*/
SELECT template.run_migration('
-- AlterTable
ALTER TABLE "(news_comment)" ADD COLUMN     "commenter_info_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "(news_comment)" ADD CONSTRAINT "(news_comment)_commenter_info_id_fkey" FOREIGN KEY ("commenter_info_id") REFERENCES "informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
