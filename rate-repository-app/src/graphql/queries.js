import { gql } from '@apollo/client';

export const GET_REVIEWS = gql`
    query getReviews($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            reviews {
                edges {
                    node {
                        id
                        createdAt
                        rating
                        text
                        user {
                            id
                            username
                            reviewCount
                        }
                    }
                }
            }
        }
    }
`;


export const GET_REPOSITORIES = gql`
    query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
            edges {
                node {
                    id
                    fullName
                    description
                    language
                    forksCount
                    stargazersCount
                    ratingAverage
                    reviewCount
                    ownerAvatarUrl
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query getRepository($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl
            url
        }
    }
`;