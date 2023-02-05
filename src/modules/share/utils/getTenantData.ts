import cacheData from 'memory-cache';

export const getTenantData = async (subdomain: string) => {
  const url = `${process.env.NEXT_PUBLIC_PLATFORM_HOST}/api/tenants/subdomain/${subdomain}`;

  const cachedValue = cacheData.get(url);
  if (cachedValue) {
    return cachedValue;
  }

  try {
    const res = await fetch(url).then(res => res.json());
    cacheData.put(url, res, 1000 * 60 * 60); // 1 hours
    return res;
  } catch (error) {
    return null;
  }
};
