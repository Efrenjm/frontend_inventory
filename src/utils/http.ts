'use client';
import { QueryClient } from '@tanstack/react-query';

import { Item } from './types';

export const queryClient = new QueryClient();

export async function getItems({signal}: {signal: AbortSignal}): Promise<Item[]> {
  let url = 'http://localhost:8080/items';

  setTimeout(() => {}, 5000);
  const response = await fetch(url, {signal});
  if (!response.ok) {
    throw new Error("An error occured", {cause: response.status});
  }
  return await response.json();
}

interface getItemProps {
  signal: AbortSignal;
  id: number;
}

export async function getItem({signal, id}: getItemProps): Promise<Item> {
  const url = `http://localhost:8080/items/${id}`;

  const response = await fetch(url, {signal});
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}

export async function deleteItem({id}: { id: number }) {
  const url = `http://localhost:8080/items/${id}`;

  const response = await fetch(url, {method: 'DELETE'});

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function createItem({newItem}: { newItem: Item }) {
  const url = `http://localhost:8080/items`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}