-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "resetPasswordTokenExpired" TIMESTAMP(3),
ADD COLUMN     "verificationToken" INTEGER,
ADD COLUMN     "verificationTokenExpired" TIMESTAMP(3);
