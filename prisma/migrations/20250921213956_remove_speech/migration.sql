/*
  Warnings:

  - You are about to drop the column `speech_id` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the `speech` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `activity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."activity" DROP CONSTRAINT "activity_speech_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."speech" DROP CONSTRAINT "speech_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."activity" DROP COLUMN "speech_id",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "public"."speech";
