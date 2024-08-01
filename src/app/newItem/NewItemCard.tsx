'use client';
import { createItem, getAllItems } from "@/utils/queries";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import ItemDetails from "@/components/card/ItemDetails";
import { useSnackbar } from "notistack";

export default function NewItemCard() {
  const { enqueueSnackbar } = useSnackbar();

  const [createMutation, { loading, error }] = useMutation(createItem, {
    refetchQueries: [
      { query: getAllItems }
    ]
  });
  const mutationCompleted = () => {
    enqueueSnackbar('Item created successfully.', { variant: 'success' });
  }
  const mutationFailed = () => {
    if (error?.message === "Conflict") {
      enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
    }
  }

  return (
    <ItemDetails
      isEditable={true}
      isNew={true}
      isSaving={loading}
      mutationConflict={error?.message === "Conflict"}
      handleMutation={createMutation}
      handleMutationCompleted={mutationCompleted}
      handleMutationFailed={mutationFailed}
    />
  );
}