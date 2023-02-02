import { cache } from 'react';

export const getTenantData = cache(async (subdomain: string) => {
  try {
    const res = await fetch(
      `${process.env.PLATFORM_HOST}/api/tenants/subdomain/f_r5in724awldl9cfoz`,
    ).then(res => res.json());

    return res;
  } catch (error) {
    return null;
  }
});
