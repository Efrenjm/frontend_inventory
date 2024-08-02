'use client';
import ItemCard from "@/app/items/[itemSlug]/ItemCard";
import { useContext, useEffect } from "react";
import { TitleContext } from "@/components/layout/AppFrame";


interface ItemDetailPageProps {
  params: {
    itemSlug: string;
  },
  searchParams?: {
    edit?: boolean;
  }
}

export default function ItemDetailPage({ params, searchParams }: ItemDetailPageProps) {
  const {setTitle} = useContext(TitleContext);
  useEffect(() => {
      if (searchParams?.edit) {
        setTitle('Edit item');
      } else {
        setTitle('Item details');
      }
  }, [searchParams, setTitle]);
  return (
    <ItemCard id={parseInt(params.itemSlug)} isEditable={searchParams?.edit} />
  );
}