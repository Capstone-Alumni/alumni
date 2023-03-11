import React from 'react';

import CSRProvider from '../modules/share/helpers/CSRProvider';

import { Providers } from '../redux/providers';
import GetInitialUserInformation from '@share/helpers/GetInitialUserInformation';
import SetCurrentTenant from '@share/helpers/SetCurrentTenant';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';

import 'quill/dist/quill.snow.css';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getTenantDataSSR();
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="en">
      <head>
        <title>{data.name}</title>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
        <link rel="shortcut icon" href={data.logo ?? '/logo.png'} />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <CSRProvider theme={data.theme}>
          <Providers>
            {children}
            <SetCurrentTenant tenantData={data} />
            <GetInitialUserInformation user={session?.user} />
          </Providers>
        </CSRProvider>
      </body>
    </html>
  );
}
