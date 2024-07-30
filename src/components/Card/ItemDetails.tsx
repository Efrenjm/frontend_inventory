'use client';
import { MouseEvent, ChangeEvent, useEffect, Dispatch, SetStateAction } from "react";
import { useState } from "react";

import {
  CreateItemMutationFunction,
  FormInvalidValues,
  FormValues,
  Item,
  UpdateItemMutationFunction
} from "@/utils/types";
import BackgroundCard from "@/components/Card/BackgroundCard";
import SaveButtons from "@/components/Card/SaveButtons";
import FormFields from "@/components/Card/FormFields";
import { generateFormValues } from "@/utils/dataManipulation";
import BadRequest from "@/components/errors/BadRequest";
import {
  Item as gqlItem,
} from '@/__generated__/graphql';
import { MutationResult, QueryOptions } from "@apollo/client";

interface ItemDetailsProps {
  isEditable: boolean;
  isSaving: boolean;
  isNew: boolean;
  mutationConflict?: boolean;
  initialValues?: Item | gqlItem;
  mutationFunction?: UpdateItemMutationFunction | CreateItemMutationFunction;
}

export default function ItemDetails({isEditable, isSaving, isNew, mutationConflict, initialValues, mutationFunction}: ItemDetailsProps) {
  const [readOnly, setReadOnly] = useState<boolean>(!isEditable);
  const [formValues, setFormValues] = useState<FormValues>(generateFormValues(initialValues));
  const [invalidData, setInvalidData] = useState<FormInvalidValues>({
    id: {error: false, message: ''},
    name: {error: false, message: ''},
    locationId: {error: false, message: ''},
    locationState: {error: false, message: ''},
    locationPhoneNumber: {error: false, message: ''}
  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    if (name.startsWith('location.')) {
      const prop = name.split('.')[1];
      setFormValues((prevItem) => ({
        ...prevItem,
        location: {
          ...prevItem.location,
          [prop]: value
        }
      }));
    } else {
      setFormValues((prevItem) => ({
        ...prevItem,
        [name]: value
      }));
    }
  };

  const containsInvalidData = () => {
    const dataValidation = {
      id: {
        error: (!/^\d+$/.test(formValues.id.trim()) || parseInt(formValues.id.trim()) <= 0),
        message: 'Please enter a valid ID'
      },
      name: {
        error: formValues.name.trim() === "",
        message: 'Please enter a valid name'
      },
      locationId: {
        error: (!/^\d+$/.test(formValues.location.id.trim()) || parseInt(formValues.location.id.trim()) <= 0),
        message: 'Please enter a valid location ID'
      },
      locationState: {
        error: formValues.location.state.trim() === "",
        message: 'Please enter a valid state'
      },
      locationPhoneNumber: {
        error: !(formValues.location.phoneNumber?.toString().trim() === '' || /^\d+$/.test(formValues.location.phoneNumber?.toString().trim())),
        message: 'Please enter a valid phone number'
      }
    }
    setInvalidData(dataValidation)
    return Object.values(dataValidation).reduce((acc, curr) => acc || curr.error, false);
  };

  const handleCreateItem = (e: MouseEvent) => {
    e.preventDefault();
    if (!containsInvalidData() && mutationFunction) {
      setReadOnly(true);
      mutationFunction({variables: {item: formValues}});
    }
  };

  const handleCreateNextItem = (e: MouseEvent) => {
    e.preventDefault();
    setReadOnly(false);
    setFormValues(generateFormValues(undefined));
  }

  return (
    <BackgroundCard component="form">
        <FormFields
          isNew={isNew}
          formValues={formValues}
          invalidData={invalidData}
          readOnly={readOnly}
          handleFormChanges={handleChanges}
        />
        {isEditable &&
          <SaveButtons
            isEditable={!readOnly}
            isNew={isNew}
            isLoading={isSaving}
            handleCreateNextItem={handleCreateNextItem}
            handleSaveItem={handleCreateItem}
          />
        }
    </BackgroundCard>
  );
}