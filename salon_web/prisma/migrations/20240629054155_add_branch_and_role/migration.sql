/*
  Warnings:

  - Added the required column `branchId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- DropIndex
DROP INDEX "Reservation_date_time_idx";

-- DropIndex
DROP INDEX "TimeSlot_date_startTime_endTime_idx";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "branchId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "TimeSlot" ADD COLUMN     "branchId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "openingTime" TEXT NOT NULL,
    "closingTime" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reservation_userId_idx" ON "Reservation"("userId");

-- CreateIndex
CREATE INDEX "Service_branchId_idx" ON "Service"("branchId");

-- CreateIndex
CREATE INDEX "TimeSlot_branchId_date_idx" ON "TimeSlot"("branchId", "date");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
