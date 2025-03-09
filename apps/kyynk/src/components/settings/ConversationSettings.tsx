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
const priceOptions = [
  { label: 'Free', value: '0' },
  { label: '0.25 €', value: '25' },
  { label: '0.5 €', value: '50' },
  { label: '0.75 €', value: '75' },
  { label: '1 €', value: '100' },
  { label: '1.25 €', value: '125' },
  { label: '1.5 €', value: '150' },
  { label: '1.75 €', value: '175' },
  { label: '2 €', value: '200' },
  { label: '2.25 €', value: '225' },
  { label: '2.5 €', value: '250' },
  { label: '2.75 €', value: '275' },
  { label: '3 €', value: '300' },
  { label: '3.25 €', value: '325' },
  { label: '3.5 €', value: '350' },
  { label: '3.75 €', value: '375' },
  { label: '4 €', value: '400' },
  { label: '4.25 €', value: '425' },
  { label: '4.5 €', value: '450' },
  { label: '4.75 €', value: '475' },
  { label: '5 €', value: '500' },
];

const ConversationSettings = () => {
  const { user, refetch } = useUser();
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
              {priceOptions.map((option) => (
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
