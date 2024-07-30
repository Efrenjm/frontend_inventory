'use client';
import { getAllItems, getItemById, updateItem } from "@/utils/queries";
import { useQuery } from "@apollo/client";
import {
  GetItemByIdQuery,
  GetItemByIdQueryVariables
} from "@/__generated__/graphql";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import ItemDetails from '@/components/Card/ItemDetails';

interface CustomCardProps {
  id: number;
  isEditable?: boolean;
}

export default function ItemCard({ id, isEditable }: CustomCardProps) {

  const { data: queryData, loading: queryLoading, error: queryError } = useQuery<GetItemByIdQuery, GetItemByIdQueryVariables>(
    getItemById,
    { variables: { id: id.toString() } }
  );

  const [updateItemFn, { loading: updateLoading, error: updateError }] = useMutation(updateItem, {
    refetchQueries: [
      {query: getAllItems}
    ]
  });


  return (
    <>
      {(!queryLoading && !queryError) && (
        <ItemDetails
          initialValues={queryData?.getItemById!}
          isEditable={!!isEditable}
          isSaving={updateLoading}
          isNew={false}
          mutationFunction={isEditable? updateItemFn : undefined}
        />
      )}
    </>
    // <BackgroundCard component='div'>
    //   {queryError && (queryError.message === "Not found" ? <ItemNotFound/> : <BadRequest/>)}
    //   {queryLoading && <Loader isPending={queryLoading}/>}
    //   {!queryError && !queryLoading && (
    //     <FormFields
    //       formValues={formValues}
    //       readOnly={!isEditable}
    //       handleFormChanges={handleChanges}
    //     />
    //   )}
    // </BackgroundCard>
  );
}