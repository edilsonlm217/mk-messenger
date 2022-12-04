import React, { useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import LoaderService from '../services/Loader';

import { LoaderWrapper } from '../components/Loader/Wrapper';

import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App({ Component, pageProps }: AppProps) {
  const globalLoaderlRef = useRef(null);

  useEffect(() => {
    LoaderService.registerModal(globalLoaderlRef.current);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <LoaderWrapper ref={globalLoaderlRef} />
      <ToastContainer />
    </>
  );
}
