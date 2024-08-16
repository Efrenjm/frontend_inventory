/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetAllItems {\n        getAllItems {\n            id\n            name\n            description\n        }\n    }\n": types.GetAllItemsDocument,
    "\n  query GetItemById($id: ID!) {\n    getItemById(id: $id) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n": types.GetItemByIdDocument,
    "\n  mutation CreateItem($item: ItemInput!) {\n    createItem(item: $item) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n": types.CreateItemDocument,
    "\n  mutation UpdateItem($item: ItemInput!) {\n    updateItem(item: $item) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n": types.UpdateItemDocument,
    "\n  mutation DeleteItem($id: ID!) {\n    deleteItem(id: $id) {\n      id\n    }\n  }\n": types.DeleteItemDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetAllItems {\n        getAllItems {\n            id\n            name\n            description\n        }\n    }\n"): (typeof documents)["\n    query GetAllItems {\n        getAllItems {\n            id\n            name\n            description\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetItemById($id: ID!) {\n    getItemById(id: $id) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetItemById($id: ID!) {\n    getItemById(id: $id) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateItem($item: ItemInput!) {\n    createItem(item: $item) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateItem($item: ItemInput!) {\n    createItem(item: $item) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateItem($item: ItemInput!) {\n    updateItem(item: $item) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateItem($item: ItemInput!) {\n    updateItem(item: $item) {\n      id\n      name\n      description\n      location {\n          id\n          address\n          phoneNumber\n          state\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteItem($id: ID!) {\n    deleteItem(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteItem($id: ID!) {\n    deleteItem(id: $id) {\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;