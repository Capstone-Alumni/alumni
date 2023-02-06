import React from 'react';

import { cookies } from 'next/headers';

import CSRProvider from './CSRProvider';

import { Providers } from '../redux/providers';
import SetCurrentTenant from './SetCurrentTenant';
import { getTenantData } from '@share/utils/getTenantData';
import GetInitialUserInformation from './GetInitialUserInformation';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = cookies().get('tenant-subdomain');
  const res = await getTenantData(tenant?.value || '');
  const { data } = res;

  return (
    <html lang="en">
      <head>
        <title>{data.name}</title>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
        <link rel="shortcut icon" href="/logo.png" />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <CSRProvider theme={data.theme}>
          <Providers>
            {children}
            <SetCurrentTenant tenantData={data} />
            <GetInitialUserInformation />
          </Providers>
        </CSRProvider>
      </body>
    </html>
  );
}
