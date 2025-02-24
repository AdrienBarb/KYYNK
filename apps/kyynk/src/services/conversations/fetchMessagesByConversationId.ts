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
    select: {
      id: true,
      content: true,
      senderId: true,
      createdAt: true,
      status: true,
      nude: {
        select: {
          id: true,
          description: true,
          creditPrice: true,
          userId: true,
          buyers: true,
          createdAt: true,
          media: {
            select: {
              id: true,
              thumbnailId: true,
              videoId: true,
            },
          },
          user: {
            select: {
              id: true,
              pseudo: true,
              profileImageId: true,
              slug: true,
            },
          },
        },
      },
    },
  });
};
