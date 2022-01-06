import { gql } from '@apollo/client';

export const DELETE_REVIEW = gql`
    mutation deleteReview( $reviewId: ID! ) {
        deleteReview( id: $reviewId )
    }
`;

export const AUTHORIZE = gql`
    mutation authorize($username: String!, $password: String!) {
        authorize(credentials: {username: $username, password: $password}) {
            accessToken
            expiresAt
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

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String! ) {
        createUser(user: {username: $username, password: $password}) {
            username
        }
    }
`;