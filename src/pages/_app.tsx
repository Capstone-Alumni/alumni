'use client';

import React from 'react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import createEmotionCache from '@share/utils/createEmotionCache';
import App, { AppContext, AppProps } from 'next/app';
import CSRProvider from '@share/helpers/CSRProvider';
import Header from '@share/components/layout/Header';
import Footer from '@share/components/layout/Footer';
import Body from '@share/components/layout/Body';
import { currentTenantDataAtom, Tenant } from '@share/states';
import { getTenantDataFromReq } from '@share/helpers/getTenantDataFromReq';
import { Providers } from '@redux/providers';

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'src/lib/nprogress/nprogress.css'; //styles of nprogress

import 'quill/dist/quill.snow.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RecoilRoot } from 'recoil';
import GetInitialUserInformation from '@share/helpers/GetInitialUserInformation';
import DynamicHead from '@share/components/layout/DynamicHead';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const clientSideEmotionCache = createEmotionCache();

type CustomAppProps = AppProps & {
  emotionCache: any;
  tenantData: Tenant;
  Component: AppProps['Component'] & {
    getLayout?: (page: JSX.Element) => JSX.Element;
  };
};

const MyApp = (props: CustomAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    tenantData,
  } = props;

  const getLayout =
    Component.getLayout ||
    (page => (
      <>
        <Header />
        <Body>{page}</Body>
        <Footer />
      </>
    ));

  return (
    <>
      <CacheProvider value={emotionCache}>
        <CSRProvider theme={tenantData?.theme}>
          <RecoilRoot
            initializeState={({ set }) => {
              set(currentTenantDataAtom, tenantData);
              // set(currentUserInformationDataAtom, userData);
            }}
          >
            <Providers>
              <DynamicHead />
              <CssBaseline />
              <GetInitialUserInformation>
                {getLayout(<Component {...pageProps} />)}
              </GetInitialUserInformation>
            </Providers>
          </RecoilRoot>
        </CSRProvider>
      </CacheProvider>
    </>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  let data = {};
  if (context.ctx.req) {
    data = await getTenantDataFromReq(context.ctx.req);
  }

  const ctx = App.getInitialProps(context);

  return {
    ctx,
    tenantData: data,
  };
};

export default MyApp;
