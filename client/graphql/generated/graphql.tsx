import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Bus = {
  __typename?: 'Bus';
  busToStation?: Maybe<Array<BusToStation>>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  route: Scalars['String'];
  type: BusType;
  updatedDate: Scalars['DateTime'];
};

export type BusInput = {
  name: Scalars['String'];
  route: Scalars['String'];
  type: Scalars['String'];
};

export type BusToStation = {
  __typename?: 'BusToStation';
  bus?: Maybe<Bus>;
  busId: Scalars['Float'];
  busToStationId: Scalars['Float'];
  station?: Maybe<Station>;
  stationId: Scalars['Float'];
  time: Scalars['String'];
};

export type BusToStationInput = {
  busId: Scalars['Float'];
  stationId: Scalars['Float'];
  /** Time in 24H format eg: (10:45) */
  time: Scalars['String'];
};

/** Types of buses either state owned or private */
export enum BusType {
  Ksrtc = 'KSRTC',
  Private = 'PRIVATE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBus?: Maybe<Bus>;
  addBusToStation?: Maybe<BusToStation>;
  addStation?: Maybe<Station>;
};


export type MutationAddBusArgs = {
  busData: BusInput;
};


export type MutationAddBusToStationArgs = {
  bustostation: BusToStationInput;
};


export type MutationAddStationArgs = {
  stationData: StationInput;
};

export type Query = {
  __typename?: 'Query';
  getAllStation: Array<Station>;
  getStation?: Maybe<Station>;
};


export type QueryGetStationArgs = {
  id: Scalars['Float'];
};

export type Station = {
  __typename?: 'Station';
  address: Scalars['String'];
  busToStation?: Maybe<Array<BusToStation>>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Float'];
  location: Scalars['String'];
  name: Scalars['String'];
  updatedDate: Scalars['DateTime'];
};

export type StationInput = {
  address: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
};

export type GetAllStationNameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStationNameQuery = { __typename?: 'Query', getAllStation: Array<{ __typename?: 'Station', id: number, name: string, location: string }> };

export type GetStationTimingsQueryVariables = Exact<{
  getStationId: Scalars['Float'];
}>;


export type GetStationTimingsQuery = { __typename?: 'Query', getStation?: { __typename?: 'Station', id: number, name: string, location: string, address: string, busToStation?: Array<{ __typename?: 'BusToStation', busToStationId: number, time: string, bus?: { __typename?: 'Bus', name: string, type: BusType, route: string, updatedDate: any, createdDate: any } | null | undefined }> | null | undefined } | null | undefined };


export const GetAllStationNameDocument = gql`
    query getAllStationName {
  getAllStation {
    id
    name
    location
  }
}
    `;

/**
 * __useGetAllStationNameQuery__
 *
 * To run a query within a React component, call `useGetAllStationNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStationNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStationNameQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllStationNameQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStationNameQuery, GetAllStationNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStationNameQuery, GetAllStationNameQueryVariables>(GetAllStationNameDocument, options);
      }
export function useGetAllStationNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStationNameQuery, GetAllStationNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStationNameQuery, GetAllStationNameQueryVariables>(GetAllStationNameDocument, options);
        }
export type GetAllStationNameQueryHookResult = ReturnType<typeof useGetAllStationNameQuery>;
export type GetAllStationNameLazyQueryHookResult = ReturnType<typeof useGetAllStationNameLazyQuery>;
export type GetAllStationNameQueryResult = Apollo.QueryResult<GetAllStationNameQuery, GetAllStationNameQueryVariables>;
export const GetStationTimingsDocument = gql`
    query getStationTimings($getStationId: Float!) {
  getStation(id: $getStationId) {
    id
    name
    location
    address
    busToStation {
      busToStationId
      time
      bus {
        name
        type
        route
        updatedDate
        createdDate
      }
    }
  }
}
    `;

/**
 * __useGetStationTimingsQuery__
 *
 * To run a query within a React component, call `useGetStationTimingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStationTimingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStationTimingsQuery({
 *   variables: {
 *      getStationId: // value for 'getStationId'
 *   },
 * });
 */
export function useGetStationTimingsQuery(baseOptions: Apollo.QueryHookOptions<GetStationTimingsQuery, GetStationTimingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStationTimingsQuery, GetStationTimingsQueryVariables>(GetStationTimingsDocument, options);
      }
export function useGetStationTimingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStationTimingsQuery, GetStationTimingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStationTimingsQuery, GetStationTimingsQueryVariables>(GetStationTimingsDocument, options);
        }
export type GetStationTimingsQueryHookResult = ReturnType<typeof useGetStationTimingsQuery>;
export type GetStationTimingsLazyQueryHookResult = ReturnType<typeof useGetStationTimingsLazyQuery>;
export type GetStationTimingsQueryResult = Apollo.QueryResult<GetStationTimingsQuery, GetStationTimingsQueryVariables>;