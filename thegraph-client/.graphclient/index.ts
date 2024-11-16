// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { findAndParseConfig } from '@graphql-mesh/cli';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { ArbitrumOneTypes } from './sources/arbitrum-one/types';
import type { SepoliaTypes } from './sources/sepolia/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type Query = {
  sepolia_storageData?: Maybe<StorageData>;
  sepolia_storageDatas: Array<StorageData>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<_Meta_>;
  arbitrum_storageData?: Maybe<StorageData>;
  arbitrum_storageDatas: Array<StorageData>;
  /** Access to subgraph metadata */
  arbitrum__meta?: Maybe<_Meta_>;
  cross_storageDatas: Array<StorageData>;
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


export type Queryarbitrum_storageDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrum_storageDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StorageData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StorageData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryarbitrum__metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  sepolia_storageData?: Maybe<StorageData>;
  sepolia_storageDatas: Array<StorageData>;
  /** Access to subgraph metadata */
  sepolia__meta?: Maybe<_Meta_>;
  arbitrum_storageData?: Maybe<StorageData>;
  arbitrum_storageDatas: Array<StorageData>;
  /** Access to subgraph metadata */
  arbitrum__meta?: Maybe<_Meta_>;
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


export type Subscriptionarbitrum_storageDataArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrum_storageDatasArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StorageData_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StorageData_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscriptionarbitrum__metaArgs = {
  block?: InputMaybe<Block_height>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  OrderDirection: OrderDirection;
  StorageData: ResolverTypeWrapper<StorageData>;
  StorageData_filter: StorageData_filter;
  StorageData_orderBy: StorageData_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  StorageData: StorageData;
  StorageData_filter: StorageData_filter;
  String: Scalars['String']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  sepolia_storageData?: Resolver<Maybe<ResolversTypes['StorageData']>, ParentType, ContextType, RequireFields<Querysepolia_storageDataArgs, 'id' | 'subgraphError'>>;
  sepolia_storageDatas?: Resolver<Array<ResolversTypes['StorageData']>, ParentType, ContextType, RequireFields<Querysepolia_storageDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  sepolia__meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Querysepolia__metaArgs>>;
  arbitrum_storageData?: Resolver<Maybe<ResolversTypes['StorageData']>, ParentType, ContextType, RequireFields<Queryarbitrum_storageDataArgs, 'id' | 'subgraphError'>>;
  arbitrum_storageDatas?: Resolver<Array<ResolversTypes['StorageData']>, ParentType, ContextType, RequireFields<Queryarbitrum_storageDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  arbitrum__meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Queryarbitrum__metaArgs>>;
  cross_storageDatas?: Resolver<Array<ResolversTypes['StorageData']>, ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  sepolia_storageData?: SubscriptionResolver<Maybe<ResolversTypes['StorageData']>, "sepolia_storageData", ParentType, ContextType, RequireFields<Subscriptionsepolia_storageDataArgs, 'id' | 'subgraphError'>>;
  sepolia_storageDatas?: SubscriptionResolver<Array<ResolversTypes['StorageData']>, "sepolia_storageDatas", ParentType, ContextType, RequireFields<Subscriptionsepolia_storageDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  sepolia__meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "sepolia__meta", ParentType, ContextType, Partial<Subscriptionsepolia__metaArgs>>;
  arbitrum_storageData?: SubscriptionResolver<Maybe<ResolversTypes['StorageData']>, "arbitrum_storageData", ParentType, ContextType, RequireFields<Subscriptionarbitrum_storageDataArgs, 'id' | 'subgraphError'>>;
  arbitrum_storageDatas?: SubscriptionResolver<Array<ResolversTypes['StorageData']>, "arbitrum_storageDatas", ParentType, ContextType, RequireFields<Subscriptionarbitrum_storageDatasArgs, 'skip' | 'first' | 'subgraphError'>>;
  arbitrum__meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "arbitrum__meta", ParentType, ContextType, Partial<Subscriptionarbitrum__metaArgs>>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type StorageDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StorageData'] = ResolversParentTypes['StorageData']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userWallet?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  storedAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  chainName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  StorageData?: StorageDataResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = SepoliaTypes.Context & ArbitrumOneTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export function getMeshOptions() {
  console.warn('WARNING: These artifacts are built for development mode. Please run "graphclient build" to build production artifacts');
  return findAndParseConfig({
    dir: baseDir,
    artifactsDir: ".graphclient",
    configName: "graphclient",
    additionalPackagePrefixes: ["@graphprotocol/client-"],
    initialLoggerPrefix: "GraphClient",
  });
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}

let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));