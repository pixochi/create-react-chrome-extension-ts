import { gql } from "@apollo/client";

const UserFragment = gql`
  fragment UserFragment on User {
    login
    name
    avatarUrl
    url
  }
`;

const RequestedReviewersFragment = gql`
  fragment RequestedReviewersFragment on Repository {
    pullRequests(first: 100, states: [OPEN]) {
      nodes {
        url
        title
        reviewRequests(first: 100) {
          nodes {
            requestedReviewer {
              ...UserFragment
            }
          }
        }
      }
    }
  }
  ${UserFragment}
`;

const AssignableUsersFragment = gql`
  fragment AssignableUsersFragment on Repository {
    assignableUsers(first: 100) {
      nodes {
        ...UserFragment
      }
    }
  }
  ${UserFragment}
`;

export const RepoReviewersQuery = gql`
  query RepoReviewersQuery($repoOwner: String!, $repoName: String!) {
    repository(owner: $repoOwner, name: $repoName) {
      ...AssignableUsersFragment
      ...RequestedReviewersFragment
    }
  }
  ${AssignableUsersFragment}
  ${RequestedReviewersFragment}
`;

export const CurrentUserQuery = gql`
  query CurrentUserQuery {
    viewer {
      login
    }
  }
`;
