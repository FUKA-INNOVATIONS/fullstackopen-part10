import React from 'react';
import { View, StyleSheet, Text as NativeText, FlatList } from 'react-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={ styles.separator }/>;



const SingleRepository = () => {
  const { id } = useParams();
  const { loading: loadingRepository, error: errorRepository, data: dataRepository, } = useQuery( GET_REPOSITORY,
      { variables: { repositoryId: id }, fetchPolicy: 'cache-and-network' },
  );

  const { error: errorReviews, loading: loadingReviews, data: dataReviews, fetchMore: fetchMoreReviews, ...result } = useQuery( GET_REVIEWS,
      { variables: { repositoryId: id, first: 9 }, fetchPolicy: 'cache-and-network' },
  );

  if ( loadingRepository || loadingReviews ) {
    return (
        <View>
          <Text>Loading...</Text>
        </View>
    );
  }

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    handleFetchMore();
  };

  const handleFetchMore = () => {
    console.log('Fetching more reviews');
    const canFetchMore = !loadingReviews && dataReviews?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMoreReviews({
      variables: {
        repositoryId: id,
        first: 7,
        after: dataReviews.repository.reviews.pageInfo.endCursor
      },
    });
  };


  return (

        <FlatList
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
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

