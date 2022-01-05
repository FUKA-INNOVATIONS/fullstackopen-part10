import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ( { orderBy, orderDirection }) => {
  const [ repositories, setRepositories ] = useState();

  const { loading, error, data, refetch } = useQuery( GET_REPOSITORIES, {
    variables: {orderBy: orderBy, orderDirection: orderDirection},
    fetchPolicy: 'cache-and-network',
  } );

  const fetchRepositories = async () => {
      await setRepositories( data.repositories );
  };

  useEffect( () => {
    fetchRepositories();
  }, [loading] );

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;