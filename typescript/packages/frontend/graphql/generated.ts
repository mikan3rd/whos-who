import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type ExternalImage = {
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  statusCode: Scalars['Int'];
  ticket?: Maybe<Ticket>;
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
};

export type GoogleAuthCredential = {
  createdAt: Scalars['Date'];
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  photoUrl?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type GoogleAuthCredentialInput = {
  accessToken: Scalars['String'];
  displayName?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  photoUrl?: InputMaybe<Scalars['String']>;
  refreshToken: Scalars['String'];
  uid: Scalars['String'];
};

export type Mutation = {
  createOrDeleteTicketUserLike: TicketUserLike;
  createPersonSuggestion: PersonSuggestion;
  createPersonSuggestionLike: PersonSuggestionLike;
  createTicketByExternalImageUrl: Ticket;
  createTicketByUploadImageFile: Ticket;
  upsertGoogleAuthCredential: GoogleAuthCredential;
  upsertTwitterAuthCredential: TwitterAuthCredential;
};


export type MutationCreateOrDeleteTicketUserLikeArgs = {
  ticketId: Scalars['String'];
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


export type MutationCreateTicketByUploadImageFileArgs = {
  file: Scalars['Upload'];
};


export type MutationUpsertGoogleAuthCredentialArgs = {
  googleAuthCredentialInput: GoogleAuthCredentialInput;
};


export type MutationUpsertTwitterAuthCredentialArgs = {
  twitterAuthCredentialInput: TwitterAuthCredentialInput;
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
  getPersonById?: Maybe<Person>;
  getTicketByExternalImageUrl?: Maybe<Ticket>;
  getTicketById?: Maybe<Ticket>;
  getTicketList: TicketListOutput;
  getTopPageData: TopPageDataOutput;
  searchPersonByWord: Array<Person>;
};


export type QueryGetPersonByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetTicketByExternalImageUrlArgs = {
  externalImageUrl: Scalars['String'];
};


export type QueryGetTicketByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetTicketListArgs = {
  ticketListInput: TicketListInput;
};


export type QuerySearchPersonByWordArgs = {
  word: Scalars['String'];
};

export enum SortKey {
  CreatedAt = 'createdAt',
  TicketUserLikes = 'ticketUserLikes'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

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

export type TicketListInput = {
  filterByAnswered?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  sortKey?: InputMaybe<SortKey>;
  sortOrder?: InputMaybe<SortOrder>;
  take: Scalars['Int'];
};

export type TicketListOutput = {
  tickets: Array<Ticket>;
  totalCount: Scalars['Int'];
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

export type TopPageDataOutput = {
  ticketsOrderByCreatedAt: Array<Ticket>;
  ticketsOrderByLike: Array<Ticket>;
};

export type TwitterAuthCredential = {
  createdAt: Scalars['Date'];
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  photoUrl?: Maybe<Scalars['String']>;
  screenName?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type TwitterAuthCredentialInput = {
  accessToken: Scalars['String'];
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  oauthAccessToken: Scalars['String'];
  oauthTokenSecret: Scalars['String'];
  photoUrl?: InputMaybe<Scalars['String']>;
  refreshToken: Scalars['String'];
  screenName?: InputMaybe<Scalars['String']>;
  uid: Scalars['String'];
};

export type UploadedImage = {
  bucketName: Scalars['String'];
  createdAt: Scalars['Date'];
  fileName: Scalars['String'];
  id: Scalars['ID'];
  ticket?: Maybe<Ticket>;
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
};

export type User = {
  _count: UserCount;
  authUid: Scalars['String'];
  createdAt: Scalars['Date'];
  displayName?: Maybe<Scalars['String']>;
  googleAuthCredential?: Maybe<GoogleAuthCredential>;
  id: Scalars['ID'];
  personSuggestionLikes?: Maybe<Array<PersonSuggestionLike>>;
  personSuggestions?: Maybe<Array<PersonSuggestion>>;
  photoUrl?: Maybe<Scalars['String']>;
  point: Scalars['Int'];
  role: UserRole;
  status: UserStatus;
  ticketUserLikes?: Maybe<Array<TicketUserLike>>;
  tickets?: Maybe<Array<Ticket>>;
  twitterAuthCredential?: Maybe<TwitterAuthCredential>;
  updatedAt: Scalars['Date'];
};

export type UserCount = {
  personSuggestionLikes: Scalars['Int'];
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

export type CreateOrDeleteTicketUserLikeMutationVariables = Exact<{
  ticketId: Scalars['String'];
}>;


export type CreateOrDeleteTicketUserLikeMutation = { createOrDeleteTicketUserLike: { id: string } };

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

export type CreateTicketByUploadImageFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type CreateTicketByUploadImageFileMutation = { createTicketByUploadImageFile: { id: string } };

export type UpsertGoogleAuthCredentialMutationVariables = Exact<{
  googleAuthCredentialInput: GoogleAuthCredentialInput;
}>;


export type UpsertGoogleAuthCredentialMutation = { upsertGoogleAuthCredential: { id: string } };

export type UpsertTwitterAuthCredentialMutationVariables = Exact<{
  twitterAuthCredentialInput: TwitterAuthCredentialInput;
}>;


export type UpsertTwitterAuthCredentialMutation = { upsertTwitterAuthCredential: { id: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { getCurrentUser: { id: string, displayName?: string | null, role: UserRole, photoUrl?: string | null, googleAuthCredential?: { id: string } | null, twitterAuthCredential?: { id: string } | null } };

export type GetPersonByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPersonByIdQuery = { getPersonById?: { id: string, name: string, nameHiragana?: string | null, nameKatakana?: string | null, nameAlphabet?: string | null, birthDate?: string | null, tickets?: Array<{ id: string, createdAt: string, externalImage?: { id: string, url: string, statusCode: number } | null, uploadedImage?: { id: string, url: string } | null, _count: { ticketUserLikes: number } }> | null } | null };

export type GetTicketByExternalImageUrlQueryVariables = Exact<{
  externalImageUrl: Scalars['String'];
}>;


export type GetTicketByExternalImageUrlQuery = { getTicketByExternalImageUrl?: { id: string } | null };

export type GetTicketByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTicketByIdQuery = { getTicketById?: { id: string, personId?: string | null, createdAt: string, updatedAt: string, externalImage?: { id: string, url: string, statusCode: number } | null, uploadedImage?: { id: string, url: string } | null, user: { id: string, displayName?: string | null, role: UserRole }, person?: { id: string, name: string } | null, ticketUserLikes?: Array<{ userId: string }> | null, personSuggestions?: Array<{ id: string, person: { id: string, name: string }, user: { id: string }, _count: { personSuggestionLikes: number } }> | null, _count: { ticketUserLikes: number } } | null };

export type GetTicketListQueryVariables = Exact<{
  ticketListInput: TicketListInput;
}>;


export type GetTicketListQuery = { getTicketList: { totalCount: number, tickets: Array<{ id: string, personId?: string | null, createdAt: string, updatedAt: string, externalImage?: { id: string, url: string, statusCode: number } | null, uploadedImage?: { id: string, url: string } | null, _count: { ticketUserLikes: number } }> } };

export type GetTopPageDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopPageDataQuery = { getTopPageData: { ticketsOrderByCreatedAt: Array<{ id: string, personId?: string | null, createdAt: string, updatedAt: string, externalImage?: { id: string, url: string, statusCode: number } | null, uploadedImage?: { id: string, url: string } | null, _count: { ticketUserLikes: number } }>, ticketsOrderByLike: Array<{ id: string, personId?: string | null, createdAt: string, updatedAt: string, externalImage?: { id: string, url: string, statusCode: number } | null, uploadedImage?: { id: string, url: string } | null, _count: { ticketUserLikes: number } }> } };

export type SearchPersonByWordQueryVariables = Exact<{
  word: Scalars['String'];
}>;


export type SearchPersonByWordQuery = { searchPersonByWord: Array<{ id: string, name: string }> };


export const CreateOrDeleteTicketUserLikeDocument = gql`
    mutation createOrDeleteTicketUserLike($ticketId: String!) {
  createOrDeleteTicketUserLike(ticketId: $ticketId) {
    id
  }
}
    `;
export type CreateOrDeleteTicketUserLikeMutationFn = Apollo.MutationFunction<CreateOrDeleteTicketUserLikeMutation, CreateOrDeleteTicketUserLikeMutationVariables>;

/**
 * __useCreateOrDeleteTicketUserLikeMutation__
 *
 * To run a mutation, you first call `useCreateOrDeleteTicketUserLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrDeleteTicketUserLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrDeleteTicketUserLikeMutation, { data, loading, error }] = useCreateOrDeleteTicketUserLikeMutation({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useCreateOrDeleteTicketUserLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrDeleteTicketUserLikeMutation, CreateOrDeleteTicketUserLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrDeleteTicketUserLikeMutation, CreateOrDeleteTicketUserLikeMutationVariables>(CreateOrDeleteTicketUserLikeDocument, options);
      }
export type CreateOrDeleteTicketUserLikeMutationHookResult = ReturnType<typeof useCreateOrDeleteTicketUserLikeMutation>;
export type CreateOrDeleteTicketUserLikeMutationResult = Apollo.MutationResult<CreateOrDeleteTicketUserLikeMutation>;
export type CreateOrDeleteTicketUserLikeMutationOptions = Apollo.BaseMutationOptions<CreateOrDeleteTicketUserLikeMutation, CreateOrDeleteTicketUserLikeMutationVariables>;
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
export const CreateTicketByUploadImageFileDocument = gql`
    mutation createTicketByUploadImageFile($file: Upload!) {
  createTicketByUploadImageFile(file: $file) {
    id
  }
}
    `;
export type CreateTicketByUploadImageFileMutationFn = Apollo.MutationFunction<CreateTicketByUploadImageFileMutation, CreateTicketByUploadImageFileMutationVariables>;

/**
 * __useCreateTicketByUploadImageFileMutation__
 *
 * To run a mutation, you first call `useCreateTicketByUploadImageFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketByUploadImageFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketByUploadImageFileMutation, { data, loading, error }] = useCreateTicketByUploadImageFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCreateTicketByUploadImageFileMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketByUploadImageFileMutation, CreateTicketByUploadImageFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketByUploadImageFileMutation, CreateTicketByUploadImageFileMutationVariables>(CreateTicketByUploadImageFileDocument, options);
      }
export type CreateTicketByUploadImageFileMutationHookResult = ReturnType<typeof useCreateTicketByUploadImageFileMutation>;
export type CreateTicketByUploadImageFileMutationResult = Apollo.MutationResult<CreateTicketByUploadImageFileMutation>;
export type CreateTicketByUploadImageFileMutationOptions = Apollo.BaseMutationOptions<CreateTicketByUploadImageFileMutation, CreateTicketByUploadImageFileMutationVariables>;
export const UpsertGoogleAuthCredentialDocument = gql`
    mutation upsertGoogleAuthCredential($googleAuthCredentialInput: GoogleAuthCredentialInput!) {
  upsertGoogleAuthCredential(
    googleAuthCredentialInput: $googleAuthCredentialInput
  ) {
    id
  }
}
    `;
export type UpsertGoogleAuthCredentialMutationFn = Apollo.MutationFunction<UpsertGoogleAuthCredentialMutation, UpsertGoogleAuthCredentialMutationVariables>;

/**
 * __useUpsertGoogleAuthCredentialMutation__
 *
 * To run a mutation, you first call `useUpsertGoogleAuthCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertGoogleAuthCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertGoogleAuthCredentialMutation, { data, loading, error }] = useUpsertGoogleAuthCredentialMutation({
 *   variables: {
 *      googleAuthCredentialInput: // value for 'googleAuthCredentialInput'
 *   },
 * });
 */
export function useUpsertGoogleAuthCredentialMutation(baseOptions?: Apollo.MutationHookOptions<UpsertGoogleAuthCredentialMutation, UpsertGoogleAuthCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertGoogleAuthCredentialMutation, UpsertGoogleAuthCredentialMutationVariables>(UpsertGoogleAuthCredentialDocument, options);
      }
export type UpsertGoogleAuthCredentialMutationHookResult = ReturnType<typeof useUpsertGoogleAuthCredentialMutation>;
export type UpsertGoogleAuthCredentialMutationResult = Apollo.MutationResult<UpsertGoogleAuthCredentialMutation>;
export type UpsertGoogleAuthCredentialMutationOptions = Apollo.BaseMutationOptions<UpsertGoogleAuthCredentialMutation, UpsertGoogleAuthCredentialMutationVariables>;
export const UpsertTwitterAuthCredentialDocument = gql`
    mutation upsertTwitterAuthCredential($twitterAuthCredentialInput: TwitterAuthCredentialInput!) {
  upsertTwitterAuthCredential(
    twitterAuthCredentialInput: $twitterAuthCredentialInput
  ) {
    id
  }
}
    `;
export type UpsertTwitterAuthCredentialMutationFn = Apollo.MutationFunction<UpsertTwitterAuthCredentialMutation, UpsertTwitterAuthCredentialMutationVariables>;

/**
 * __useUpsertTwitterAuthCredentialMutation__
 *
 * To run a mutation, you first call `useUpsertTwitterAuthCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertTwitterAuthCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertTwitterAuthCredentialMutation, { data, loading, error }] = useUpsertTwitterAuthCredentialMutation({
 *   variables: {
 *      twitterAuthCredentialInput: // value for 'twitterAuthCredentialInput'
 *   },
 * });
 */
export function useUpsertTwitterAuthCredentialMutation(baseOptions?: Apollo.MutationHookOptions<UpsertTwitterAuthCredentialMutation, UpsertTwitterAuthCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertTwitterAuthCredentialMutation, UpsertTwitterAuthCredentialMutationVariables>(UpsertTwitterAuthCredentialDocument, options);
      }
export type UpsertTwitterAuthCredentialMutationHookResult = ReturnType<typeof useUpsertTwitterAuthCredentialMutation>;
export type UpsertTwitterAuthCredentialMutationResult = Apollo.MutationResult<UpsertTwitterAuthCredentialMutation>;
export type UpsertTwitterAuthCredentialMutationOptions = Apollo.BaseMutationOptions<UpsertTwitterAuthCredentialMutation, UpsertTwitterAuthCredentialMutationVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    id
    displayName
    role
    photoUrl
    googleAuthCredential {
      id
    }
    twitterAuthCredential {
      id
    }
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
export const GetPersonByIdDocument = gql`
    query getPersonById($id: String!) {
  getPersonById(id: $id) {
    id
    name
    nameHiragana
    nameKatakana
    nameAlphabet
    birthDate
    tickets {
      id
      createdAt
      externalImage {
        id
        url
        statusCode
      }
      uploadedImage {
        id
        url
      }
      _count {
        ticketUserLikes
      }
    }
  }
}
    `;

/**
 * __useGetPersonByIdQuery__
 *
 * To run a query within a React component, call `useGetPersonByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPersonByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPersonByIdQuery, GetPersonByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonByIdQuery, GetPersonByIdQueryVariables>(GetPersonByIdDocument, options);
      }
export function useGetPersonByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonByIdQuery, GetPersonByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonByIdQuery, GetPersonByIdQueryVariables>(GetPersonByIdDocument, options);
        }
export type GetPersonByIdQueryHookResult = ReturnType<typeof useGetPersonByIdQuery>;
export type GetPersonByIdLazyQueryHookResult = ReturnType<typeof useGetPersonByIdLazyQuery>;
export type GetPersonByIdQueryResult = Apollo.QueryResult<GetPersonByIdQuery, GetPersonByIdQueryVariables>;
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
    personId
    createdAt
    updatedAt
    externalImage {
      id
      url
      statusCode
    }
    uploadedImage {
      id
      url
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
    ticketUserLikes {
      userId
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
export const GetTicketListDocument = gql`
    query getTicketList($ticketListInput: TicketListInput!) {
  getTicketList(ticketListInput: $ticketListInput) {
    tickets {
      id
      personId
      createdAt
      updatedAt
      externalImage {
        id
        url
        statusCode
      }
      uploadedImage {
        id
        url
      }
      _count {
        ticketUserLikes
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetTicketListQuery__
 *
 * To run a query within a React component, call `useGetTicketListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketListQuery({
 *   variables: {
 *      ticketListInput: // value for 'ticketListInput'
 *   },
 * });
 */
export function useGetTicketListQuery(baseOptions: Apollo.QueryHookOptions<GetTicketListQuery, GetTicketListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketListQuery, GetTicketListQueryVariables>(GetTicketListDocument, options);
      }
export function useGetTicketListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketListQuery, GetTicketListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketListQuery, GetTicketListQueryVariables>(GetTicketListDocument, options);
        }
export type GetTicketListQueryHookResult = ReturnType<typeof useGetTicketListQuery>;
export type GetTicketListLazyQueryHookResult = ReturnType<typeof useGetTicketListLazyQuery>;
export type GetTicketListQueryResult = Apollo.QueryResult<GetTicketListQuery, GetTicketListQueryVariables>;
export const GetTopPageDataDocument = gql`
    query getTopPageData {
  getTopPageData {
    ticketsOrderByCreatedAt {
      id
      personId
      createdAt
      updatedAt
      externalImage {
        id
        url
        statusCode
      }
      uploadedImage {
        id
        url
      }
      _count {
        ticketUserLikes
      }
    }
    ticketsOrderByLike {
      id
      personId
      createdAt
      updatedAt
      externalImage {
        id
        url
        statusCode
      }
      uploadedImage {
        id
        url
      }
      _count {
        ticketUserLikes
      }
    }
  }
}
    `;

/**
 * __useGetTopPageDataQuery__
 *
 * To run a query within a React component, call `useGetTopPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPageDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopPageDataQuery(baseOptions?: Apollo.QueryHookOptions<GetTopPageDataQuery, GetTopPageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopPageDataQuery, GetTopPageDataQueryVariables>(GetTopPageDataDocument, options);
      }
export function useGetTopPageDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopPageDataQuery, GetTopPageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopPageDataQuery, GetTopPageDataQueryVariables>(GetTopPageDataDocument, options);
        }
export type GetTopPageDataQueryHookResult = ReturnType<typeof useGetTopPageDataQuery>;
export type GetTopPageDataLazyQueryHookResult = ReturnType<typeof useGetTopPageDataLazyQuery>;
export type GetTopPageDataQueryResult = Apollo.QueryResult<GetTopPageDataQuery, GetTopPageDataQueryVariables>;
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