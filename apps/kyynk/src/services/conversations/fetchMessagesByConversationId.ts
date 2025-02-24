import { prisma } from '@/lib/db/client';
import { getNudeSelectFields } from '@/utils/nudes/getNudeSelectFields';

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
    select: {
      id: true,
      content: true,
      senderId: true,
      createdAt: true,
      status: true,
      nude: {
        select: getNudeSelectFields(),
      },
    },
  });
};
