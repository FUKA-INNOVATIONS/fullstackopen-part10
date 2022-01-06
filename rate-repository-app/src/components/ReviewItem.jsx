import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format as formatDate } from 'date-fns';

const ReviewItem = ( { node } ) => {
  const date = new Date(node.createdAt)

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

export default ReviewItem;




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