'use client';
import { MouseEvent, ChangeEvent, useEffect } from "react";
import { useState } from "react";

import { FormInvalidValues, FormValues, Item } from "@/utils/types";
import BackgroundCard from "@/components/Card/BackgroundCard";
import SaveButtons from "@/components/Card/SaveButtons";
import FormFields from "@/components/Card/FormFields";
import { generateFormValues } from "@/utils/dataManipulation";
import BadRequest from "@/components/errors/BadRequest";
import { createItem, getAllItems } from "@/utils/queries";
import { useMutation } from "@apollo/client/react/hooks/useMutation";

export default function NewItemCard() {
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>(generateFormValues(undefined));
  const [invalidData, setInvalidData] = useState<FormInvalidValues>({
    id: {error: false, message: ''},
    name: {error: false, message: ''},
    locationId: {error: false, message: ''},
    locationState: {error: false, message: ''},
    locationPhoneNumber: {error: false, message: ''}
  });

  const [createMutation, {data, loading, error}] = useMutation(createItem, {
    refetchQueries: [
      {query: getAllItems}
    ],
    onCompleted: (response) => {
      setFormValues(generateFormValues(response.createItem!));
    },
    onError: (error) => {
      console.log("this is the error: " + error)
    }
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
  }

  const handleCreateItem = (e: MouseEvent) => {
    e.preventDefault();
    if (!containsInvalidData()) {
      setReadOnly(true);
      createMutation({variables: {item: formValues}});
    }
  }

  const handleCreateNextItem = (e: MouseEvent) => {
    e.preventDefault();
    setReadOnly(false);
    setFormValues(generateFormValues(undefined));
  }


  useEffect(() => {
    if (error) {
      if (error.message === "Conflict") {
        setInvalidData((prevState) => ({
          ...prevState,
          id: {error: true, message: 'ID already exists'}
        }));
      }
    }
  }, [error]);

  return (
    <BackgroundCard component="form">
      {(!error && !loading) && (
        <>
          <FormFields
            formValues={formValues}
            invalidData={invalidData}
            readOnly={readOnly}
            handleFormChanges={handleChanges}
          />
          <SaveButtons
            readOnly={!readOnly}
            loading={loading}
            handleCreateNextItem={handleCreateNextItem}
            handleCreateItem={handleCreateItem}
          />
        </>
      )}
      {(error && error.message === "Conflict") && (
        <BadRequest/>
      )}
    </BackgroundCard>
  );
}