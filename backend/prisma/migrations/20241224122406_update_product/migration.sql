/*
  Warnings:

  - Added the required column `battery_healt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "battery_healt" INTEGER NOT NULL;
