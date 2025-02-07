import { prisma } from '@/lib/db/client';

export const getConversationById = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        participants: {
          select: {
            id: true,
            pseudo: true,
            profileImageId: true,
          },
        },
        messages: {
          select: {
            id: true,
            content: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return conversation;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch conversation');
  }
};
