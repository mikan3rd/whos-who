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
  requestedTicket?: Maybe<RequestedTicket>;
  statusCode: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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
  requestedTicket?: Maybe<Array<RequestedTicket>>;
  updatedAt: Scalars['DateTime'];
};

export type PersonCount = {
  requestedTicket: Scalars['Int'];
};

export type Query = {
  getCurrentUser: User;
};

export type RequestedTicket = {
  createdAt: Scalars['DateTime'];
  externalImage?: Maybe<ExternalImage>;
  externalImageId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  person?: Maybe<Person>;
  personId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  uploadedImage?: Maybe<UploadedImage>;
  uploadedImageId?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type UploadedImage = {
  bucketName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  filePath: Scalars['String'];
  id: Scalars['ID'];
  requestedTicket?: Maybe<RequestedTicket>;
  updatedAt: Scalars['DateTime'];
};

export type User = {
  _count: UserCount;
  createdAt: Scalars['DateTime'];
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  requestedTickets?: Maybe<Array<RequestedTicket>>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type UserCount = {
  requestedTickets: Scalars['Int'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  None = 'NONE'
}

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { getCurrentUser: { id: string, displayName?: string | null | undefined, role: UserRole } };


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