'use client';
import { useContext, useEffect } from "react";
import { createItem, getAllItems } from "@/utils/queries";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import ItemDetails from "@/components/card/ItemDetails";
import { useSnackbar } from "notistack";
import {TitleContext} from "@/components/layout/AppFrame";

export default function NewItemCard() {
  const {setTitle} = useContext(TitleContext);
  useEffect(() => {
      setTitle('New item');
  }, [setTitle]);

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
    if (error?.message !== "Conflict") {
      enqueueSnackbar('This service is not available. Please try again later.', { variant: 'error' });
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