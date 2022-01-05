import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import PressableText from './PressableText';

const ItemSeparator = () => <View style={ styles.separator }/>;

const RepositoryList = () => {
  const [ searchKeyword, setSearchKeyword ] = useState();
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

  const searchHandler = () => {
    console.log('searchKeyword')
    setFilter({searchKeyword: searchKeyword});
    console.log('searchKeyword: ', filter)
  }

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

    // TODO: Fix textInput focus issue
    return (
        <View style={ styles.filterContainer }>
          <View style={styles.searchContainer}>
            <TextInput
                value={searchKeyword}
                onChangeText={value => setTimeout(() => setSearchKeyword(value), 3000)}
                style={styles.searchInput}
                placeholder={ 'Write a search keyword' }>
            </TextInput>
            <PressableText
                pressHandler={searchHandler}
                style={styles.searchBtn}
                text={'Search'} >Search
            </PressableText>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',

  },
  searchInput: {
    borderColor: theme.colors.textPrimary,
    borderWidth: 0.2,
    borderRadius: 30,
    flexGrow: 1,
    maxWidth: 300,
    marginRight: 10,
    padding: 15,
    color: theme.colors.primary,
    fontSize: 15
  },
  searchBtn: {
    marginTop: 10,
    color: theme.colors.primary,
    fontFamily: theme.fonts.main
  }
} );

export default RepositoryList;