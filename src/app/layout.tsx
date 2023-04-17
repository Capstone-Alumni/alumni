import React from 'react';

import CSRProvider from '../modules/share/helpers/CSRProvider';

import { Providers } from '../redux/providers';
import GetInitialUserInformation from '@share/helpers/GetInitialUserInformation';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';

import 'quill/dist/quill.snow.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import SetCurrentTenant from '@share/helpers/SetCurrentTenant';
import Header from '@share/components/layout/Header';

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
        <title>{data?.name}</title>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
        <link rel="shortcut icon" href={data?.logo ?? '/logo.png'} />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <CSRProvider theme={data?.theme} tenantData={data}>
          <Providers>
            <Header user={session?.user} tenant={data} />
            {children}
            <SetCurrentTenant tenantData={data} />
            <GetInitialUserInformation user={session?.user} />
          </Providers>
        </CSRProvider>
      </body>
    </html>
  );
}
