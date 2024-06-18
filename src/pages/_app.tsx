import type { AppProps } from 'next/app';
import type { Page } from '../../types/types';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "../redux/store";
import { PrimeReactProvider } from 'primereact/api';
type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  if (Component.getLayout) {
    return (
      <PrimeReactProvider>
        <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>
      </PrimeReactProvider>
    )
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <PrimeReactProvider>
            <LayoutProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </LayoutProvider>
          </PrimeReactProvider>
        </PersistGate>
      </Provider>
    );
  }
}
