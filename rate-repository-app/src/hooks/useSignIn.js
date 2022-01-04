import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [ authorize, result ] = useMutation( AUTHORIZE );

  const signIn = async ( userName, password ) => {
    const { data } = await authorize( { variables: { username: userName, password: password } } );
    const { accessToken } = await data.authorize;
    await authStorage.setAccessToken( accessToken );
    apolloClient.restore();
    //console.log('accessToken in useSignIn: ', await accessToken)
    return accessToken;
  };

  return [ signIn, result ];
};

export default useSignIn;