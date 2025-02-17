import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '../ui/TextArea';
import toast from 'react-hot-toast';
import { messageSchema } from '@/schemas/conversations/messageSchema';
import useApi from '@/hooks/requests/useApi';
import { useParams } from 'next/navigation';
import { useUser } from '@/hooks/users/useUser';
import NotEnoughCreditsModal from '../modals/NotEnoughCreditsModal';
import { ConversationUser } from '@/types/users';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';
import { Camera } from 'lucide-react';
import PrivateNudeModal from '../modals/PrivateNudeModal';
const ConversationInput = ({
  refetch,
  otherUser,
}: {
  refetch: () => void;
  otherUser: ConversationUser;
}) => {
  const [message, setMessage] = useState('');
  const { usePost } = useApi();
  const { id: conversationId } = useParams();
  const { user, refetch: refetchUser } = useUser();
  const [openNotEnoughCreditModal, setOpenNotEnoughCreditModal] =
    useState(false);
  const [openPrivateNudeModal, setOpenPrivateNudeModal] = useState(false);
  const { mutate: sendMessage, isPending } = usePost(
    `/api/conversations/${conversationId}/messages`,
    {
      onSuccess: () => {
        setMessage('');
        refetch();
        refetchUser();
      },
    },
  );

  const handleSendMessage = () => {
    try {
      messageSchema.parse(message);

      if (
        otherUser?.settings.creditMessage > 0 &&
        user?.creditsAmount! < otherUser.settings.creditMessage
      ) {
        setOpenNotEnoughCreditModal(true);
        return;
      }

      sendMessage({ content: message });
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col gap-1 items-center">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full text-base"
        rows={3}
      />
      <div className="flex justify-between w-full">
        <div>
          {isCreator({ user }) && isUserVerified({ user }) && (
            <Button size="icon" onClick={() => setOpenPrivateNudeModal(true)}>
              <Camera />
            </Button>
          )}
        </div>
        <Button
          onClick={handleSendMessage}
          isLoading={isPending}
          disabled={!message}
          className="flex items-center"
        >
          {otherUser?.settings.creditMessage > 0
            ? `Send for ${otherUser?.settings.creditMessage} credits`
            : 'Send'}
        </Button>
      </div>
      <NotEnoughCreditsModal
        open={openNotEnoughCreditModal}
        onOpenChange={setOpenNotEnoughCreditModal}
      />
      <PrivateNudeModal
        open={openPrivateNudeModal}
        setOpen={setOpenPrivateNudeModal}
        refetch={refetch}
      />
    </div>
  );
};

export default ConversationInput;
