/*
  Warnings:

  - You are about to drop the column `speechId` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `speech` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."activity" DROP CONSTRAINT "activity_speechId_fkey";

-- DropForeignKey
ALTER TABLE "public"."speech" DROP CONSTRAINT "speech_userId_fkey";

-- AlterTable
ALTER TABLE "public"."activity" DROP COLUMN "speechId",
ADD COLUMN     "speech_id" TEXT;

-- AlterTable
ALTER TABLE "public"."speech" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_speech_id_fkey" FOREIGN KEY ("speech_id") REFERENCES "public"."speech"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speech" ADD CONSTRAINT "speech_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
