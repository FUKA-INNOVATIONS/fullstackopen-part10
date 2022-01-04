import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
    padding: 15,
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style= {!error ? textInputStyle : styles.error} {...props} />;
};

export default TextInput;