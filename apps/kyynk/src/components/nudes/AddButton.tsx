'use client';

import { CirclePlus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useNudeCreationModalStore } from '@/stores/NudeCreationModalStore';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import { isUserVerified } from '@/utils/users/isUserVerified';

const AddButton = () => {
  const { openModal } = useNudeCreationModalStore();
  const { user } = useUser();

  if (!isCreator({ user }) || !isUserVerified({ user })) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      className="flex items-center gap-2"
      onClick={openModal}
    >
      <CirclePlus size={18} />
      Add nude
    </Button>
  );
};

export default AddButton;
