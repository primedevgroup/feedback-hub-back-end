-- CreateEnum
CREATE TYPE "SquadUserRole" AS ENUM ('ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "squads" DROP CONSTRAINT "squads_owner_id_fkey";

-- CreateTable
CREATE TABLE "squad_user" (
    "id" TEXT NOT NULL,
    "squad_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "SquadUserRole" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "squad_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "squad_user_squad_id_user_id_idx" ON "squad_user"("squad_id", "user_id");

-- AddForeignKey
ALTER TABLE "squad_user" ADD CONSTRAINT "squad_user_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squad_user" ADD CONSTRAINT "squad_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
