import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '../ui/TextArea';

const ConversationInput = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Message sent:', message);
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
        <Button onClick={handleSendMessage} className="flex items-center">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ConversationInput;
