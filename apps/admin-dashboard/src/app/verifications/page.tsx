'use client';

import { VerificationColumns } from '@/components/verifications/VerificationColumns';
import { VerificationTable } from '@/components/verifications/VerificationTable';
import { apiRoutes } from '@/constants/router/apiRoutes';
import useApi from '@/hooks/requests/useAdminApi';

export default function DemoPage() {
  const { useGet } = useApi();
  const { data } = useGet(apiRoutes.identityVerifications);

  return (
    <div className="container mx-auto py-10">
      <VerificationTable columns={VerificationColumns} data={data ?? []} />
    </div>
  );
}
