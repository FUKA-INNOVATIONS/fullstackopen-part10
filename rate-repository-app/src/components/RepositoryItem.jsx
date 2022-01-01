import React from 'react';
import { Text, View } from 'react-native-web';

const RepositoryItem = ({
  fullName, description, language, forksCount, stargazersCount, ratingAverage, reviewCount }) => {
  return (
      <View>
        <Text>Fullname: { fullName }</Text>
        <Text>Description: { description }</Text>
        <Text>Language: { language }</Text>
        <Text>Stars: { stargazersCount }</Text>
        <Text>Forks: { forksCount }</Text>
        <Text>Reviews: { reviewCount }</Text>
        <Text>Rating: { ratingAverage }</Text>
      </View>
  );
};

export default RepositoryItem;