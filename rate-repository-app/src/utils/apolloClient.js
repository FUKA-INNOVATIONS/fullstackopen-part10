import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://192.168.1.90:4000/graphql',
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;