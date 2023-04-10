import { headers } from 'next/headers';

const getSubdomain = () => {
  const hostname = headers().get('host') || 'demo.vercel.app';

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace('.vercel.app', '')
      : hostname.replace('.localhost:3005', '');

  return currentHost;
};

export default getSubdomain;
