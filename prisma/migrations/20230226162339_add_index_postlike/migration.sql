/*
  Warnings:

  - A unique constraint covering the columns `[author_id,post_id]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.

*/
SELECT template.run_migration('
-- CreateIndex
CREATE UNIQUE INDEX "PostLike_author_id_post_id_key" ON "PostLike"("author_id", "post_id");
');
