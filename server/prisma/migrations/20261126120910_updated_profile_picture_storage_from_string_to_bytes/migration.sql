/*
  Warnings:

  - Made the column `profileUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `profileUrl` LONGBLOB NULL;
