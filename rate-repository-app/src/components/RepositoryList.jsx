import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';

const ItemSeparator = () => <View style={ styles.separator }/>;

const RepositoryList = () => {
  let [ filter, setFilter ] = useState(
      { num: 0, orderBy: 'CREATED_AT', orderDirection: 'DESC' } );
  const { repositories, loading, refetch } = useRepositories( filter );
  const history = useHistory();

  const repositoryNodes = repositories
      ? repositories.edges.map( edge => edge.node )
      : [];

  const filterHandler = ( value ) => {
    setFilter(value);
  };

  const FilterRepository = () => {
    const options = [
      {
        label: 'Latest',
        value: { num: 0, orderBy: 'CREATED_AT', orderDirection: 'DESC' },
      },
      {
        label: 'Average rate',
        value: { num: 1, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
      },
      {
        label: 'Lowest rate',
        value: { num: 2, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
      },
    ];

    return (
        <View style={ styles.filterContainer }>
          <SwitchSelector
              textColor={theme.colors.textPrimary}
              buttonColor={theme.colors.primary}
              options={ options }
              initial={ 0 || filter.num }
              onPress={ value => filterHandler( value ) }
          />
        </View>
    );
  };

  return (
      <FlatList
          ListHeaderComponent={ () => <FilterRepository/> }
          data={ repositoryNodes }
          ItemSeparatorComponent={ ItemSeparator }
          keyExtractor={ item => item.id }
          renderItem={ ( { item } ) => (
              <Pressable onPress={ () => history.push(
                  `/${ item.id }` ) }><RepositoryItem { ...item } /></Pressable>
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
  filterContainer: {
    color: 'red',
    padding: 10,
  },
} );

export default RepositoryList;