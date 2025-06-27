'use client';

import { VerificationColumns } from '@/components/verifications/VerificationColumns';
import { VerificationTable } from '@/components/verifications/VerificationTable';
import useApi from '@/hooks/requests/useApi';
import { apiRouter } from '@/constants/apiRouter';

export default function DemoPage() {
  const { useGet } = useApi();
  const { data } = useGet(apiRouter.identityVerifications);

  return (
    <div className="container mx-auto py-10">
      <VerificationTable columns={VerificationColumns} data={data ?? []} />
    </div>
  );
}
