/*
  Warnings:

  - You are about to drop the column `isBooked` on the `TimeSlot` table. All the data in the column will be lost.
  - Added the required column `price` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TimeSlot_startTime_endTime_idx";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "price" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "isBooked",
ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "TimeSlot_date_startTime_endTime_idx" ON "TimeSlot"("date", "startTime", "endTime");
