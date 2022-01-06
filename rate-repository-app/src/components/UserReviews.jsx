import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-native';

import Text from './Text';
import { AUTHORIZED_USER } from '../graphql/queries';
import { format as formatDate } from 'date-fns';
import theme from '../theme';
import { DELETE_REVIEW } from '../graphql/mutations';

const ItemSeparator = () => <View style={ styles.separator }/>;

const ReviewItem = ( { node, handleDelete, handleView } ) => {
  const date = new Date( node.createdAt );

  const onDelete = () =>
      Alert.alert(
          'Delete review',
          `Are you sure you want to delete this review? \n \n " ${ node.text } "`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log( 'Cancel Pressed' ),
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => handleDelete(node.id),
            },
          ],
      );

return (
    <View>
      <View style={ styles.container }>
        <View style={ styles.rating }>
          <Text fontWeight={ 'bold' } color={ 'primary' }>{ node.rating }</Text>
        </View>
        <View style={ styles.content }>
          <View style={ styles.contentHeader }>
            <Text fontWeight={ 'bold' }>{ node.user.username }</Text>
            <Text color={ 'textSecondary' }>{ formatDate( date,
                'dd.MM.yyyy' ) }</Text>
          </View>
          <Text>{ node.text }</Text>
        </View>
      </View>
      <View style={ styles.actionContainer }>
        <Button onPress={ () => handleView( node.repositoryId ) }
                title={ 'View Repository' }></Button>
        <Button onPress={ onDelete } title={ 'Delete review' }></Button>
      </View>
    </View>

);
}
;

const UserReviews = () => {
  const history = useHistory();
  const { loading, data, refetch } = useQuery( AUTHORIZED_USER, {
    variables: { includeReviews: true },
  } );
  const [ reviews, setReviews ] = useState( [] );

  const [ deleteReview, result ] = useMutation(DELETE_REVIEW);

  if ( loading ) {
    return (
        <View>
          <Text>Loading...</Text>
        </View>
    );
  }

  const handleView = ( repositoryId ) => {
    history.push( `/${ repositoryId }` );
  };

  const handleDelete = async ( nodeId ) => {
    console.log( 'try to delete: ', nodeId );
    try {
      await deleteReview({ variables: { reviewId: nodeId } })
      console.log( 'was deleted: ', nodeId );
      await refetch()
    } catch ( e ) {
      console.log( 'error: : ', e );
    }
  };

  return (
      <View>
        <View style={ styles.header }>
          <View style={ styles.counterCircle }>
            <Text style={ styles.headerText } color={ 'primary' }
                  fontWeight={ 'bold' }>{ data.authorizedUser.reviewCount }</Text>
          </View>
          <Text color={ 'textSecondary' }>{ data.authorizedUser.reviewCount ===
          1 ? 'review' : 'reviews' }</Text>
        </View>
        <FlatList
            data={ data.authorizedUser.reviews.edges }
            keyExtractor={ item => item.node.id }
            ItemSeparatorComponent={ ItemSeparator }
            renderItem={ ( { item } ) => <ReviewItem handleView={ handleView }
                                                     handleDelete={ handleDelete } { ...item } /> }
        />
      </View>
  );
};

export default UserReviews;

const styles = StyleSheet.create( {
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 15,
  },
  separator: {
    height: 10,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
  },
  counterCircle: {
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    marginBottom: 5,

  },
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  rating: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 15,
  },
  content: {
    marginHorizontal: 15,

  },
  contentHeader: {
    marginBottom: 10,
  },
} );
