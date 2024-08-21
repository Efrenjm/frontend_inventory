"use client";
import { MouseEvent, ChangeEvent } from "react";
import { useState } from "react";

import {
  CreateItemMutationFunction,
  FormInvalidValues,
  FormValues,
  Item,
  UpdateItemMutationFunction,
} from "@/utils/types";
import BackgroundCard from "@/components/card/BackgroundCard";

import SaveButtons from "@/components/card/SaveButtons";
import FormFields from "@/components/card/FormFields";
import { generateFormValues } from "@/utils/dataManipulation";
import { Item as gqlItem } from "@/__generated__/graphql";

interface ItemDetailsProps {
  isEditable: boolean;
  isSaving: boolean;
  isNew: boolean;
  initialValues?: Item | gqlItem;
  handleMutation?: UpdateItemMutationFunction | CreateItemMutationFunction;
  handleMutationCompleted?: () => void;
  handleMutationFailed?: () => void;
}

export default function ItemDetails({
  isEditable,
  isSaving,
  isNew,
  initialValues,
  handleMutation,
  handleMutationCompleted,
  handleMutationFailed,
}: ItemDetailsProps) {
  const [readOnly, setReadOnly] = useState<boolean>(!isEditable);
  const [formValues, setFormValues] = useState<FormValues>(generateFormValues(initialValues));
  const [invalidData, setInvalidData] = useState<FormInvalidValues>({
    id: { error: false, message: "" },
    name: { error: false, message: "" },
    locationId: { error: false, message: "" },
    locationState: { error: false, message: "" },
    locationPhoneNumber: { error: false, message: "" },
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const prop = name.split(".")[1];
      setFormValues((prevItem) => ({
        ...prevItem,
        location: {
          ...prevItem.location,
          [prop]: value,
        },
      }));
    } else {
      setFormValues((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  const containsInvalidData = () => {
    const dataValidation = {
      id: {
        error: !/^\d+$/.test(formValues.id.trim()) || parseInt(formValues.id.trim()) <= 0,
        message: "Please enter a valid ID",
      },
      name: {
        error: formValues.name.trim() === "",
        message: "Please enter a valid name",
      },
      locationId: {
        error:
          !/^\d+$/.test(formValues.location.id.trim()) ||
          parseInt(formValues.location.id.trim()) <= 0,
        message: "Please enter a valid location ID",
      },
      locationState: {
        error: formValues.location.state.trim() === "",
        message: "Please enter a valid state",
      },
      locationPhoneNumber: {
        error: !(
          formValues.location.phoneNumber?.toString().trim() === "" ||
          /^\d+$/.test(formValues.location.phoneNumber?.toString().trim())
        ),
        message: "Please enter a valid phone number",
      },
    };
    setInvalidData(dataValidation);
    return Object.values(dataValidation).reduce((acc, curr) => acc || curr.error, false);
  };

  const handleSaveItem = (e: MouseEvent) => {
    e.preventDefault();
    if (!containsInvalidData() && handleMutation) {
      handleMutation({
        variables: { item: formValues },
        onError: (error) => {
          if (error.message === "Conflict") {
            setReadOnly(false);
            setInvalidData((prevData) => ({
              ...prevData,
              id: {
                error: true,
                message: "ID already exists",
              },
            }));
          } else if (handleMutationFailed) {
            handleMutationFailed();
          }
        },
        onCompleted: (response) => {
          if (handleMutationCompleted) {
            handleMutationCompleted();
          }
          if ("createItem" in response) {
            setFormValues(generateFormValues(response.createItem!));
            setReadOnly(true);
          }
        },
      });
    }
  };

  const handleCreateNextItem = (e: MouseEvent) => {
    e.preventDefault();
    setReadOnly(false);
    setFormValues(generateFormValues(undefined));
  };

  return (
    <BackgroundCard component="form">
      <FormFields
        isNew={isNew}
        formValues={formValues}
        invalidData={invalidData}
        readOnly={readOnly}
        handleFormChanges={handleChanges}
      />
      {isEditable && (
        <SaveButtons
          isEditable={!readOnly}
          isLoading={isSaving}
          handleCreateNextItem={handleCreateNextItem}
          handleSaveItem={handleSaveItem}
        />
      )}
    </BackgroundCard>
  );
}
