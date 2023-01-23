-- CreateEnum
CREATE TYPE "ScopePublicity" AS ENUM ('PRIVATE', 'CLASS', 'GRADE', 'SCHOOL');

-- CreateTable
CREATE TABLE "informations" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_publicity" "ScopePublicity" NOT NULL DEFAULT 'PRIVATE',
    "phone" TEXT NOT NULL,
    "phone_publicity" "ScopePublicity" NOT NULL DEFAULT 'PRIVATE',
    "facebook_url" TEXT NOT NULL,
    "facebook_publicity" "ScopePublicity" NOT NULL DEFAULT 'PRIVATE',
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "date_of_birth_publicity" "ScopePublicity" NOT NULL DEFAULT 'PRIVATE',
    "gradeId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "informations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "informations_userId_key" ON "informations"("userId");

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
