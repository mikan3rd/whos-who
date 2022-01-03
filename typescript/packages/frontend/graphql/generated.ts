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
  /** Date custom scalar type */
  Date: string;
};

export type ExternalImage = {
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  statusCode: Scalars['Int'];
  ticket?: Maybe<Ticket>;
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
};

export type Mutation = {
  createPersonSuggestion: PersonSuggestion;
  createPersonSuggestionLike: PersonSuggestionLike;
  createTicketByExternalImageUrl: Ticket;
};


export type MutationCreatePersonSuggestionArgs = {
  personSuggestionCreate: PersonSuggestionCreateInput;
};


export type MutationCreatePersonSuggestionLikeArgs = {
  personSuggestionId: Scalars['String'];
};


export type MutationCreateTicketByExternalImageUrlArgs = {
  externalImageUrl: Scalars['String'];
};

export type Occupation = {
  _count: OccupationCount;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nameAlphabet?: Maybe<Scalars['String']>;
  nameHiragana?: Maybe<Scalars['String']>;
  nameKatakana?: Maybe<Scalars['String']>;
  persons?: Maybe<Array<Person>>;
  updatedAt: Scalars['Date'];
};

export type OccupationCount = {
  persons: Scalars['Int'];
};

export type Person = {
  _count: PersonCount;
  birthDate?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nameAlphabet?: Maybe<Scalars['String']>;
  nameHiragana?: Maybe<Scalars['String']>;
  nameKatakana?: Maybe<Scalars['String']>;
  occupation?: Maybe<Occupation>;
  occupationId?: Maybe<Scalars['String']>;
  personSuggestions?: Maybe<Array<PersonSuggestion>>;
  tickets?: Maybe<Array<Ticket>>;
  updatedAt: Scalars['Date'];
};

export type PersonCount = {
  personSuggestions: Scalars['Int'];
  tickets: Scalars['Int'];
};

export type PersonSuggestion = {
  _count: PersonSuggestionCount;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  mainTicket?: Maybe<Ticket>;
  person: Person;
  personId: Scalars['String'];
  personSuggestionLikes?: Maybe<Array<PersonSuggestionLike>>;
  ticket: Ticket;
  ticketId: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type PersonSuggestionCount = {
  personSuggestionLikes: Scalars['Int'];
};

export type PersonSuggestionCreateInput = {
  personId?: InputMaybe<Scalars['String']>;
  personName?: InputMaybe<Scalars['String']>;
  ticketId: Scalars['String'];
};

export type PersonSuggestionLike = {
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  personSuggestion: PersonSuggestion;
  personSuggestionId: Scalars['String'];
  ticket: Ticket;
  ticketId: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type Query = {
  getCurrentUser: User;
  getTicketByExternalImageUrl?: Maybe<Ticket>;
  getTicketById?: Maybe<Ticket>;
  searchPersonByWord: Array<Person>;
};


export type QueryGetTicketByExternalImageUrlArgs = {
  externalImageUrl: Scalars['String'];
};


export type QueryGetTicketByIdArgs = {
  id: Scalars['String'];
};


export type QuerySearchPersonByWordArgs = {
  word: Scalars['String'];
};

export type Ticket = {
  _count: TicketCount;
  createdAt: Scalars['Date'];
  externalImage?: Maybe<ExternalImage>;
  externalImageId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mainPersonSuggestion?: Maybe<PersonSuggestion>;
  mainPersonSuggestionId?: Maybe<Scalars['String']>;
  person?: Maybe<Person>;
  personId?: Maybe<Scalars['String']>;
  personSuggestionLikes?: Maybe<Array<PersonSuggestionLike>>;
  personSuggestions?: Maybe<Array<PersonSuggestion>>;
  ticketUserLikes?: Maybe<Array<TicketUserLike>>;
  updatedAt: Scalars['Date'];
  uploadedImage?: Maybe<UploadedImage>;
  uploadedImageId?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type TicketCount = {
  personSuggestionLikes: Scalars['Int'];
  personSuggestions: Scalars['Int'];
  ticketUserLikes: Scalars['Int'];
};

export type TicketUserLike = {
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  ticket: Ticket;
  ticketId: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type UploadedImage = {
  bucketName: Scalars['String'];
  createdAt: Scalars['Date'];
  filePath: Scalars['String'];
  id: Scalars['ID'];
  ticket?: Maybe<Ticket>;
  updatedAt: Scalars['Date'];
};

export type User = {
  PersonSuggestionLikes?: Maybe<Array<PersonSuggestionLike>>;
  _count: UserCount;
  createdAt: Scalars['Date'];
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  personSuggestions?: Maybe<Array<PersonSuggestion>>;
  point: Scalars['Int'];
  role: UserRole;
  status: UserStatus;
  ticketUserLikes?: Maybe<Array<TicketUserLike>>;
  tickets?: Maybe<Array<Ticket>>;
  updatedAt: Scalars['Date'];
};

export type UserCount = {
  PersonSuggestionLikes: Scalars['Int'];
  personSuggestions: Scalars['Int'];
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

export type CreatePersonSuggestionMutationVariables = Exact<{
  personSuggestionCreate: PersonSuggestionCreateInput;
}>;


export type CreatePersonSuggestionMutation = { createPersonSuggestion: { id: string } };

export type CreatePersonSuggestionLikeMutationVariables = Exact<{
  personSuggestionId: Scalars['String'];
}>;


export type CreatePersonSuggestionLikeMutation = { createPersonSuggestionLike: { id: string } };

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


export type GetTicketByIdQuery = { getTicketById?: { id: string, createdAt: string, updatedAt: string, externalImage?: { id: string, url: string, statusCode: number } | null | undefined, uploadedImage?: { id: string, bucketName: string, filePath: string } | null | undefined, user: { id: string, displayName?: string | null | undefined, role: UserRole }, person?: { id: string, name: string } | null | undefined, personSuggestions?: Array<{ id: string, person: { id: string, name: string }, user: { id: string }, _count: { personSuggestionLikes: number } }> | null | undefined, _count: { ticketUserLikes: number } } | null | undefined };

export type SearchPersonByWordQueryVariables = Exact<{
  word: Scalars['String'];
}>;


export type SearchPersonByWordQuery = { searchPersonByWord: Array<{ id: string, name: string }> };


export const CreatePersonSuggestionDocument = gql`
    mutation createPersonSuggestion($personSuggestionCreate: PersonSuggestionCreateInput!) {
  createPersonSuggestion(personSuggestionCreate: $personSuggestionCreate) {
    id
  }
}
    `;
export type CreatePersonSuggestionMutationFn = Apollo.MutationFunction<CreatePersonSuggestionMutation, CreatePersonSuggestionMutationVariables>;

/**
 * __useCreatePersonSuggestionMutation__
 *
 * To run a mutation, you first call `useCreatePersonSuggestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonSuggestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonSuggestionMutation, { data, loading, error }] = useCreatePersonSuggestionMutation({
 *   variables: {
 *      personSuggestionCreate: // value for 'personSuggestionCreate'
 *   },
 * });
 */
export function useCreatePersonSuggestionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonSuggestionMutation, CreatePersonSuggestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonSuggestionMutation, CreatePersonSuggestionMutationVariables>(CreatePersonSuggestionDocument, options);
      }
export type CreatePersonSuggestionMutationHookResult = ReturnType<typeof useCreatePersonSuggestionMutation>;
export type CreatePersonSuggestionMutationResult = Apollo.MutationResult<CreatePersonSuggestionMutation>;
export type CreatePersonSuggestionMutationOptions = Apollo.BaseMutationOptions<CreatePersonSuggestionMutation, CreatePersonSuggestionMutationVariables>;
export const CreatePersonSuggestionLikeDocument = gql`
    mutation createPersonSuggestionLike($personSuggestionId: String!) {
  createPersonSuggestionLike(personSuggestionId: $personSuggestionId) {
    id
  }
}
    `;
export type CreatePersonSuggestionLikeMutationFn = Apollo.MutationFunction<CreatePersonSuggestionLikeMutation, CreatePersonSuggestionLikeMutationVariables>;

/**
 * __useCreatePersonSuggestionLikeMutation__
 *
 * To run a mutation, you first call `useCreatePersonSuggestionLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonSuggestionLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonSuggestionLikeMutation, { data, loading, error }] = useCreatePersonSuggestionLikeMutation({
 *   variables: {
 *      personSuggestionId: // value for 'personSuggestionId'
 *   },
 * });
 */
export function useCreatePersonSuggestionLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonSuggestionLikeMutation, CreatePersonSuggestionLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonSuggestionLikeMutation, CreatePersonSuggestionLikeMutationVariables>(CreatePersonSuggestionLikeDocument, options);
      }
export type CreatePersonSuggestionLikeMutationHookResult = ReturnType<typeof useCreatePersonSuggestionLikeMutation>;
export type CreatePersonSuggestionLikeMutationResult = Apollo.MutationResult<CreatePersonSuggestionLikeMutation>;
export type CreatePersonSuggestionLikeMutationOptions = Apollo.BaseMutationOptions<CreatePersonSuggestionLikeMutation, CreatePersonSuggestionLikeMutationVariables>;
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
    personSuggestions {
      id
      person {
        id
        name
      }
      user {
        id
      }
      _count {
        personSuggestionLikes
      }
    }
    _count {
      ticketUserLikes
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
export const SearchPersonByWordDocument = gql`
    query searchPersonByWord($word: String!) {
  searchPersonByWord(word: $word) {
    id
    name
  }
}
    `;

/**
 * __useSearchPersonByWordQuery__
 *
 * To run a query within a React component, call `useSearchPersonByWordQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPersonByWordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPersonByWordQuery({
 *   variables: {
 *      word: // value for 'word'
 *   },
 * });
 */
export function useSearchPersonByWordQuery(baseOptions: Apollo.QueryHookOptions<SearchPersonByWordQuery, SearchPersonByWordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPersonByWordQuery, SearchPersonByWordQueryVariables>(SearchPersonByWordDocument, options);
      }
export function useSearchPersonByWordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPersonByWordQuery, SearchPersonByWordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPersonByWordQuery, SearchPersonByWordQueryVariables>(SearchPersonByWordDocument, options);
        }
export type SearchPersonByWordQueryHookResult = ReturnType<typeof useSearchPersonByWordQuery>;
export type SearchPersonByWordLazyQueryHookResult = ReturnType<typeof useSearchPersonByWordLazyQuery>;
export type SearchPersonByWordQueryResult = Apollo.QueryResult<SearchPersonByWordQuery, SearchPersonByWordQueryVariables>;