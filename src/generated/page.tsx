import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient} from '../withApollo';
export async function getServerPageMy
    (options: Omit<Apollo.QueryOptions<Types.MyQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.MyQuery>({ ...options, query:Operations.MyDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useMy = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MyQuery, Types.MyQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.MyDocument, options);
};
export type PageMyComp = React.FC<{data?: Types.MyQuery, error?: Apollo.ApolloError}>;
export const withPageMy = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.MyQuery, Types.MyQueryVariables>) => (WrappedComponent:PageMyComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.MyDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrMy = {
      getServerPage: getServerPageMy,
      withPage: withPageMy,
      usePage: useMy,
    }
export async function getServerPagePosts
    (options: Omit<Apollo.QueryOptions<Types.PostsQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.PostsQuery>({ ...options, query:Operations.PostsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const usePosts = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PostsQuery, Types.PostsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.PostsDocument, options);
};
export type PagePostsComp = React.FC<{data?: Types.PostsQuery, error?: Apollo.ApolloError}>;
export const withPagePosts = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.PostsQuery, Types.PostsQueryVariables>) => (WrappedComponent:PagePostsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.PostsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrPosts = {
      getServerPage: getServerPagePosts,
      withPage: withPagePosts,
      usePage: usePosts,
    }
