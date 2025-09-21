/*
  Warnings:

  - You are about to drop the `activity_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."activity_log" DROP CONSTRAINT "activity_log_speechId_fkey";

-- DropTable
DROP TABLE "public"."activity_log";

-- CreateTable
CREATE TABLE "public"."activity" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "speechId" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_speechId_fkey" FOREIGN KEY ("speechId") REFERENCES "public"."speech"("id") ON DELETE SET NULL ON UPDATE CASCADE;
