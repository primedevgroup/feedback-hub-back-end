-- CreateTable
CREATE TABLE "squads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "squads_pkey" PRIMARY KEY ("id")
);
