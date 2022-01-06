import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import ReviewItem from './ReviewItem';
import { useQuery } from '@apollo/client';

import Text from './Text';
import { AUTHORIZED_USER } from '../graphql/queries';

const ItemSeparator = () => <View style={ styles.separator }/>;

const UserReviews = () => {
  const { loading, data } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true }
  });
  const [ reviews, setReviews ] = useState([]);

  if ( loading ) {
    return (
        <View>
          <Text>Loading...</Text>
        </View>
    );
  }

  console.log('rev: ', data.authorizedUser.reviews.edges)

  return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText} color={'primary'} fontWeight={'bold'}>{data.authorizedUser.reviewCount}</Text>
          <Text color={'textSecondary'}>{data.authorizedUser.reviewCount === 1 ? 'review' : 'reviews'}</Text>
        </View>
        <FlatList
            data={ data.authorizedUser.reviews.edges }
            keyExtractor={ item => item.node.id }
            ItemSeparatorComponent={ ItemSeparator }
            renderItem={ ( { item } ) => <ReviewItem { ...item } /> }
        />
      </View>
  )
}

export default UserReviews;

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30
  }
});
