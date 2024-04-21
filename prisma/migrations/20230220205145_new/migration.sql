-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Street" TEXT,
ADD COLUMN     "activityEndtTime" TEXT,
ADD COLUMN     "activityStartTime" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "street" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
