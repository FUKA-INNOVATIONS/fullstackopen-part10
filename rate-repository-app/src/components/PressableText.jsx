import React from 'react';
import { Text, Pressable, Alert } from 'react-native';
import { Link } from 'react-router-native';

const PressableText = ( { pressHandler, text, link, style } ) => {
  return (
      <Pressable >
        <Link onPress={pressHandler} to={ link }><Text style={ { ...style } }>{ text }</Text></Link>
      </Pressable>
  );
};

export default PressableText;