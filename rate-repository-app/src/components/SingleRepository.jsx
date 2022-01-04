import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text as NativeText,
  Button,
} from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import {openURL} from 'expo-linking'

const SingleRepository = () => {
  const { id } = useParams();
  const [ repo, setRepo ] = useState( null );
  const { loading, error, data } = useQuery( GET_REPOSITORY,
      { variables: { repositoryId: id } },
  );

  if ( loading ) {
    return (
        <View>
          <Text>Loading...</Text>
        </View>
    )
  }

  // Destruct data from response object
    const {
      fullName,
      description,
      language,
      forksCount,
      stargazersCount,
      ratingAverage,
      reviewCount,
      ownerAvatarUrl,
      url,
    } = data.repository;

  const handleLink = async () => {
    await openURL(url);
  }

  return (
      <View style={ styles.body }>
        <View style={ styles.headerContainer }>
          <Image source={ { uri: ownerAvatarUrl } } style={ styles.avatar }/>
          <View style={ styles.information }>
            <Text color={ 'primary' } fontWeight={ 'bold' }>{ fullName }</Text>
            <Text style={ styles.description }>{ description }</Text>
            <NativeText style={ styles.language }>{ language }</NativeText>
          </View>
        </View>

        <View style={ styles.footerContainer }>
          <View style={ styles.footerItem }>
            <Text fontWeight={ 'bold' }>{ kFormatter( stargazersCount ) }</Text>
            <View><Text>Stars</Text></View>
          </View>
          <View style={ styles.footerItem }>
            <Text fontWeight={ 'bold' }>{ kFormatter( forksCount ) }</Text>
            <View><Text>Forks</Text></View>
          </View>
          <View style={ styles.footerItem }>
            <Text fontWeight={ 'bold' }>{ kFormatter( reviewCount ) }</Text>
            <View><Text>Reviews</Text></View>
          </View>
          <View style={ styles.footerItem }>
            <Text fontWeight={ 'bold' }>{ kFormatter( ratingAverage ) }</Text>
            <View><Text>Rating</Text></View>
          </View>
        </View>
        <View style={styles.button}>
          <Button onPress={handleLink} title={'Open in Github'} />
        </View>
      </View>

  );
};

// digits formatter thousands to K
function kFormatter( num ) {
  return Math.abs( num ) > 999 ? Math.sign( num ) *
      ( ( Math.abs( num ) / 1000 ).toFixed( 1 ) ) + 'k' : Math.sign( num ) *
      Math.abs( num );
}

export default SingleRepository;


const styles = StyleSheet.create( {
  body: {
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
  },
  avatar: {
    flexGrow: 0,
    width: 45, height: 45,
    borderRadius: 5,
  },
  information: {
    flexGrow: 1,
    padding: 3,
    marginLeft: 10,
    //marginTop: 10

  },
  description: {
    marginTop: 10,
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
    marginBottom: 10,
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    fontFamily: theme.fonts.main,
  }

} );