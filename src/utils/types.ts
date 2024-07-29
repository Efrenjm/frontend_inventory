export interface Location {
  id: number; /* TODO: CHANGE TO MANDATORY WHEN RETRIEVING DATA */
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
  __typename?: 'Item',
  id?: string | null,
  name?: string | null,
  description?: string | null,
  location?: {
    __typename?: 'Location',
    id?: string | null,
    address?: string | null,
    phoneNumber?: string | null,
    state?: string | null
  } | null
}

export interface FormValues {
  id: string;
  name: string;
  description: string;
  location: {
    id: string;
    state: string;
    address: string;
    phoneNumber: string
  };
}

type invalidNode = { error: boolean, message: string };

export interface FormInvalidValues {
  id: invalidNode;
  name: invalidNode;
  locationId: invalidNode;
  locationState: invalidNode;
  locationPhoneNumber: invalidNode;
}