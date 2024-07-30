'use client';
import { MouseEvent, ChangeEvent, useEffect } from "react";
import { generateFormValues } from "@/utils/dataManipulation";
import { createItem, getAllItems } from "@/utils/queries";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import ItemDetails from "@/components/Card/ItemDetails";

export default function NewItemCard() {
  const [createMutation, {data, loading, error}] = useMutation(createItem, {
    refetchQueries: [
      {query: getAllItems}
    ],
    // onCompleted: (response) => {
    //   setFormValues(generateFormValues(response.createItem!));
    // },
    // onError: (error) => {
    //   console.log("this is the error: " + error)
    // }
  });


  return (
    <ItemDetails
      isEditable={true}
      isNew={true}
      isSaving={loading}
      mutationConflict={error?.message === "Conflict"}
      mutationFunction={createMutation}
    />
    // <BackgroundCard component="form">
    //   {(!error && !loading) && (
    //     <>
    //       <FormFields
    //         formValues={formValues}
    //         invalidData={invalidData}
    //         readOnly={readOnly}
    //         handleFormChanges={handleChanges}
    //       />
    //       <SaveButtons
    //         isEditable={!readOnly}
    //         loading={loading}
    //         handleCreateNextItem={handleCreateNextItem}
    //         handleSaveItem={handleCreateItem}
    //       />
    //     </>
    //   )}
    //   {(error && error.message === "Conflict") && (
    //     <BadRequest/>
    //   )}
    // </BackgroundCard>
  );
}