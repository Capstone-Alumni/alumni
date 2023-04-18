import { redirect } from 'next/navigation';
import SetupPassword from './SetupPassword';

export default async function Page({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  try {
    console.log(searchParams);
    const { token } = searchParams;
    const url = `${process.env.NEXT_PUBLIC_PLATFORM_HOST}/api/precheck_token?token=${token}`;
    console.log(url);
    const res = await fetch(url).then(res => res.json());

    if (res?.data !== 'verified') {
      redirect('/404_error');
    }
  } catch {
    redirect('/404_error');
  }

  return <SetupPassword />;
}
