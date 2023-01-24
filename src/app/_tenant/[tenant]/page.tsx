import { getTenantData } from '@share/utils/getTenantData';
import Link from 'next/link';

export default async function Home({ params }: { params: { tenant: string } }) {
  const { tenant } = params;
  await getTenantData(tenant);

  return (
    <div>
      <Link href="/home">home page</Link>
    </div>
  );
}
