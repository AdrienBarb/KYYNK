import {
  VerificationColumns,
  Payment,
} from '@/components/verifications/VerificationColumns';
import { VerificationTable } from '@/components/verifications/VerificationTable';

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      pseudo: 'adrienBarb',
      email: 'm@example.com',
      status: 'pending',
    },
    {
      id: '728ed52z',
      pseudo: 'john doe',
      email: 'm@example.com',
      status: 'pending',
    },
    {
      id: '728ed52a',
      pseudo: 'marco polo',
      email: 'm@example.com',
      status: 'pending',
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <VerificationTable columns={VerificationColumns} data={data} />
    </div>
  );
}
