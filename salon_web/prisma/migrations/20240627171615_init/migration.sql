/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `date` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "dateTime",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isBooked" BOOLEAN NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TimeSlot_startTime_endTime_idx" ON "TimeSlot"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "Reservation_date_time_idx" ON "Reservation"("date", "time");
