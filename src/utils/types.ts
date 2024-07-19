export interface Location {
  id?: number; /* TODO: CHANGE TO MANDATORY WHEN RETRIEVING DATA */
  state?: string;
  address?: string;
  phoneNumber?: string;
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  location?: Location;
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

export interface FormInvalidValues {
  id: boolean;
  name: boolean;
  locationId: boolean;
  locationState: boolean;
  locationPhoneNumber: boolean;
}