/*
  Warnings:

  - Added the required column `owner_id` to the `squads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "squads" ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "squads" ADD CONSTRAINT "squads_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
