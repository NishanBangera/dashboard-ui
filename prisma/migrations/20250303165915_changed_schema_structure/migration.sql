/*
  Warnings:

  - You are about to drop the column `config` on the `DashboardWidget` table. All the data in the column will be lost.
  - You are about to drop the column `config` on the `WidgetType` table. All the data in the column will be lost.
  - You are about to drop the `Layout` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `DashboardWidget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Layout" DROP CONSTRAINT "Layout_dashboardId_fkey";

-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "layouts" JSON[];

-- AlterTable
ALTER TABLE "DashboardWidget" DROP COLUMN "config",
ADD COLUMN     "data" JSON NOT NULL;

-- AlterTable
ALTER TABLE "WidgetType" DROP COLUMN "config";

-- DropTable
DROP TABLE "Layout";
