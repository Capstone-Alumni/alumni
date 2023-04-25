'use client';

import { NextAppDirEmotionCacheProvider } from 'tss-react/next';
import { SessionProvider } from 'next-auth/react';

import ThemeConfig from '@lib/mui';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function CSRProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) {
  return (
    <SessionProvider>
      <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
        <ThemeConfig paletteName={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              theme="colored"
            />
          </LocalizationProvider>
        </ThemeConfig>
      </NextAppDirEmotionCacheProvider>
    </SessionProvider>
  );
}
