-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "channelId" TEXT,
ADD COLUMN     "resourceId" TEXT,
ADD COLUMN     "syncToken" TEXT;
