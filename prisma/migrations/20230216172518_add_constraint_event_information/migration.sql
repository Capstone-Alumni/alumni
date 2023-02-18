SELECT template.run_migration('
-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
');
