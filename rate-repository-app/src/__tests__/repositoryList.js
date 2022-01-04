import {
  FlatList,
  Image,
  StyleSheet,
  Text as NativeText,
  View,
} from 'react-native';
import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import Text from '../components/Text';
import theme from '../theme';

// digits formatter thousands to K
function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const RepositoryItem = ( {
  id,
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
} ) => {
  return (
      <View style={styles.body}>
        <View style={ styles.headerContainer }>
          <Image source={ { uri: ownerAvatarUrl } } style={ styles.avatar }/>
          <View style={styles.information}>
            <Text testID={"fullName"} color={ 'primary' } fontWeight={ 'bold' }>{ fullName }</Text>
            <Text testID={"description"} style={styles.description}>{ description }</Text>
            <NativeText testID={"language"} style={styles.language}>{ language }</NativeText>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerItem}>
            <Text testID={"starsCount"} fontWeight={'bold'} >{kFormatter(stargazersCount)}</Text>
            <View><Text>Stars</Text></View>
          </View>
          <View style={styles.footerItem}>
            <Text testID={"forksCount"} fontWeight={'bold'}>{kFormatter(forksCount)}</Text>
            <View><Text>Forks</Text></View>
          </View>
          <View style={styles.footerItem}>
            <Text testID={"reviewCount"} fontWeight={'bold'}>{kFormatter(reviewCount)}</Text>
            <View><Text>Reviews</Text></View>
          </View>
          <View style={styles.footerItem}>
            <Text testID={"rating"} fontWeight={'bold'}>{kFormatter(ratingAverage)}</Text>
            <View><Text>Rating</Text></View>
          </View>

        </View>
      </View>

  );
};


export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

  return (
      <FlatList
          testID={'flat-list'}
          data={ repositoryNodes }
          keyExtractor={ item => item.id }
          renderItem={ ( { item } ) => (
              <RepositoryItem testID={"item"} { ...item } />
          ) }
      />
  );

};

/*const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};*/


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { debug, getAllByTestId, getByTestId } = render(<RepositoryListContainer repositories={repositories}/>);

      const fullNames = getAllByTestId("fullName");
      const descriptions = getAllByTestId("description");
      const languages = getAllByTestId("language");
      const stars = getAllByTestId("starsCount");
      const forks = getAllByTestId("forksCount");
      const reviews = getAllByTestId("reviewCount");
      const ratings = getAllByTestId("rating");


      const firstNameOnList = fullNames[0];
      const secondNameOnList = fullNames[1];
      expect(firstNameOnList).toHaveTextContent("jaredpalmer/formik");
      expect(secondNameOnList).toHaveTextContent("async-library/react-async");

      const firstDescriptionOnList = descriptions[0];
      const secondDescriptionOnList = descriptions[1];
      expect(firstDescriptionOnList).toHaveTextContent("Build forms in React, without the tears");
      expect(secondDescriptionOnList).toHaveTextContent("Flexible promise-based React data loader");

      const firstLanguage = languages[0];
      const secondLanguage = languages[1];
      expect(firstLanguage).toHaveTextContent('TypeScript');
      expect(secondLanguage).toHaveTextContent('JavaScript');

      const firstStar = stars[0];
      const secondStar = stars[1];
      expect(firstStar).toHaveTextContent('21.9k');
      expect(secondStar).toHaveTextContent('1.8k');

      const firstFork = forks[0];
      const secondFork = forks[1];
      expect(firstFork).toHaveTextContent('1.6k');
      expect(secondFork).toHaveTextContent('69');

      const firstReview = reviews[0];
      const secondReview = reviews[1];
      expect(firstReview).toHaveTextContent('3');
      expect(secondReview).toHaveTextContent('3');

      const firstRating = ratings[0];
      const secondRating = ratings[1];
      expect(firstRating).toHaveTextContent('88');
      expect(secondRating).toHaveTextContent('72');

    });
  });
});










const styles = StyleSheet.create( {
  body: {
    backgroundColor: theme.colors.white
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
  },
  avatar: {
    flexGrow: 0,
    width: 45, height: 45,
    borderRadius: 5
  },
  information: {
    flexGrow: 1,
    padding: 3,
    marginLeft: 10,
    //marginTop: 10

  },
  description: {
    marginTop: 10
  },
  language: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
    marginTop: 10,

  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 10
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center'
  }
} );