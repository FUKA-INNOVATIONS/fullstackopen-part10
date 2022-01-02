import React from 'react';
import { View, StyleSheet } from 'react-native';

import PressableText from './PressableText';
import theme from '../theme';


const styles = StyleSheet.create( {
  pressableText: {
    color: theme.colors.white,
    padding: 15,
    fontSize: 15,
  },
} );

const AppBarTab = ( { text, link } ) => (
    <View>
      <PressableText
          text={ text }
          link={ link }
          style={ { ...styles.pressableText } }/>
    </View>
);

export default AppBarTab;