import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    flexDirection: 'row',
  },
  flexChild: {
    //flexGrow: 0
  },
});

const AppBar = () => {
  return (
      <View>
        <ScrollView horizontal={true} style={styles.container}>
          <AppBarTab text={'Repositories'} link={'/'} />
          <AppBarTab text={'Sign in'} link={'/signin'} />
        </ScrollView>
      </View>
  )
};

export default AppBar;