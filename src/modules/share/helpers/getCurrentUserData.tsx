import { IncomingMessage } from 'http';
import { User } from 'next-auth';
import { cache } from 'react';

export const getCurrentUserSSR = cache(
  async (tenantId: string, user: User, req: IncomingMessage): Promise<any> => {
    console.log('get current user', tenantId, user);
    if (!tenantId || !user) {
      return null;
    }

    const url = `http://${req.headers.host}/api/users/${user.id}/information`;
    console.log(url);
    const data = await fetch(url)
      .then(res => {
        console.log(res);
        res.json();
      })
      .catch(err => {
        console.log(err);
      });

    console.log(data);

    return data;
  },
);
