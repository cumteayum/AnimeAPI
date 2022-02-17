import '../styles/globals.css'
import { HeartIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function Footer() {
  return (
      <div className="flex mb-3 overflow-hidden group">
        <div className="w-screen h-[2px] mt-3 mb-6 bg-gray-400">
          <div className="flex flex-row items-center justify-center px-2 mx-3 mt-1">
            <h1 className="px-2">Made with</h1>
            <HeartIcon className="w-6 h-6 text-red-500 group-hover:text-red-300" />
            <h1 className="px-2">By Ishan</h1>
          </div>
        </div>
      </div>
  );
}

function MyApp({ Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp
