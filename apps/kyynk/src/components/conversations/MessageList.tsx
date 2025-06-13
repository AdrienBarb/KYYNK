import { FC } from 'react';
import { MessageWithNudePermissions } from '@/types/messages';
import { NudeWithPermissions } from '@/types/nudes';
import NudeCard from '../nudes/NudeCard';
import { cn } from '@/utils/tailwind/cn';

interface Props {
  messages: MessageWithNudePermissions[];
  currentUserId: string | undefined;
  onNudeClick: (nude: NudeWithPermissions | undefined) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const MessageList: FC<Props> = ({
  messages,
  currentUserId,
  onNudeClick,
  scrollRef,
}) => {
  return (
    <div
      className="flex flex-col gap-4 px-4 h-[100%] w-full overflow-y-scroll"
      ref={scrollRef}
    >
      {messages.map((currentMessage) => {
        const isMyMessage = currentMessage.senderId === currentUserId;

        return (
          <div
            key={currentMessage.id}
            className={cn(
              'max-w-[80%] flex flex-col',
              isMyMessage ? 'self-end' : 'self-start',
              isMyMessage ? 'items-end' : 'items-start',
            )}
          >
            {currentMessage.nude && (
              <div className="w-32 mb-2">
                <NudeCard
                  key={currentMessage.nude.id}
                  nude={currentMessage.nude}
                  onClick={() => onNudeClick(currentMessage.nude)}
                />
              </div>
            )}
            <p
              className={cn(
                'p-2 rounded-lg',
                isMyMessage
                  ? 'bg-primary text-custom-black'
                  : 'bg-secondary-dark text-custom-black',
              )}
            >
              {currentMessage.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
