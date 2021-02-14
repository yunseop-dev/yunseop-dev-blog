import { NextPage } from "next";
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { getCookie } from "./utils/cookie";
import { isLoggedInVar } from "./graphql/cache";
import { setContext } from "@apollo/client/link/context";

export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  );
};

const authLink = setContext((_, { headers }) => {
  const token = getCookie("token");
  if (token) {
    isLoggedInVar(true);
  }

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

export const getApolloClient = (
  _: any,
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
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache,
  });
};
