'use client';

import { NextAppDirEmotionCacheProvider } from 'tss-react/next';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import ThemeConfig from '@lib/mui';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { currentTenantDataAtom, Tenant } from '@share/states';

export default function CSRProvider({
  children,
  theme,
  tenantData,
}: {
  children: React.ReactNode;
  theme: string;
  tenantData: Tenant;
}) {
  return (
    <SessionProvider>
      <RecoilRoot
        initializeState={({ set }) => {
          set(currentTenantDataAtom, tenantData);
        }}
      >
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
      </RecoilRoot>
    </SessionProvider>
  );
}
