'use client';

import React from 'react';
import { useState } from 'react';
import { IdentityCarousel } from './IdentityCarousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import useApi from '@/hooks/requests/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { apiRouter } from '@/constants/apiRouter';
import { User } from '@prisma/client';

const VerificationButtonAction = ({ user }: { user: User }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const { usePut } = useApi();
  const { mutate: confirmOrReject, isPending } = usePut(
    apiRouter.confirmOrReject,
    {
      onSuccess: () => {
        setOpenDialog(false);
        queryClient.invalidateQueries({
          queryKey: [
            'get',
            { url: apiRouter.identityVerifications, params: {} },
          ],
        });
      },
    },
  );

  const handleAccept = () => {
    confirmOrReject({
      userId: user.id,
      status: 'verified',
    });
  };

  const handleCancel = () => {
    confirmOrReject({
      userId: user.id,
      status: 'rejected',
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            Verify
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user.pseudo}</DialogTitle>
          </DialogHeader>
          <IdentityCarousel user={user} />
          <div className="flex w-full justify-center gap-8">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancel}
              disabled={isPending}
            >
              REJECT
            </Button>
            <Button
              className="w-full"
              onClick={handleAccept}
              disabled={isPending}
            >
              ACCEPT
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerificationButtonAction;
