import { prisma } from '@/lib/db/client';

export const getConversationByParticipants = async ({
  firstUserId,
  secondUserId,
}: {
  firstUserId: string | null | undefined;
  secondUserId: string | null | undefined;
}) => {
  try {
    if (!firstUserId || !secondUserId) {
      return null;
    }

    const conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: { in: [firstUserId, secondUserId] },
          },
        },
        isArchived: false,
      },
    });

    if (!conversation) {
      return null;
    }

    return conversation;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch conversation');
  }
};
