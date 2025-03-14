'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from '../ui/Dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/Carousel';
import { creditPackages } from '@/constants/creditPackages';
import { usePaymentModalStore } from '@/stores/PaymentModalStore';
import { Button } from '../ui/Button';
import useApi from '@/hooks/requests/useApi';
import { useUser } from '@/hooks/users/useUser';
import { cn } from '@/utils/tailwind/cn';

const PaymentModal = () => {
  const { isOpen, openModal, closeModal } = usePaymentModalStore();
  const { usePost } = useApi();
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null,
  );
  const { refetch } = useUser();

  const { mutate: buyCredit, isPending } = usePost('/api/payment', {
    onSuccess: () => {
      closeModal();
      refetch();
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openModal();
      setSelectedPackageId(null);
    } else {
      closeModal();
    }
  };

  const handleBuy = () => {
    if (selectedPackageId !== null) {
      buyCredit({ packageId: selectedPackageId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="z-[1000] max-w-screen-sm">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Buy Credits</DialogTitle>
          <DialogDescription>
            Select a package to purchase credits.
          </DialogDescription>
        </DialogHeader>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-44 md:max-w-md mx-auto"
        >
          <CarouselContent>
            {creditPackages.map((pkg) => (
              <CarouselItem
                key={pkg.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className={cn(
                    'p-4 border rounded-lg flex flex-col items-center cursor-pointer',
                    selectedPackageId === pkg.id && 'border-primary',
                  )}
                  onClick={() => setSelectedPackageId(pkg.id)}
                >
                  <h3 className="text-lg font-bold">{pkg.name}</h3>
                  <p>Price: ${pkg.price / 100}</p>
                  <p>Coins: {pkg.coinsAmount}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <DialogFooter>
          <Button
            className="w-full"
            disabled={isPending || selectedPackageId === null}
            isLoading={isPending}
            onClick={handleBuy}
          >
            Buy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
