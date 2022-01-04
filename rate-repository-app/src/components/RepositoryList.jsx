import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';

const ItemSeparator = () => <View style={ styles.separator }/>;

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();
  const history = useHistory();

  const repositoryNodes = repositories
      ? repositories.edges.map( edge => edge.node )
      : [];

  return (
      <FlatList
          data={ repositoryNodes }
          ItemSeparatorComponent={ ItemSeparator }
          keyExtractor={ item => item.id }
          renderItem={ ( { item } ) => (
              <Pressable onPress={() => history.push(`/${item.id}`)}><RepositoryItem { ...item } /></Pressable>
          ) }
      />
  );

};

const styles = StyleSheet.create( {
  flexContainer: {
    width: 500,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
  },
  flexItem: {
    width: 250,
    flexGrow: 0,
  },
  separator: {
    height: 10,
  },
} );

export default RepositoryList;