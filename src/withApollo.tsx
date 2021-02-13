import { GetServerSidePropsContext, NextPage } from "next";
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { getCookie } from "./utils/cookie";
import { ParsedUrlQuery } from "querystring";
import { isLoggedInVar } from "./graphql/cache";

export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  );
};

export const getApolloClient = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery>,
  initialState?: NormalizedCacheObject
) => {
  const token = getCookie("token", ctx?.req?.cookies);
  console.log("🐛", token);
  if (token) {
    isLoggedInVar(true);
  }
  const httpLink = createHttpLink({
    uri: process.browser
      ? process.env.NEXT_PUBLIC_GRAPHQL_URL
      : `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
    fetch,
    headers: {
      authorization: token,
    },
  });
  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: httpLink,
    cache,
  });
};
