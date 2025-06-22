/**
 * @fileoverview Next.js App component with global providers and theme setup
 */

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { JSX } from 'react';

/**
 * Main App component
 * @param props - App props containing Component and pageProps
 * @returns JSX.Element The main app component
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Country Explorer</title>
        <meta
          name="description"
          content="Explore countries around the world with detailed information"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Country Explorer" />
        <meta
          property="og:description"
          content="Explore countries around the world with detailed information"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Country Explorer" />
        <meta
          property="twitter:description"
          content="Explore countries around the world with detailed information"
        />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://restcountries.com" />
        <link rel="dns-prefetch" href="https://restcountries.com" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
