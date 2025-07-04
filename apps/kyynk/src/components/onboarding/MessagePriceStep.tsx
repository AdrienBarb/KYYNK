'use client';

import React from 'react';
import Title from '@/components/ui/Title';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { PRICE_OPTIONS } from '@/constants/constants';

interface MessagePriceStepProps {
  selectedPrice: string;
  onPriceChange: (price: string) => void;
}

const MessagePriceStep: React.FC<MessagePriceStepProps> = ({
  selectedPrice,
  onPriceChange,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title Tag="h2" className="mb-4 text-custom-black font-semibold">
          Set your message price!
        </Title>
        <p className="text-custom-black font-medium">
          Choose how much you want to charge for private messages
        </p>
      </div>

      <div className="flex justify-center">
        <Select value={selectedPrice} onValueChange={onPriceChange}>
          <SelectTrigger className="w-48 bg-background/10 border-custom-black/30 text-custom-black placeholder:text-custom-black/60">
            <SelectValue placeholder="Select price" />
          </SelectTrigger>
          <SelectContent>
            {PRICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MessagePriceStep;
