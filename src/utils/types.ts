import { ApolloCache, DefaultContext, FetchResult, MutationFunctionOptions } from "@apollo/client";
import {
  CreateItemMutation,
  Exact,
  ItemInput,
  UpdateItemMutation,
  UpdateItemMutationVariables,
} from "@/__generated__/graphql";

export interface Location {
  id: number;
  state: string;
  address?: string;
  phoneNumber?: string;
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  location?: Location;
}

export interface gqlItemOutput {
  __typename?: "Item";
  id?: string | null;
  name?: string | null;
  description?: string | null;
  location?: {
    __typename?: "Location";
    id?: string | null;
    address?: string | null;
    phoneNumber?: string | null;
    state?: string | null;
  } | null;
}

export interface FormValues {
  id: string;
  name: string;
  description: string;
  location: {
    id: string;
    state: string;
    address: string;
    phoneNumber: string;
  };
}
export interface FilterFields {
  id?: number;
  name?: string;
  state: string[];
}
type invalidNode = { error: boolean; message: string };

export interface FormInvalidValues {
  id: invalidNode;
  name: invalidNode;
  locationId: invalidNode;
  locationState: invalidNode;
  locationPhoneNumber: invalidNode;
}

export type CreateItemMutationFunction = (
  options?:
    | MutationFunctionOptions<
        CreateItemMutation,
        Exact<{ item: ItemInput }>,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
) => Promise<FetchResult<CreateItemMutation>>;
export type UpdateItemMutationFunction = (
  options?: MutationFunctionOptions<
    UpdateItemMutation,
    UpdateItemMutationVariables,
    DefaultContext,
    ApolloCache<any>
  >
) => Promise<FetchResult<UpdateItemMutation>>;
