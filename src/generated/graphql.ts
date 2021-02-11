import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
};










export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};




export enum SocialType {
  Github = 'GITHUB',
  Facebook = 'FACEBOOK',
  Twitter = 'TWITTER',
  Google = 'GOOGLE',
  Email = 'EMAIL'
}

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  /** User's e-mail address. */
  email?: Maybe<Scalars['EmailAddress']>;
  socialType: SocialType;
  user: User;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** User ID. */
  id: Scalars['ID'];
  /** User's first name. */
  firstName: Scalars['String'];
  /** User's last name. */
  lastName: Scalars['String'];
  /** Posts published by user. */
  posts?: Maybe<Array<Maybe<Post>>>;
  /** Users that this user is following. */
  following?: Maybe<Array<Maybe<User>>>;
  /** Users that this user is followed by. */
  followers?: Maybe<Array<Maybe<User>>>;
  accounts?: Maybe<Array<Maybe<Account>>>;
};

export type Post = {
  __typename?: 'Post';
  /** Post ID. */
  id: Scalars['ID'];
  /** Post title. */
  title: Scalars['String'];
  /** Post content. */
  content: Scalars['String'];
  /** Post Author. */
  author: User;
  /** Post published timestamp. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** Users who like this post. */
  likedBy?: Maybe<Array<Maybe<User>>>;
};

export enum OrderField {
  PublishedAt = 'publishedAt'
}

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PostOrder = {
  field?: Maybe<OrderField>;
  direction?: Maybe<OrderDirection>;
};

export type Query = {
  __typename?: 'Query';
  /** Get post by ID. */
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  user?: Maybe<User>;
  my?: Maybe<Account>;
  account?: Maybe<Account>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrder>;
  publishedSince?: Maybe<Scalars['DateTime']>;
  q?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
};

/** Publish post input. */
export type PublishPostInput = {
  /** Post title. */
  title: Scalars['String'];
  /** Post content. */
  content: Scalars['String'];
};

export type SignUpInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['EmailAddress'];
  password?: Maybe<Scalars['String']>;
  socialType: SocialType;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Publish post. */
  publishPost: Post;
  /**
   * Follow user.
   * Returns the updated number of followers.
   */
  followUser: Scalars['UnsignedInt'];
  /**
   * Unfollow user.
   * Returns the updated number of followers.
   */
  unfollowUser: Scalars['UnsignedInt'];
  /**
   * Like post.
   * Returns the updated number of likes received.
   */
  likePost: Scalars['UnsignedInt'];
  signUp?: Maybe<User>;
  signIn?: Maybe<Scalars['String']>;
};


export type MutationPublishPostArgs = {
  input: PublishPostInput;
};


export type MutationFollowUserArgs = {
  userId: Scalars['ID'];
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type MyQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQuery = (
  { __typename?: 'Query' }
  & { my?: Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'id' | 'email' | 'socialType'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  direction?: Maybe<OrderDirection>;
  q?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'publishedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ), likedBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>>> }
  )>>> }
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signIn'>
);


export const MyDocument = gql`
    query my {
  my {
    id
    email
    socialType
    user {
      id
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useMyQuery__
 *
 * To run a query within a React component, call `useMyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyQuery(baseOptions?: Apollo.QueryHookOptions<MyQuery, MyQueryVariables>) {
        return Apollo.useQuery<MyQuery, MyQueryVariables>(MyDocument, baseOptions);
      }
export function useMyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyQuery, MyQueryVariables>) {
          return Apollo.useLazyQuery<MyQuery, MyQueryVariables>(MyDocument, baseOptions);
        }
export type MyQueryHookResult = ReturnType<typeof useMyQuery>;
export type MyLazyQueryHookResult = ReturnType<typeof useMyLazyQuery>;
export type MyQueryResult = Apollo.QueryResult<MyQuery, MyQueryVariables>;
export const PostsDocument = gql`
    query posts($direction: OrderDirection, $q: String) {
  posts(orderBy: {field: publishedAt, direction: $direction}, q: $q) {
    id
    title
    content
    publishedAt
    author {
      id
      firstName
      lastName
    }
    likedBy {
      id
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      direction: // value for 'direction'
 *      q: // value for 'q'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password)
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;