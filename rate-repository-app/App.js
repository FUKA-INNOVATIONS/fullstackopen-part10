import React from 'react';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

/*  !!! IMPORTANT !!!
* Apollo client version 3.5+ has issues with metro bundler
* Works fine with 3.4.17
* */

export default function App() {
  return (
      <>
        <NativeRouter>
          <ApolloProvider client={ apolloClient }>
            <AuthStorageContext.Provider value={authStorage}>
              <Main/>
            </AuthStorageContext.Provider>
          </ApolloProvider>
        </NativeRouter>
        <StatusBar style="auto"/>
      </>
  );
};