-- AlterTable
ALTER TABLE "public"."activity" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
