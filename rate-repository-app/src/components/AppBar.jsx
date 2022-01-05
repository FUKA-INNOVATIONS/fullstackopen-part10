import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import { AUTHORIZED_USER } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create( {
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    flexDirection: 'row',
  },
  flexChild: {
    //flexGrow: 0
  },
} );

const AppBar = () => {
  const { data } = useQuery(AUTHORIZED_USER);
  const [ isAuthorized, setIsAuthorized ] = useState(false);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();


  useEffect(() => {
    if ( data && data !== 'undefined' && data.authorizedUser ) {
      setIsAuthorized(true);
    }
  }, data);

  console.log('authorized: ', isAuthorized);

  const logoutHandler = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    await alert('Signed out and store reseted!');
  }
  return (
      <View>
        <ScrollView horizontal={ true } style={ styles.container }>
          <AppBarTab text={ 'Repositories' } link={ '/' }/>
          { !isAuthorized && <AppBarTab text={ 'Sign in' } link={ '/sign-in' }/>}
          { isAuthorized && <AppBarTab text={ 'Create a review' } link={ '/create-review' }/>}
          { isAuthorized &&  <AppBarTab pressHandler={logoutHandler} text={ 'Sign out' } link={ '/' }/>}
        </ScrollView>
      </View>
  );
};

export default AppBar;