import { GetServerSidePropsContext, NextPage } from "next";
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
import { offsetLimitPagination } from "@apollo/client/utilities";
import { ParsedUrlQuery } from "querystring";

export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
      <Comp {...props} />
    </ApolloProvider>
  );
};

const getToken = (ctx: any) => {
  const token = getCookie("token", ctx?.req?.cookies);
  isLoggedInVar(!!token);
  return token;
};

export const getApolloClient = (
  ctx?: GetServerSidePropsContext<ParsedUrlQuery>,
  initialState?: NormalizedCacheObject
) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: getToken(ctx),
      },
    };
  });

  const httpLink = createHttpLink({
    uri: process.browser
      ? process.env.NEXT_PUBLIC_GRAPHQL_URL
      : `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
    fetch,
  });
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: offsetLimitPagination([]),
        },
      },
    },
  }).restore(initialState || {});
  return new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache,
  });
};
