import { Paper } from "@mui/material";

import ItemCard from "@/components/Card/ItemCard";
import { getItem } from "@/utils/http";


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
  const item = getItem(params.itemSlug);
  return (
    <Paper
      component='div'
      sx={{width: '90%', alignItems: 'center', margin: 'auto', padding: '50px'}}
    >
      <ItemCard item={item} readOnly={true}/>
    </Paper>
  );
}