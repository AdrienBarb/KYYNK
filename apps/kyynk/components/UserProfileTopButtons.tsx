'use client';

import React, { useState, FC } from 'react';
import styles from '@/styles/UserProfileTopButtons.module.scss';
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
      <div className={styles.buttonsWrapper}>
        {user?.slug === slug && (
          <Button
            variant="defaultWithoutBorder"
            size="icon"
            onClick={handleEditAccountDetailsClick}
          >
            <Pencil color="white" strokeWidth={3} />
          </Button>
        )}

        <Button
          variant="defaultWithoutBorder"
          size="icon"
          onClick={() => setOpenShareModal(true)}
        >
          <Forward color="white" strokeWidth={3} />
        </Button>
      </div>

      <ShareModal open={openShareModal} setOpen={setOpenShareModal} />
    </>
  );
};

export default UserProfileTopButtons;
