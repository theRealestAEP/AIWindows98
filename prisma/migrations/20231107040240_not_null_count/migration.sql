/*
  Warnings:

  - Made the column `conversationCount` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "conversationCount" SET NOT NULL,
ALTER COLUMN "conversationCount" SET DEFAULT 0;
