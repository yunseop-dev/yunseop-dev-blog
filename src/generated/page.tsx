import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient} from '../withApollo';

export async function getServerPageGetContinents
    (options: Omit<Apollo.QueryOptions<Types.GetContinentsQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetContinentsQuery>({ ...options, query:Operations.GetContinentsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetContinents = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetContinentsQuery, Types.GetContinentsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetContinentsDocument, options);
};
export type PageGetContinentsComp = React.FC<{data?: Types.GetContinentsQuery, error?: Apollo.ApolloError}>;
export const withPageGetContinents = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetContinentsQuery, Types.GetContinentsQueryVariables>) => (WrappedComponent:PageGetContinentsComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetContinentsDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetContinents = {
      getServerPage: getServerPageGetContinents,
      withPage: withPageGetContinents,
      usePage: useGetContinents,
    }
export async function getServerPageGetCountries
    (options: Omit<Apollo.QueryOptions<Types.GetCountriesQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetCountriesQuery>({ ...options, query:Operations.GetCountriesDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetCountries = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetCountriesQuery, Types.GetCountriesQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetCountriesDocument, options);
};
export type PageGetCountriesComp = React.FC<{data?: Types.GetCountriesQuery, error?: Apollo.ApolloError}>;
export const withPageGetCountries = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetCountriesQuery, Types.GetCountriesQueryVariables>) => (WrappedComponent:PageGetCountriesComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetCountriesDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetCountries = {
      getServerPage: getServerPageGetCountries,
      withPage: withPageGetCountries,
      usePage: useGetCountries,
    }
export async function getServerPageGetCountriesByCode
    (options: Omit<Apollo.QueryOptions<Types.GetCountriesByCodeQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetCountriesByCodeQuery>({ ...options, query:Operations.GetCountriesByCodeDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetCountriesByCode = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetCountriesByCodeQuery, Types.GetCountriesByCodeQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetCountriesByCodeDocument, options);
};
export type PageGetCountriesByCodeComp = React.FC<{data?: Types.GetCountriesByCodeQuery, error?: Apollo.ApolloError}>;
export const withPageGetCountriesByCode = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetCountriesByCodeQuery, Types.GetCountriesByCodeQueryVariables>) => (WrappedComponent:PageGetCountriesByCodeComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetCountriesByCodeDocument, options)    
                return <WrappedComponent {...props} data={data} error={error} /> ;
                   
            }; 
export const ssrGetCountriesByCode = {
      getServerPage: getServerPageGetCountriesByCode,
      withPage: withPageGetCountriesByCode,
      usePage: useGetCountriesByCode,
    }