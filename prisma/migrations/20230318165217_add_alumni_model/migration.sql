SELECT template.run_migration('
-- CreateTable
CREATE TABLE "alumni" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "account_email" TEXT NOT NULL,
    "access_level" "template"."AccessLevel" NOT NULL DEFAULT ''ALUMNI'',
    "access_status" "template"."AccessStatus" NOT NULL DEFAULT ''PENDING'',
    "first_login" TIMESTAMP(3),
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alumni_pkey" PRIMARY KEY ("id")
);
');
