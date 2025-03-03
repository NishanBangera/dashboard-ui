/*
  Warnings:

  - You are about to drop the column `data` on the `DashboardWidget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DashboardWidget" DROP COLUMN "data",
ALTER COLUMN "config" SET DATA TYPE JSON,
ALTER COLUMN "position" SET DATA TYPE JSON;

-- AlterTable
ALTER TABLE "Layout" ALTER COLUMN "config" SET DATA TYPE JSON;

-- AlterTable
ALTER TABLE "WidgetType" ALTER COLUMN "config" SET DATA TYPE JSON;
