-- CreateTable
CREATE TABLE "recruitments" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "start_at" TIMESTAMP(3),
    "expired_at" TIMESTAMP(3),
    "salary" TEXT NOT NULL DEFAULT 'negotiate',
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "recruitment_owner_id" TEXT NOT NULL,

    CONSTRAINT "recruitments_pkey" PRIMARY KEY ("id")
);
