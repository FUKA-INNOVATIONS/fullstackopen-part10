import theme from '../theme';
import PressableText from './PressableText';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
  flexContainer: {
    display:'flex',
    flexDirection: 'row'

  },
  flexChild: {
    //flexGrow: 0
  }
} );

const AppBarTab = () => (
    <View style={styles.flexContainer}>
      <PressableText text={ 'Repositories' } link={'/'} style={ {
        color: theme.colors.white,
        padding: 20,
        fontSize: 20,
      } }/>
      <PressableText text={ 'Sign in' } link={'/signin'} style={ {
        color: theme.colors.white,
        padding: 20,
        fontSize: 20,
      } }/>
    </View>
);

export default AppBarTab;