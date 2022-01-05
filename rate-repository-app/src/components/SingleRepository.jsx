import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery( GET_REPOSITORY,
      { variables: { repositoryId: id } },
  );

  if ( loading ) {
    return (
        <View>
          <Text>Loading...</Text>
        </View>
    );
  }

  return (
      <View>
        <RepositoryItem { ...data.repository } />
      </View>

  );
};

export default SingleRepository;

const styles = StyleSheet.create( {} );

