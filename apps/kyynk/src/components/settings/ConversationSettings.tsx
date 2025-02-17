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
import { Separator } from '../ui/Separator';
import { useUser } from '@/hooks/users/useUser';
import useApi from '@/hooks/requests/useApi';

const priceOptions = [
  { label: 'Free', value: '0' },
  { label: '0.25 €', value: '0.25' },
  { label: '0.5 €', value: '0.5' },
  { label: '0.75 €', value: '0.75' },
  { label: '1 €', value: '1' },
  { label: '1.25 €', value: '1.25' },
  { label: '1.5 €', value: '1.5' },
  { label: '1.75 €', value: '1.75' },
  { label: '2 €', value: '2' },
  { label: '2.25 €', value: '2.25' },
  { label: '2.5 €', value: '2.5' },
  { label: '2.75 €', value: '2.75' },
  { label: '3 €', value: '3' },
  { label: '3.25 €', value: '3.25' },
  { label: '3.5 €', value: '3.5' },
  { label: '3.75 €', value: '3.75' },
  { label: '4 €', value: '4' },
  { label: '4.25 €', value: '4.25' },
  { label: '4.5 €', value: '4.5' },
  { label: '4.75 €', value: '4.75' },
  { label: '5 €', value: '5' },
];

const ConversationSettings = () => {
  const { user, refetch } = useUser();
  console.log('🚀 ~ ConversationSettings ~ user:', user);
  const { usePut } = useApi();

  const { mutate: updatePrice } = usePut(
    '/api/settings/conversations/messages-price',
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const handlePriceChange = (value: string) => {
    console.log('🚀 ~ handlePriceChange ~ value:', value);
    updatePrice({ fiatMessage: value });
  };

  return (
    <div>
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
              {priceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
    </div>
  );
};

export default ConversationSettings;
