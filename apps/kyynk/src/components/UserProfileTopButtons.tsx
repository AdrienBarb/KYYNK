'use client';

import React, { useState, FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ShareModal from '@/components/ShareModal';
import { useUser } from '@/hooks/users/useUser';
import { Forward, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { appRouter } from '@/constants/appRouter';

interface Props {}

const UserProfileTopButtons: FC<Props> = () => {
  //router
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const { user } = useUser();

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
            <Pencil color="#fff0eb" strokeWidth={3} />
          </Button>
        )}

        <Button size="icon" onClick={() => setOpenShareModal(true)}>
          <Forward color="#fff0eb" strokeWidth={3} />
        </Button>
      </div>

      <ShareModal
        open={openShareModal}
        setOpen={setOpenShareModal}
        urlToShare={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`}
        title="Come discover this profile on KYYNK"
      />
    </>
  );
};

export default UserProfileTopButtons;
