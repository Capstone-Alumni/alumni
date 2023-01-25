import { NextApiRequest, NextApiResponse } from 'next';

export default function onErrorAPIHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (err.message === 'denied') {
    return res.status(403).end('forbidden');
  }

  if (err.message === 'unauthorized') {
    return res.status(401).end('unauthorized');
  }

  // eslint-disable-next-line no-console
  console.error('Server Error', err);
  res.status(500).end('Something broke!');
}
