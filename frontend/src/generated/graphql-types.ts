import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  owner: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  category: CategoryInput;
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  ads: Array<Ad>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Provide either category id or name in order to create */
export type CategoryInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  publishAd: Ad;
};


export type MutationPublishAdArgs = {
  adData: AdInput;
};

export type Query = {
  __typename?: 'Query';
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: string, title: string, description?: string | null, price?: number | null, picture?: string | null }>, getAllCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type PublishAdMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  categoryName?: InputMaybe<Scalars['String']['input']>;
}>;


export type PublishAdMutation = { __typename?: 'Mutation', publishAd: { __typename?: 'Ad', id: string, title: string, description?: string | null, price?: number | null, picture?: string | null, createdAt: any } };

export type GetAllCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoryQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: string, name: string }> };


export const GetAllAdsDocument = gql`
    query GetAllAds {
  getAllAds {
    id
    title
    description
    price
    picture
  }
  getAllCategories {
    id
    name
  }
}
    `;

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
      }
export function useGetAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export function useGetAllAdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<typeof useGetAllAdsLazyQuery>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllAdsSuspenseQuery>;
export type GetAllAdsQueryResult = Apollo.QueryResult<GetAllAdsQuery, GetAllAdsQueryVariables>;
export const PublishAdDocument = gql`
    mutation PublishAd($title: String!, $description: String, $price: Int, $tags: [String!]!, $categoryId: Int, $categoryName: String) {
  publishAd(
    adData: {title: $title, description: $description, price: $price, tags: $tags, category: {id: $categoryId, name: $categoryName}}
  ) {
    id
    title
    description
    price
    picture
    createdAt
  }
}
    `;
export type PublishAdMutationFn = Apollo.MutationFunction<PublishAdMutation, PublishAdMutationVariables>;

/**
 * __usePublishAdMutation__
 *
 * To run a mutation, you first call `usePublishAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishAdMutation, { data, loading, error }] = usePublishAdMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      price: // value for 'price'
 *      tags: // value for 'tags'
 *      categoryId: // value for 'categoryId'
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function usePublishAdMutation(baseOptions?: Apollo.MutationHookOptions<PublishAdMutation, PublishAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishAdMutation, PublishAdMutationVariables>(PublishAdDocument, options);
      }
export type PublishAdMutationHookResult = ReturnType<typeof usePublishAdMutation>;
export type PublishAdMutationResult = Apollo.MutationResult<PublishAdMutation>;
export type PublishAdMutationOptions = Apollo.BaseMutationOptions<PublishAdMutation, PublishAdMutationVariables>;
export const GetAllCategoryDocument = gql`
    query GetAllCategory {
  getAllCategories {
    id
    name
  }
}
    `;

/**
 * __useGetAllCategoryQuery__
 *
 * To run a query within a React component, call `useGetAllCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
      }
export function useGetAllCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
        }
export function useGetAllCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
        }
export type GetAllCategoryQueryHookResult = ReturnType<typeof useGetAllCategoryQuery>;
export type GetAllCategoryLazyQueryHookResult = ReturnType<typeof useGetAllCategoryLazyQuery>;
export type GetAllCategorySuspenseQueryHookResult = ReturnType<typeof useGetAllCategorySuspenseQuery>;
export type GetAllCategoryQueryResult = Apollo.QueryResult<GetAllCategoryQuery, GetAllCategoryQueryVariables>;