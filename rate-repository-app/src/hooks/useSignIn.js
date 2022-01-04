import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [ authorize, result ] = useMutation( AUTHORIZE );

  const signIn = async ( userName, password ) => {
    //console.log('u, p in useSign: ', userName, password);
    await authorize( { variables: { username: userName, password: password } } );
  };

  return [ signIn, result ];
};

export default useSignIn;