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

export const CREATE_REVIEW = gql`
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
        createReview(review: {repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text}) {
            id
            repository {
                id
                name
                ownerName
            }
            userId
            createdAt
            rating
            text
        }
    }
`;