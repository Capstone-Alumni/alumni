import { Tenant } from '@share/states';
import { getTenantData } from '@share/utils/getTenantData';
import { IncomingMessage } from 'http';
import { cache } from 'react';

export const getTenantDataFromReq = cache(
  async (req: IncomingMessage): Promise<Tenant> => {
    const hostname = req.headers.host;
    const subdomain =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname?.replace('.vercel.app', '')
        : hostname?.replace('.localhost:3005', '');

    const res = await getTenantData(subdomain || '');
    const { data } = res;

    return data;
  },
);
