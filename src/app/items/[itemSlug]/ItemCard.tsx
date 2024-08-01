'use client';
import { getAllItems, getItemById, updateItem } from "@/utils/queries";
import { useQuery } from "@apollo/client";
import {
  GetItemByIdQuery,
  GetItemByIdQueryVariables
} from "@/__generated__/graphql";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import ItemDetails from '@/components/card/ItemDetails';
import { useSnackbar } from "notistack";

interface CustomCardProps {
  id: number;
  isEditable?: boolean;
}

export default function ItemCard({ id, isEditable }: CustomCardProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { data: queryData, loading: queryLoading, error: queryError } = useQuery<GetItemByIdQuery, GetItemByIdQueryVariables>(
    getItemById,
    { variables: { id: id.toString() } }
  );

  const [updateItemFn, { loading: updateLoading }] = useMutation(updateItem, {
    refetchQueries: [
      { query: getAllItems }
    ]
  });

  const mutationCompleted = () => {
    enqueueSnackbar('Item updated successfully.', { variant: 'success' });
  };
  const mutationFailed = () => {
    enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
  };
  return (
    <>
      {(!queryLoading && !queryError) && (
        <ItemDetails
          initialValues={queryData?.getItemById!}
          isEditable={!!isEditable}
          isSaving={updateLoading}
          isNew={false}
          handleMutation={isEditable ? updateItemFn : undefined}
          handleMutationCompleted={isEditable ? mutationCompleted : undefined}
          handleMutationFailed={isEditable ? mutationFailed : undefined}
        />
      )}
    </>
  );
}