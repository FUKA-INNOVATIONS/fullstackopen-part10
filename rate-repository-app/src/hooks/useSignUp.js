import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [ create, result ] = useMutation( CREATE_USER );

  const createUser = async ( username, password ) => {
    console.log( 'create user hook called' );
    const response = await create( { variables: { username, password } } );
    const { data } = response;

    return data

  };
  return [ createUser, result ];
};
export default useSignUp;