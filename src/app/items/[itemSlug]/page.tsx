'use client';
import { Paper } from "@mui/material";

import ItemCard from "@/components/Card/ItemCard";
import { getItem, getItems } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/react-dev-overlay/pages/ErrorBoundary";
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
  // const item = getItem(params.itemSlug);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['items', {id: params.itemSlug}],
    queryFn: ({signal, queryKey}) => {
      const params = queryKey[1] as Object;
      return getItem({signal, ...params});
    },
    staleTime: 5000,
  });

  if (isError) {
    notFound();
  }

  return (
    <Paper
      component='div'
      sx={{width: '90%', alignItems: 'center', margin: 'auto', padding: '50px'}}
    >
      {isPending && <div>Loading...</div>}
      {data && <ItemCard item={data}/>}
    </Paper>
  );
}