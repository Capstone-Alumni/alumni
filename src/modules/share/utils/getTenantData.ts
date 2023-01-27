export const getTenantData = async (subdomain: string) => {
  try {
    const res = await fetch(
      `${process.env.PLATFORM_HOST}/api/tenants/subdomain/${subdomain}`,
    ).then(res => res.json());
    console.log(res);

    return res;
  } catch (error) {
    console.log('get tenant error', error);
    return null;
  }
};
