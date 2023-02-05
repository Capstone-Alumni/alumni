'use client';

import { NextAppDirEmotionCacheProvider } from 'tss-react/next';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import ThemeConfig from '@lib/mui';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <ThemeConfig paletteName={theme}>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              theme="light"
            />
          </ThemeConfig>
        </NextAppDirEmotionCacheProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
