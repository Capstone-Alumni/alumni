'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

import { CacheProvider, EmotionCache } from '@emotion/react';

import ThemeConfig from '@lib/mui';
import createEmotionCache from '@share/utils/createEmotionCache';

import { Providers } from '../redux/providers';

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
  emotionCache = clientSideEmotionCache,
}: {
  children: React.ReactNode;
  emotionCache: EmotionCache;
}) {
  return (
    <html lang="en">
      <head>
        <title>High school alumni management platform</title>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </head>
      <body style={{ margin: 0, minHeight: '100vh' }}>
        <SessionProvider>
          <CacheProvider value={emotionCache}>
            <Providers>
              <ThemeConfig>{children}</ThemeConfig>
            </Providers>
          </CacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
