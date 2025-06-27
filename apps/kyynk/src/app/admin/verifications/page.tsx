'use client';

import { VerificationColumns } from '@/components/verifications/VerificationColumns';
import { VerificationTable } from '@/components/verifications/VerificationTable';
import useApi from '@/hooks/requests/useApi';
import { apiRouter } from '@/constants/apiRouter';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function DemoPage() {
  const { useGet } = useApi();
  const { data } = useGet(apiRouter.identityVerifications);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Verifications"
        description="Manage and review user identity verifications."
      />
      <VerificationTable columns={VerificationColumns} data={data ?? []} />
    </div>
  );
}
