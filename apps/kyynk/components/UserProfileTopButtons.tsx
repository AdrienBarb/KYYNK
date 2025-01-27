'use client';

import React, { useState, FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ShareModal from '@/components/ShareModal';
import { useUser } from '@/lib/hooks/useUser';
import { Forward, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { appRouter } from '@/constants/appRouter';

interface Props {}

const UserProfileTopButtons: FC<Props> = () => {
  //router
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const { getUser } = useUser();
  const user = getUser();

  //localstate
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleEditAccountDetailsClick = () => {
    router.push(appRouter.editProfile);
  };

  return (
    <>
      <div className="flex justify-end space-x-2 mb-4">
        {user?.slug === slug && (
          <Button size="icon" onClick={handleEditAccountDetailsClick}>
            <Pencil color="white" strokeWidth={3} />
          </Button>
        )}

        <Button size="icon" onClick={() => setOpenShareModal(true)}>
          <Forward color="white" strokeWidth={3} />
        </Button>
      </div>

      <ShareModal open={openShareModal} setOpen={setOpenShareModal} />
    </>
  );
};

export default UserProfileTopButtons;
