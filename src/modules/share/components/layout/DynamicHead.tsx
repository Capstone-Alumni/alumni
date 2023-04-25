import { currentTenantDataAtom } from '@share/states';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';

const DynamicHead = () => {
  const tenantData = useRecoilValue(currentTenantDataAtom);

  return (
    <Head>
      <title>{tenantData.name}</title>
      <meta content="initial-scale=1, width=device-width" name="viewport" />
      <link rel="shortcut icon" href={tenantData?.logo ?? '/logo.png'} />
    </Head>
  );
};

export default DynamicHead;
