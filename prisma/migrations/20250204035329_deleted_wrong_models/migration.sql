/*
  Warnings:

  - You are about to drop the `Cargo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CargoStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CargoStatusHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Route` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cargo" DROP CONSTRAINT "Cargo_userId_fkey";

-- DropForeignKey
ALTER TABLE "CargoStatus" DROP CONSTRAINT "CargoStatus_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "CargoStatusHistory" DROP CONSTRAINT "CargoStatusHistory_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cargo_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Route" DROP CONSTRAINT "Route_driver_id_fkey";

-- DropTable
DROP TABLE "Cargo";

-- DropTable
DROP TABLE "CargoStatus";

-- DropTable
DROP TABLE "CargoStatusHistory";

-- DropTable
DROP TABLE "Driver";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Route";
