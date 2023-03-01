SELECT template.run_migration('
-- CreateTable
CREATE TABLE "recruitment_applications" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resume_url" TEXT,
    "recruitmentId" TEXT NOT NULL,
    "applicationOwnerId" TEXT NOT NULL,

    CONSTRAINT "recruitment_applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recruitment_applications" ADD CONSTRAINT "recruitment_applications_recruitmentId_fkey" FOREIGN KEY ("recruitmentId") REFERENCES "recruitments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruitment_applications" ADD CONSTRAINT "recruitment_applications_applicationOwnerId_fkey" FOREIGN KEY ("applicationOwnerId") REFERENCES "informations"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
');
