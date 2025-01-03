import { Loading } from '@/components/Shared/Loading';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { store } from 'store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`handleStart: ${url}`);

      setLoading(true);
    };
    const handleComplete = (url: string) => {
      console.log(`handleComplete: ${url}`);
      setLoading(false);
    };
    const handleError = (err: any, url: string) => {
      console.log(`handleError: ${url}`);
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router, loading]);

  return loading ? (
    <Loading />
  ) : (
    <React.Fragment>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
};

export default MyApp;
