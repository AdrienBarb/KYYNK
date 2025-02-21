'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import ContentProviderPolicyModal from '@/components/modals/ContentProviderPolicyModal';
import { Checkbox } from '@/components/ui/Checkbox';
import useApi from '@/hooks/requests/useApi';
import { useUser } from '@/hooks/users/useUser';
import { apiRouter } from '@/constants/apiRouter';
import { useRouter } from 'next/navigation';

const ContentProviderPolicyPage = () => {
  const { usePut } = useApi();
  const { user, refetch } = useUser();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: editContentProviderPolicy } = usePut(apiRouter.me, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAcceptPolicy = async () => {
    editContentProviderPolicy({
      contentProviderPolicyAccepted: true,
    });
    setIsModalOpen(false);
    router.push('/account/become-creator');
  };

  return (
    <div>
      <div className="flex items-center">
        <Checkbox
          id="accept-policy"
          checked={user?.contentProviderPolicyAccepted}
          onCheckedChange={handleAcceptPolicy}
        />
        <label htmlFor="accept-policy" className="ml-2">
          I accept the content provider policy
          <Button variant="link" onClick={handleOpenModal}>
            Read Policy
          </Button>
        </label>
      </div>

      {isModalOpen && (
        <ContentProviderPolicyModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          handleAcceptPolicy={handleAcceptPolicy}
        />
      )}
    </div>
  );
};

export default ContentProviderPolicyPage;
