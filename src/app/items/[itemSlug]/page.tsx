'use client';
import ItemCard from "@/app/items/[itemSlug]/ItemCard";
import { getItem } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import BackgroundCard from "@/components/Card/BackgroundCard";
import BadRequest from "@/components/errors/BadRequest";
import Box from "@mui/material/Box";
import { CircularProgress, Fade } from "@mui/material";
import ItemNotFound from "@/components/errors/ItemNotFound";
import Loader from "@/components/loader/Loader";


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