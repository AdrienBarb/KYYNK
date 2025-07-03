'use client';

import Text from '../ui/Text';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../ui/Select';
import { useUser } from '@/hooks/users/useUser';
import useApi from '@/hooks/requests/useApi';
import { Card } from '../ui/Card';
import toast from 'react-hot-toast';
import { PRICE_OPTIONS } from '@/constants/constants';

const ConversationSettings = () => {
  const { user, refetch } = useUser();
  const { usePut } = useApi();

  const { mutate: updatePrice } = usePut(
    '/api/settings/conversations/messages-price',
    {
      onSuccess: () => {
        refetch();
        toast.success('Price updated');
      },
    },
  );

  const handlePriceChange = (value: string) => {
    updatePrice({ fiatMessage: value });
  };

  return (
    <Card>
      <div className="flex justify-between items-center gap-4">
        <div className="w-full">
          <Text className="font-bold">Private message</Text>
          <Text className="text-sm">
            You can get paid every time a user wants to send you a message.
            Change the price here
          </Text>
        </div>
        <Select
          value={user?.settings?.fiatMessage.toString()}
          onValueChange={handlePriceChange}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {PRICE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default ConversationSettings;
