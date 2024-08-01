'use client';
import { ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";


const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

export default function ApolloConfig({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
