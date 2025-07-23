-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "availableDate" SET DEFAULT now() + interval '7 days';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "feeFreeUntil" SET DEFAULT now() + interval '3 months';

-- AlterTable
ALTER TABLE "VerificationCode" ALTER COLUMN "expireOn" SET DEFAULT now() + interval '24 hours';

-- CreateTable
CREATE TABLE "ProfileImage" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProfileImage_userId_idx" ON "ProfileImage"("userId");

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
