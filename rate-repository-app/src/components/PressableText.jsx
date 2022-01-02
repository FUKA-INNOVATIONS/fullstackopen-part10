import React from 'react';
import { Text, Pressable, Alert } from 'react-native';

const PressableText = props => {
  return (
      <Pressable
          onPress={() => Alert.alert(`You pressed ${props.text}!`)}
      >
        <Text style={{...props.style}}>{props.text}</Text>
      </Pressable>
  );
};

export default PressableText;