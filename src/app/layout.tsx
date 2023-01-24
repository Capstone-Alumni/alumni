import React from 'react';

import CSRProvider from './CSRProvider';

import { Providers } from '../redux/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>High school alumni management platform</title>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <CSRProvider>
          <Providers>{children}</Providers>
        </CSRProvider>
      </body>
    </html>
  );
}
