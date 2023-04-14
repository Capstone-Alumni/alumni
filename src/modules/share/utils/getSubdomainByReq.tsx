import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next/types';

const getSubdomainByReq = (req: IncomingMessage | NextApiRequest) => {
  const hostname = req.headers.host || 'demo.vercel.app';

  const subdomain =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace('.vercel.app', '')
      : hostname.replace('.localhost:3005', '');

  return subdomain;
};

export default getSubdomainByReq;
