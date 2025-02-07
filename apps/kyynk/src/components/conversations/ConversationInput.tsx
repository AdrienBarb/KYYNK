import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '../ui/TextArea';
import toast from 'react-hot-toast';
import { messageSchema } from '@/schemas/conversations/messageSchema';
import useApi from '@/hooks/requests/useApi';
import { useParams } from 'next/navigation';

const ConversationInput = ({ refetch }: { refetch: () => void }) => {
  const [message, setMessage] = useState('');
  const { usePost } = useApi();
  const { id: conversationId } = useParams();

  const { mutate: sendMessage, isPending } = usePost(
    `/api/conversations/${conversationId}/messages`,
    {
      onSuccess: () => {
        setMessage('');
        refetch();
      },
    },
  );

  const handleSendMessage = () => {
    try {
      messageSchema.parse(message);
      console.log('Message sent:', message);
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
        className="w-full"
        rows={3}
      />
      <div className="flex justify-between w-full">
        <div></div>
        <Button
          onClick={handleSendMessage}
          isLoading={isPending}
          disabled={!message}
          className="flex items-center"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ConversationInput;
