'use client';
import BackgroundCard from "@/components/Card/BackgroundCard";
import FormFields from "@/components/Card/FormFields";
import { generateFormValues } from "@/utils/dataManipulation";
import ItemNotFound from "@/components/errors/ItemNotFound";
import BadRequest from "@/components/errors/BadRequest";
import Loader from "@/components/loader/Loader";
import { getItemById } from "@/utils/queries";
import { useQuery } from "@apollo/client";
import { GetItemByIdQuery, GetItemByIdQueryVariables } from "@/__generated__/graphql";

interface CustomCardProps {
  id: number;
}

export default function ItemCard({id}: CustomCardProps) {

  const {data, loading, error} = useQuery<GetItemByIdQuery, GetItemByIdQueryVariables>(
    getItemById,
    {variables: {id: id.toString()}}
  );

  return (
    <BackgroundCard component='div'>
      {error && (error.cause?.message === "Not found" ? <ItemNotFound/> : <BadRequest/>)}
      {loading && <Loader isPending={loading}/>}
      {data && (
        <FormFields
          formValues={generateFormValues(data.getItemById!)}
          readOnly={true}
        />
      )}
    </BackgroundCard>
  );
}