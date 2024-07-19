'use client';

import ItemCard from "@/components/Card/ItemCard";
import { getItem, getItems } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/dist/client/components/not-found";


// interface MetadataProps {
//   params: {
//     itemSlug: string;
//   }
// }
// export async function generateMetadata({params}){
//const meal = getItem(params.mealSlug);
//if (!meal) {
//  notFound();
//}
// return {
//   title: meal.title,
//   description: meal.summary,
// };
// };

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
      {isPending && <div>Loading...</div>}
      {data && <ItemCard item={data}/>}
    </>
  );
}