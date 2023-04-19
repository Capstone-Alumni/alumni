'use client';

import { NextAppDirEmotionCacheProvider } from 'tss-react/next';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import ThemeConfig from '@lib/mui';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Alumni,
  currentTenantDataAtom,
  currentUserInformationDataAtom,
  Tenant,
} from '@share/states';

export default function CSRProvider({
  children,
  theme,
  tenantData,
  currentUserData,
}: {
  children: React.ReactNode;
  theme: string;
  tenantData: Tenant;
  currentUserData: Alumni;
}) {
  return (
    <SessionProvider>
      <RecoilRoot
        initializeState={({ set }) => {
          set(currentTenantDataAtom, tenantData);
          set(currentUserInformationDataAtom, currentUserData);
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
