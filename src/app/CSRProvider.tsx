'use client';

import { NextAppDirEmotionCacheProvider } from 'tss-react/next';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import ThemeConfig from '@lib/mui';

export default function CSRProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          <ThemeConfig paletteName={theme}>{children}</ThemeConfig>
        </NextAppDirEmotionCacheProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
