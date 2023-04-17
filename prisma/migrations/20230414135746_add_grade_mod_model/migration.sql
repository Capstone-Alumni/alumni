SELECT template.run_migration('
-- CreateTable
CREATE TABLE "grade_mods" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alum_class_id" TEXT NOT NULL,
    "alumni_id" TEXT NOT NULL,

    CONSTRAINT "grade_mods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grade_mods_alum_class_id_alumni_id_key" ON "grade_mods"("alum_class_id", "alumni_id");

-- AddForeignKey
ALTER TABLE "grade_mods" ADD CONSTRAINT "grade_mods_alum_class_id_fkey" FOREIGN KEY ("alum_class_id") REFERENCES "grades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grade_mods" ADD CONSTRAINT "grade_mods_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "alumni"("id") ON DELETE CASCADE ON UPDATE CASCADE;
')
