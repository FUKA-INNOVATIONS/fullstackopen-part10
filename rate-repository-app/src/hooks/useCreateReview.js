import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [ create, result ] = useMutation( CREATE_REVIEW );

  const createReview = async ( repositoryName, ownerName, rating, text ) => {
    const response = await create(
        { variables: { repositoryName, ownerName, rating, text } } );
    const { data } = response;

    /* if ( data && data.createReview) {
     const { repositoryId } = data.createReview.repository;
     history.push(`/${repositoryId}`);
     } */

    return data;
  };

  return [ createReview, result ];
};

export default useCreateReview;