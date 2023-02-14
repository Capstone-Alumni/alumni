SELECT template.run_migration('
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_offline" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL,
    "registration_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_ended" BOOLEAN NOT NULL DEFAULT false,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "publicity" "template"."ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
    "public_participant" BOOLEAN NOT NULL DEFAULT false,
    "hostInformationId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_hostInformationId_fkey" FOREIGN KEY ("hostInformationId") REFERENCES "informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
