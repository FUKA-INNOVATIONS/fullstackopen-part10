import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [ repositories, setRepositories ] = useState();

  const { loading, error, data } = useQuery( GET_REPOSITORIES, {
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