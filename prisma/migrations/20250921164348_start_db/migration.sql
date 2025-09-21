-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."activity_log" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "speechId" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."speech" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "speech_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- AddForeignKey
ALTER TABLE "public"."activity_log" ADD CONSTRAINT "activity_log_speechId_fkey" FOREIGN KEY ("speechId") REFERENCES "public"."speech"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."speech" ADD CONSTRAINT "speech_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
