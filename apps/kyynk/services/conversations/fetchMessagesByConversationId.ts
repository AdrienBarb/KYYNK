import { prisma } from '@/lib/db/client';

export const fetchMessagesByConversationId = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  return await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};
