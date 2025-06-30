import { FC } from 'react';
import { NudeWithPermissions } from '@/types/nudes';
import NudeCard from '../nudes/NudeCard';
import { MessageAttachmentWithNudePermissions } from '@/types/message-attachment';
import { useConversationModals } from '@/contexts/ConversationModalsContext';

interface Props {
  attachment: MessageAttachmentWithNudePermissions;
}

const MessageAttachment: FC<Props> = ({ attachment }) => {
  const { setSelectedNude, setNudeModalOpen } = useConversationModals();

  const handleNudeClick = (nude: NudeWithPermissions | undefined) => {
    setSelectedNude(nude || null);
    setNudeModalOpen(true);
  };

  const renderAttachment = () => {
    switch (attachment.type) {
      case 'nude':
        if (!attachment.nude) return null;
        return (
          <div className="w-32 mb-2">
            <NudeCard
              key={attachment.nude.id}
              nude={attachment.nude}
              onClick={() => handleNudeClick(attachment.nude)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return renderAttachment();
};

export default MessageAttachment;
