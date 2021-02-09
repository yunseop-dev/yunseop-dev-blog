import { GetServerSidePropsContext, NextPage } from "next";
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import getCookie from "../utils/getCookie";
import { ParsedUrlQuery } from "querystring";

export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(null, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  );
};

export const getApolloClient = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
  initialState?: NormalizedCacheObject
) => {
  const token = getCookie("token", ctx?.req?.cookies);
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
