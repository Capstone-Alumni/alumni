SELECT template.run_migration('
-- CreateTable
CREATE TABLE "access_requests" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "grade_id" TEXT NOT NULL,
    "alum_class_id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "access_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "access_requests" ADD CONSTRAINT "access_requests_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_requests" ADD CONSTRAINT "access_requests_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "alum_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');