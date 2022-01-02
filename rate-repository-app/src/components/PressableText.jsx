import React from 'react';
import { Text, Pressable, Alert } from 'react-native';
import { Link } from 'react-router-native';

const PressableText = ( { text, link, style } ) => {
  return (
      <Pressable onPress={ () => Alert.alert( `You pressed ${ text }!` ) }>
        <Link to={ link }><Text style={ { ...style } }>{ text }</Text></Link>
      </Pressable>
  );
};

export default PressableText;