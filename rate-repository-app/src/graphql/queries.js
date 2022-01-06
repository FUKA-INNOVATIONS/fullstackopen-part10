import { gql } from '@apollo/client';

// Get reviews without pagination
/*export const GET_REVIEWS = gql`
 query getReviews($repositoryId: ID!, ) {
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
 `;*/

// Get paginated reviews
export const GET_REVIEWS = gql`
    query getReviews($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId, ) {
            id
            fullName
            reviews(first: $first, after: $after) {
                totalCount
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repositoryId
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
`;

export const GET_REPOSITORIES = gql`
    query getRepositories(
        $orderBy: AllRepositoriesOrderBy,
        $orderDirection: OrderDirection,
        $searchKeyword: String
    ) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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