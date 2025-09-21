/*
  Warnings:

  - You are about to drop the column `user_id` on the `activity` table. All the data in the column will be lost.
  - Added the required column `email` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."activity" DROP CONSTRAINT "activity_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."activity" DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
