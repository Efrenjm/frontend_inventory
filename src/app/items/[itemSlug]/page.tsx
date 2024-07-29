'use client';
import ItemCard from "@/app/items/[itemSlug]/ItemCard";

interface ItemDetailPageProps {
  params: {
    itemSlug: string;
  }
}

export default function ItemDetailPage({params}: ItemDetailPageProps) {
  return (
    <div>
      <ItemCard id={parseInt(params.itemSlug)}/>
    </div>
  );
}