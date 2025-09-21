/*
  Warnings:

  - You are about to drop the column `userId` on the `activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."activity" DROP CONSTRAINT "activity_userId_fkey";

-- AlterTable
ALTER TABLE "public"."activity" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
