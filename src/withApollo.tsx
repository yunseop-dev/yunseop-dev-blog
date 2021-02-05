import { NextPage } from "next";
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(null, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  );
};

export const getApolloClient = (
  _ctx?: any,
  initialState?: NormalizedCacheObject
) => {
  const httpLink = createHttpLink({
    uri: process.browser
      ? process.env.NEXT_PUBLIC_GRAPHQL_URL
      : `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
    fetch,
  });
  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: httpLink,
    cache,
  });
};
