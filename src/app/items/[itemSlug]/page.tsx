'use client';
import ItemCard from "@/app/items/[itemSlug]/ItemCard";

interface ItemDetailPageProps {
  params: {
    itemSlug: string;
  },
  searchParams?: {
    edit?: boolean;
  }
}

export default function ItemDetailPage({ params, searchParams }: ItemDetailPageProps) {
  return (
    <ItemCard id={parseInt(params.itemSlug)} isEditable={searchParams?.edit} />
  );
}