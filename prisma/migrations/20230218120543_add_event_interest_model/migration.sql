SELECT template.run_migration('
-- CreateTable
CREATE TABLE "event_interests" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "event_interests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_interests" ADD CONSTRAINT "event_interests_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_interests" ADD CONSTRAINT "event_interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
');
