import React from 'react';
import { View, StyleSheet, Text as NativeText, FlatList } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';
import { format as formatDate } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const ItemSeparator = () => <View style={ styles.separator }/>;

const ReviewItem = ( { node } ) => {
  const date = new Date(node.createdAt)
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'white'
    },
    rating: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 15
    },
    content: {
      marginHorizontal: 15,

    },
    contentHeader: {
      marginBottom: 10
    }
  });

  return (
      <View style={styles.container}>
        <View style={styles.rating}>
          <Text fontWeight={'bold'} color={'primary'}>{node.rating }</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text fontWeight={'bold'}>{node.user.username }</Text>
            <Text  color={'textSecondary'}>{formatDate(date, 'dd.MM.yyyy')}</Text>
          </View>
          <Text>{node.text }</Text>
        </View>
      </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const {
    loading: loadingRepository,
    error: errorRepository,
    data: dataRepository,
  } = useQuery( GET_REPOSITORY,
      { variables: { repositoryId: id } },
  );

  const {
    error: errorReviews,
    loading: loadingReviews,
    data: dataReviews,
  } = useQuery( GET_REVIEWS,
      { variables: { repositoryId: id } },
  );

  if ( loadingRepository || loadingReviews ) {
    return (
        <View>
          <Text>Loading...</Text>
        </View>
    );
  }

  return (

        <FlatList
            data={ dataReviews.repository.reviews.edges }
            keyExtractor={ item => item.node.id }
            ItemSeparatorComponent={ ItemSeparator }
            renderItem={ ( { item } ) => <ReviewItem { ...item } /> }
            ListHeaderComponent={ () =>
                <RepositoryItem { ...dataRepository.repository } /> }
        />


  );
};

export default SingleRepository;

const styles = StyleSheet.create( {
  separator: {
    height: 10,
  },
} );

