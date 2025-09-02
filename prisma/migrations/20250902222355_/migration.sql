-- DropForeignKey
ALTER TABLE "squad_user" DROP CONSTRAINT "squad_user_squad_id_fkey";

-- DropForeignKey
ALTER TABLE "squad_user" DROP CONSTRAINT "squad_user_user_id_fkey";

-- AddForeignKey
ALTER TABLE "squad_user" ADD CONSTRAINT "squad_user_squad_id_fkey" FOREIGN KEY ("squad_id") REFERENCES "squads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squad_user" ADD CONSTRAINT "squad_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
