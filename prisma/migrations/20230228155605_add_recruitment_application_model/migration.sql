-- CreateTable
CREATE TABLE "recruitment_application" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resume_url" TEXT,
    "recruitmentId" TEXT NOT NULL,
    "applicationOwnerId" TEXT NOT NULL,

    CONSTRAINT "recruitment_application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recruitment_application" ADD CONSTRAINT "recruitment_application_recruitmentId_fkey" FOREIGN KEY ("recruitmentId") REFERENCES "recruitments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_application" ADD CONSTRAINT "recruitment_application_applicationOwnerId_fkey" FOREIGN KEY ("applicationOwnerId") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
