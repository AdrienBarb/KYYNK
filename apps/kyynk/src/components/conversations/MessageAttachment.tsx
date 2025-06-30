import { FC } from 'react';
import { NudeWithPermissions } from '@/types/nudes';
import NudeCard from '../nudes/NudeCard';
import { MessageAttachmentWithNudePermissions } from '@/types/message-attachment';

interface Props {
  attachment: MessageAttachmentWithNudePermissions;
  onNudeClick: (nude: NudeWithPermissions | undefined) => void;
}

const MessageAttachment: FC<Props> = ({ attachment, onNudeClick }) => {
  const renderAttachment = () => {
    switch (attachment.type) {
      case 'nude':
        if (!attachment.nude) return null;
        return (
          <div className="w-32 mb-2">
            <NudeCard
              key={attachment.nude.id}
              nude={attachment.nude}
              onClick={() => onNudeClick(attachment.nude)}
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
