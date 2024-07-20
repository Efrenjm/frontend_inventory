'use client';

import ItemCard from "@/components/Card/ItemCard";
import { getItem, getItems } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/dist/client/components/not-found";
import BackgroundCard from "@/components/Card/BackgroundCard";


interface ItemDetailPageProps {
  params: {
    itemSlug: string;
  }
}

export default function ItemDetailPage({params}: ItemDetailPageProps) {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['items', {id: parseInt(params.itemSlug)}],
    queryFn: ({signal, queryKey}) => {
      const {id} = queryKey[1] as {id: number};
      return getItem({signal, id});
    },
    staleTime: 5000,
  });

  if (isError) {
    notFound();
  }

  return (
    <>
      {isPending && <BackgroundCard component="div"><div></div></BackgroundCard>}
      {data && <ItemCard item={data}/>}
    </>
  );
}