import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
    mutation authorize($username: String!, $password: String!) {
        authorize(credentials: {username: $username, password: $password}) {
            accessToken
            expiresAt
        }
    }
`;


export const AUTHORIZED_USER = gql`
    query {
        authorizedUser {
            id
            username
        }
    }
`;