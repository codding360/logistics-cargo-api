-- AlterTable
ALTER TABLE "Cargo" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
