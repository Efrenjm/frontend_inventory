export interface Location {
  id?: number; /* TODO: CHANGE TO MANDATORY WHEN RETRIEVING DATA */
  state: string;
  address?: string;
  phoneNumber?: number;
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  location?: Location;
}