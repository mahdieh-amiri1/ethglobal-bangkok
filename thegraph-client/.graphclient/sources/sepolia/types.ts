// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace SepoliaTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  sepolia_storageData?: Maybe<StorageData>;
  sepolia_storageDatas: Array<StorageData>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<_Meta_>;
};


export type Querysepolia_storageDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia_storageDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StorageData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StorageData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Querysepolia__metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type StorageData = {
  id: Scalars['ID']['output'];
  userWallet: Scalars['Bytes']['output'];
  balance: Scalars['BigInt']['output'];
  number: Scalars['BigInt']['output'];
  transactionHash: Scalars['String']['output'];
  blockNumber: Scalars['BigInt']['output'];
  storedAt: Scalars['BigInt']['output'];
  chainName: Scalars['String']['output'];
};

export type StorageData_filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  userWallet?: InputMaybe<Scalars['Bytes']['input']>;
  userWallet_not?: InputMaybe<Scalars['Bytes']['input']>;
  userWallet_gt?: InputMaybe<Scalars['Bytes']['input']>;
  userWallet_lt?: InputMaybe<Scalars['Bytes']['input']>;
  userWallet_gte?: InputMaybe<Scalars['Bytes']['input']>;
  userWallet_lte?: InputMaybe<Scalars['Bytes']['input']>;
  userWallet_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  userWallet_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  userWallet_contains?: InputMaybe<Scalars['Bytes']['input']>;
  userWallet_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  number?: InputMaybe<Scalars['BigInt']['input']>;
  number_not?: InputMaybe<Scalars['BigInt']['input']>;
  number_gt?: InputMaybe<Scalars['BigInt']['input']>;
  number_lt?: InputMaybe<Scalars['BigInt']['input']>;
  number_gte?: InputMaybe<Scalars['BigInt']['input']>;
  number_lte?: InputMaybe<Scalars['BigInt']['input']>;
  number_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  number_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  storedAt?: InputMaybe<Scalars['BigInt']['input']>;
  storedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  storedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  storedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  storedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  storedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  storedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  storedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainName?: InputMaybe<Scalars['String']['input']>;
  chainName_not?: InputMaybe<Scalars['String']['input']>;
  chainName_gt?: InputMaybe<Scalars['String']['input']>;
  chainName_lt?: InputMaybe<Scalars['String']['input']>;
  chainName_gte?: InputMaybe<Scalars['String']['input']>;
  chainName_lte?: InputMaybe<Scalars['String']['input']>;
  chainName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chainName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  chainName_contains?: InputMaybe<Scalars['String']['input']>;
  chainName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  chainName_not_contains?: InputMaybe<Scalars['String']['input']>;
  chainName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  chainName_starts_with?: InputMaybe<Scalars['String']['input']>;
  chainName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chainName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  chainName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chainName_ends_with?: InputMaybe<Scalars['String']['input']>;
  chainName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  chainName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  chainName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StorageData_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StorageData_filter>>>;
};

export type StorageData_orderBy =
  | 'id'
  | 'userWallet'
  | 'balance'
  | 'number'
  | 'transactionHash'
  | 'blockNumber'
  | 'storedAt'
  | 'chainName';

export type Subscription = {
  sepolia_storageData?: Maybe<StorageData>;
  sepolia_storageDatas: Array<StorageData>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<_Meta_>;
};


export type Subscriptionsepolia_storageDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia_storageDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StorageData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StorageData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionsepolia__metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  sepolia_storageData: InContextSdkMethod<Query['sepolia_storageData'], Querysepolia_storageDataArgs, MeshContext>,
  /** null **/
  sepolia_storageDatas: InContextSdkMethod<Query['sepolia_storageDatas'], Querysepolia_storageDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  sepolia__meta: InContextSdkMethod<Query['sepolia__meta'], Querysepolia__metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  sepolia_storageData: InContextSdkMethod<Subscription['sepolia_storageData'], Subscriptionsepolia_storageDataArgs, MeshContext>,
  /** null **/
  sepolia_storageDatas: InContextSdkMethod<Subscription['sepolia_storageDatas'], Subscriptionsepolia_storageDatasArgs, MeshContext>,
  /** Access to subgraph metadata **/
  sepolia__meta: InContextSdkMethod<Subscription['sepolia__meta'], Subscriptionsepolia__metaArgs, MeshContext>
  };

  export type Context = {
      ["sepolia"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
