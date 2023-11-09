-- AlterTable
ALTER TABLE "User" ADD COLUMN     "conversationCount" INTEGER;

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
