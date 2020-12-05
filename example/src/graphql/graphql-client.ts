import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import * as AuthService from "../services/auth-service";

const GITHUB_API_URI = "https://api.github.com/graphql";

const httpLink = createHttpLink({
  uri: GITHUB_API_URI,
});

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from local storage if it exists.
  const accessToken = await AuthService.getAccessToken();

  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
