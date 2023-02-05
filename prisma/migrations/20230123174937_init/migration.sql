-- CreateEnum
SELECT migrate_schema('
CREATE TYPE "AccessLevel" AS ENUM (''ALUMNI'', ''CLASS_MOD'', ''GRADE_MOD'', ''SCHOOL_ADMIN'');
');

-- CreateEnum
SELECT migrate_schema('
CREATE TYPE "AccessStatus" AS ENUM (''PENDING'', ''APPROVED'');
');

-- CreateEnum
SELECT migrate_schema('
CREATE TYPE "AccessMode" AS ENUM (''FULL_ACCESS'', ''READ_ONLY'');
');

-- CreateEnum
SELECT migrate_schema('
CREATE TYPE "ScopePublicity" AS ENUM (''PRIVATE'', ''CLASS'', ''GRADE'', ''SCHOOL'');
');

-- CreateTable
SELECT migrate_schema('
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);
');

-- CreateTable
SELECT migrate_schema('
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "class_id" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "username" TEXT,
    "password" TEXT,
    "image" TEXT,
    "access_level" "AccessLevel" NOT NULL DEFAULT ''ALUMNI'',
    "access_status" "AccessStatus" NOT NULL DEFAULT ''PENDING'',
    "access_mode" "AccessMode" NOT NULL DEFAULT ''FULL_ACCESS'',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
');

-- CreateTable
SELECT migrate_schema('
CREATE TABLE "grades" (
    "id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);
');

-- CreateTable
SELECT migrate_schema('
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "grade_id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);
');

-- CreateTable
SELECT migrate_schema('
CREATE TABLE "informations" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "avatar_url" TEXT,
    "cover_image_url" TEXT,
    "user_email" TEXT,
    "email_publicity" "ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
    "phone" TEXT,
    "phone_publicity" "ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
    "facebook_url" TEXT,
    "facebook_publicity" "ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
    "date_of_birth" TIMESTAMP(3),
    "date_of_birth_publicity" "ScopePublicity" NOT NULL DEFAULT ''PRIVATE'',
    "grade_code" TEXT,
    "grade_name" TEXT,
    "class_name" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "informations_pkey" PRIMARY KEY ("id")
);
');

-- CreateTable
SELECT migrate_schema('
CREATE TABLE "careers" (
    "id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);
');

-- CreateTable
SELECT migrate_schema('
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "degree" TEXT,
    "school" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);
');

-- CreateIndex
SELECT migrate_schema('
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");
');

-- CreateIndex
SELECT migrate_schema('
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
');

-- CreateIndex
SELECT migrate_schema('
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
');

-- CreateIndex
SELECT migrate_schema('
CREATE UNIQUE INDEX "users_id_email_key" ON "users"("id", "email");
');

-- CreateIndex
SELECT migrate_schema('
CREATE UNIQUE INDEX "grades_code_key" ON "grades"("code");
');

-- CreateIndex
SELECT migrate_schema('
CREATE UNIQUE INDEX "informations_userId_key" ON "informations"("userId");
');

-- AddForeignKey
SELECT migrate_schema('
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
');

-- AddForeignKey
SELECT migrate_schema('
ALTER TABLE "users" ADD CONSTRAINT "users_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
');

-- AddForeignKey
SELECT migrate_schema('
ALTER TABLE "classes" ADD CONSTRAINT "classes_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');

-- AddForeignKey
SELECT migrate_schema('
ALTER TABLE "informations" ADD CONSTRAINT "informations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');

-- AddForeignKey
SELECT migrate_schema('
ALTER TABLE "careers" ADD CONSTRAINT "careers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');

-- AddForeignKey
SELECT migrate_schema('
ALTER TABLE "educations" ADD CONSTRAINT "educations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
');
