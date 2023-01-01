'use client';

import React from 'react';
import ProvidersWrapper from './ProvidersWrapper';

import { CacheProvider, EmotionCache } from '@emotion/react';
import ThemeConfig from '../lib/mui';
import createEmotionCache from 'src/modules/share/utils/createEmotionCache';

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
        <ProvidersWrapper>
          <CacheProvider value={emotionCache}>
            <ThemeConfig>{children}</ThemeConfig>
          </CacheProvider>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
