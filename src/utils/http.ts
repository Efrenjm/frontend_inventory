'use client';
import { QueryClient } from '@tanstack/react-query';

import { Item } from './types';

export const queryClient = new QueryClient();

interface getItemsProps {
  signal: AbortSignal;
  state?: string;
}

export async function getItems({signal, state}: getItemsProps): Promise<Item[]> {
  let url = 'http://localhost:8080/items';

  if (state) {
    url += `?state=${state}`;
  }

  const response = await fetch(url, {signal});
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}

interface getItemProps {
  signal: AbortSignal;
  id: number;
}
export async function getItem({signal, id}:getItemProps): Promise<Item> {
  let url = `http://localhost:8080/items/${id}`;


  const response = await fetch(url, {signal});
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}



