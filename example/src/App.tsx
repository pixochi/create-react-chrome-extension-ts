import React from "react";
import { ApolloProvider } from "@apollo/client";

import GraphQLClient from "./graphql/graphql-client";
import Extension from "./extension";

function App() {
  return (
    <ApolloProvider client={GraphQLClient}>
      <Extension />
    </ApolloProvider>
  );
}

export default App;
