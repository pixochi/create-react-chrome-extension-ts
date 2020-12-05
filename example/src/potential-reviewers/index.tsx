import React from "react";
import { useQuery } from "@apollo/client";
import { List, Image, Header, Dimmer, Loader } from "semantic-ui-react";

import * as Queries from "../graphql/queries";
import * as Helpers from "../helpers";

const getInitialPotentialReviewers = (assignableUserNodes) => {
  if (!assignableUserNodes) {
    return {};
  }

  return assignableUserNodes?.reduce((reviewersAcc, assignableUser) => {
    const reviewer = {
      user: {
        login: assignableUser.login,
        name: assignableUser.name,
        avatarUrl: assignableUser.avatarUrl,
        url: assignableUser.url,
      },
      reviewRequests: [],
    };

    reviewersAcc[assignableUser.login] = reviewer;

    return reviewersAcc;
  }, {});
};

function PotentialReviewers() {
  const {
    data: repoReviewersData,
    loading: loadingRepoReviewers,
    error: repoReviewersError,
  } = useQuery(Queries.RepoReviewersQuery, {
    variables: {
      repoOwner: Helpers.getRepoOwner(),
      repoName: Helpers.getRepoName(),
    },
  });

  const potentialReviewers = repoReviewersData?.repository?.pullRequests.nodes.reduce(
    (reviewersAcc, pullRequestNode) => {
      pullRequestNode.reviewRequests.nodes.forEach((reviewRequestNode) => {
        const reviewerLogin = reviewRequestNode.requestedReviewer.login;
        const potentialReviewer = reviewersAcc[reviewerLogin] || {
          user: {},
          reviewRequests: [],
        };

        const updatedReviewRequests = potentialReviewer.reviewRequests.concat({
          pullRequestUrl: pullRequestNode.url,
          pullRequestTitle: pullRequestNode.title,
        });

        reviewersAcc[reviewerLogin] = {
          user: {
            login: reviewRequestNode.requestedReviewer.login,
            name: reviewRequestNode.requestedReviewer.name,
            avatarUrl: reviewRequestNode.requestedReviewer.avatarUrl,
            url: reviewRequestNode.requestedReviewer.url,
          },
          reviewRequests: updatedReviewRequests,
        };
      });

      return reviewersAcc;
    },
    getInitialPotentialReviewers(
      repoReviewersData?.repository?.assignableUsers.nodes
    )
  );

  if (loadingRepoReviewers) {
    return (
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  if (repoReviewersError) {
    return (
      <Header as="h3" disabled>
        {repoReviewersError?.message}
      </Header>
    );
  }

  if (!potentialReviewers) {
    return (
      <Header as="h3" disabled>
        No potential reviewers found
      </Header>
    );
  }

  return (
    <List relaxed>
      {Object.keys(potentialReviewers)
        .sort((userLogin1, userLogin2) => {
          const reviewer1 = potentialReviewers[userLogin1];
          const reviewer2 = potentialReviewers[userLogin2];

          return (
            reviewer2.reviewRequests.length - reviewer1.reviewRequests.length
          );
        })
        .map((userLogin) => (
          <List.Item key={userLogin}>
            <Image avatar src={potentialReviewers[userLogin].user.avatarUrl} />
            <List.Content>
              <List.Header
                as="a"
                target="_blank"
                href={potentialReviewers[userLogin].user.url}
              >{`${userLogin} (${potentialReviewers[userLogin].reviewRequests.length})`}</List.Header>
              <List.Description>
                <List relaxed>
                  {potentialReviewers[userLogin].reviewRequests.map(
                    (request) => (
                      <List.Item
                        key={request.pullRequestUrl}
                        as="a"
                        target="_blank"
                        href={request.pullRequestUrl}
                      >
                        {request.pullRequestTitle}
                      </List.Item>
                    )
                  )}
                </List>
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
    </List>
  );
}

export default PotentialReviewers;
