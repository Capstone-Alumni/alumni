import React from 'react';

import CSRProvider from '../modules/share/helpers/CSRProvider';

import { Providers } from '../redux/providers';
import GetInitialUserInformation from '@share/helpers/GetInitialUserInformation';
import SetCurrentTenant from '@share/helpers/SetCurrentTenant';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getTenantDataSSR();

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
