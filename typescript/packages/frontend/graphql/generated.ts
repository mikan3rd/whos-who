import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type ExternalImage = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  statusCode: Scalars['Int'];
  ticket?: Maybe<Ticket>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type Mutation = {
  createTicketByExternalImageUrl: Ticket;
};


export type MutationCreateTicketByExternalImageUrlArgs = {
  externalImageUrl: Scalars['String'];
};

export type Occupation = {
  Person?: Maybe<Array<Person>>;
  _count: OccupationCount;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nameAlphabet?: Maybe<Scalars['String']>;
  nameHiragana?: Maybe<Scalars['String']>;
  nameKatakana?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type OccupationCount = {
  Person: Scalars['Int'];
};

export type Person = {
  _count: PersonCount;
  birthDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nameAlphabet?: Maybe<Scalars['String']>;
  nameHiragana?: Maybe<Scalars['String']>;
  nameKatakana?: Maybe<Scalars['String']>;
  occupation?: Maybe<Occupation>;
  occupationId?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Ticket>>;
  updatedAt: Scalars['DateTime'];
};

export type PersonCount = {
  tickets: Scalars['Int'];
};

export type Query = {
  getCurrentUser: User;
  getTicketByExternalImageUrl?: Maybe<Ticket>;
  getTicketById?: Maybe<Ticket>;
};


export type QueryGetTicketByExternalImageUrlArgs = {
  externalImageUrl: Scalars['String'];
};


export type QueryGetTicketByIdArgs = {
  id: Scalars['String'];
};

export type Ticket = {
  _count: TicketCount;
  createdAt: Scalars['DateTime'];
  externalImage?: Maybe<ExternalImage>;
  externalImageId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  person?: Maybe<Person>;
  personId?: Maybe<Scalars['String']>;
  ticketUserLikes?: Maybe<Array<TicketUserLike>>;
  updatedAt: Scalars['DateTime'];
  uploadedImage?: Maybe<UploadedImage>;
  uploadedImageId?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type TicketCount = {
  ticketUserLikes: Scalars['Int'];
};

export type TicketUserLike = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  ticket: Ticket;
  ticketId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type UploadedImage = {
  bucketName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  filePath: Scalars['String'];
  id: Scalars['ID'];
  ticket?: Maybe<Ticket>;
  updatedAt: Scalars['DateTime'];
};

export type User = {
  _count: UserCount;
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  role: UserRole;
  status: UserStatus;
  ticketUserLikes?: Maybe<Array<TicketUserLike>>;
  tickets?: Maybe<Array<Ticket>>;
  updatedAt: Scalars['DateTime'];
};

export type UserCount = {
  ticketUserLikes: Scalars['Int'];
  tickets: Scalars['Int'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  None = 'NONE'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED'
}

export type CreateTicketByExternalImageUrlMutationVariables = Exact<{
  externalImageUrl: Scalars['String'];
}>;


export type CreateTicketByExternalImageUrlMutation = { createTicketByExternalImageUrl: { id: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { getCurrentUser: { id: string, displayName?: string | null | undefined, role: UserRole } };

export type GetTicketByExternalImageUrlQueryVariables = Exact<{
  externalImageUrl: Scalars['String'];
}>;


export type GetTicketByExternalImageUrlQuery = { getTicketByExternalImageUrl?: { id: string } | null | undefined };

export type GetTicketByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTicketByIdQuery = { getTicketById?: { id: string, createdAt: any, updatedAt: any, externalImage?: { id: string, url: string, statusCode: number } | null | undefined, uploadedImage?: { id: string, bucketName: string, filePath: string } | null | undefined, user: { id: string, displayName?: string | null | undefined, role: UserRole }, person?: { id: string, name: string } | null | undefined } | null | undefined };


export const CreateTicketByExternalImageUrlDocument = gql`
    mutation createTicketByExternalImageUrl($externalImageUrl: String!) {
  createTicketByExternalImageUrl(externalImageUrl: $externalImageUrl) {
    id
  }
}
    `;
export type CreateTicketByExternalImageUrlMutationFn = Apollo.MutationFunction<CreateTicketByExternalImageUrlMutation, CreateTicketByExternalImageUrlMutationVariables>;

/**
 * __useCreateTicketByExternalImageUrlMutation__
 *
 * To run a mutation, you first call `useCreateTicketByExternalImageUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketByExternalImageUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketByExternalImageUrlMutation, { data, loading, error }] = useCreateTicketByExternalImageUrlMutation({
 *   variables: {
 *      externalImageUrl: // value for 'externalImageUrl'
 *   },
 * });
 */
export function useCreateTicketByExternalImageUrlMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketByExternalImageUrlMutation, CreateTicketByExternalImageUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketByExternalImageUrlMutation, CreateTicketByExternalImageUrlMutationVariables>(CreateTicketByExternalImageUrlDocument, options);
      }
export type CreateTicketByExternalImageUrlMutationHookResult = ReturnType<typeof useCreateTicketByExternalImageUrlMutation>;
export type CreateTicketByExternalImageUrlMutationResult = Apollo.MutationResult<CreateTicketByExternalImageUrlMutation>;
export type CreateTicketByExternalImageUrlMutationOptions = Apollo.BaseMutationOptions<CreateTicketByExternalImageUrlMutation, CreateTicketByExternalImageUrlMutationVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    id
    displayName
    role
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetTicketByExternalImageUrlDocument = gql`
    query getTicketByExternalImageUrl($externalImageUrl: String!) {
  getTicketByExternalImageUrl(externalImageUrl: $externalImageUrl) {
    id
  }
}
    `;

/**
 * __useGetTicketByExternalImageUrlQuery__
 *
 * To run a query within a React component, call `useGetTicketByExternalImageUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketByExternalImageUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketByExternalImageUrlQuery({
 *   variables: {
 *      externalImageUrl: // value for 'externalImageUrl'
 *   },
 * });
 */
export function useGetTicketByExternalImageUrlQuery(baseOptions: Apollo.QueryHookOptions<GetTicketByExternalImageUrlQuery, GetTicketByExternalImageUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketByExternalImageUrlQuery, GetTicketByExternalImageUrlQueryVariables>(GetTicketByExternalImageUrlDocument, options);
      }
export function useGetTicketByExternalImageUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketByExternalImageUrlQuery, GetTicketByExternalImageUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketByExternalImageUrlQuery, GetTicketByExternalImageUrlQueryVariables>(GetTicketByExternalImageUrlDocument, options);
        }
export type GetTicketByExternalImageUrlQueryHookResult = ReturnType<typeof useGetTicketByExternalImageUrlQuery>;
export type GetTicketByExternalImageUrlLazyQueryHookResult = ReturnType<typeof useGetTicketByExternalImageUrlLazyQuery>;
export type GetTicketByExternalImageUrlQueryResult = Apollo.QueryResult<GetTicketByExternalImageUrlQuery, GetTicketByExternalImageUrlQueryVariables>;
export const GetTicketByIdDocument = gql`
    query getTicketById($id: String!) {
  getTicketById(id: $id) {
    id
    createdAt
    updatedAt
    externalImage {
      id
      url
      statusCode
    }
    uploadedImage {
      id
      bucketName
      filePath
    }
    user {
      id
      displayName
      role
    }
    person {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTicketByIdQuery__
 *
 * To run a query within a React component, call `useGetTicketByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTicketByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTicketByIdQuery, GetTicketByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketByIdQuery, GetTicketByIdQueryVariables>(GetTicketByIdDocument, options);
      }
export function useGetTicketByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketByIdQuery, GetTicketByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketByIdQuery, GetTicketByIdQueryVariables>(GetTicketByIdDocument, options);
        }
export type GetTicketByIdQueryHookResult = ReturnType<typeof useGetTicketByIdQuery>;
export type GetTicketByIdLazyQueryHookResult = ReturnType<typeof useGetTicketByIdLazyQuery>;
export type GetTicketByIdQueryResult = Apollo.QueryResult<GetTicketByIdQuery, GetTicketByIdQueryVariables>;