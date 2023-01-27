import { cache } from 'react';

export const getTenantData = cache(async (subdomain: string) => {
  try {
    const res = await fetch(
      `${process.env.PLATFORM_HOST}/api/tenants/subdomain/${subdomain}`,
      { cache: 'force-cache' },
    ).then(res => res.json());
    console.log(res);

    return res;
  } catch (error) {
    console.log('get tenant error', error);
    return null;
  }
});
