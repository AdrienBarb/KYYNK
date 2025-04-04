'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/Button';
import { ArrowUpDown } from 'lucide-react';
import VerificationButtonAction from './VerificationButtonAction';

export type Payment = {
  id: string;
  pseudo: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const VerificationColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'pseudo',
    header: 'Pseudo',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'identityVerificationStatus',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return <VerificationButtonAction user={user} />;
    },
  },
];
