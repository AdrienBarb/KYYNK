'use client';

import React, { FC } from 'react';
import { Button } from '@/components/ui/Button';
import useApi from '@/hooks/requests/useApi';
import { useRouter } from 'next/navigation';

interface AskPaymentButtonProps {
  disabled: boolean;
}

const AskPaymentButton: FC<AskPaymentButtonProps> = ({ disabled }) => {
  const { usePost } = useApi();
  const router = useRouter();

  const { mutate: askPayment, isPending } = usePost(
    '/api/revenue/ask-payment',
    {
      onSuccess: () => {
        router.refresh();
      },
    },
  );

  const handleAskPayment = () => {
    askPayment({});
  };

  return (
    <Button
      size="sm"
      disabled={disabled || isPending}
      isLoading={isPending}
      onClick={handleAskPayment}
    >
      Ask Payment
    </Button>
  );
};

export default AskPaymentButton;
