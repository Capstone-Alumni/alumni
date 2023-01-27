import { cache } from 'react';

export const getTenantData = cache(async (subdomain: string) => {
  try {
    const res = await fetch(
      `${process.env.PLATFORM_HOST}/api/tenants/subdomain/${subdomain}`,
      { cache: 'force-cache' },
    );
    const tenantData = await res.json();
    console.log(tenantData);

    return tenantData;
  } catch {
    return null;
  }
});
