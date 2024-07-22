'use client';
import { MouseEvent, ChangeEvent, useEffect } from "react";
import { useState } from "react";

import { FormInvalidValues, FormValues, Item } from "@/utils/types";
import { createItem, queryClient } from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import BackgroundCard from "@/components/Card/BackgroundCard";
import SaveButtons from "@/components/Card/SaveButtons";
import FormFields from "@/components/Card/FormFields";
import { generateFormValues } from "@/utils/dataManipulation";
import BadRequest from "@/components/errors/BadRequest";

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

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: createItem,
    onMutate: () => {
      setReadOnly(true);
    },
    onError: () => {
      setReadOnly(false);
    },
    onSuccess: (data) => {
      setFormValues(generateFormValues(data));
      queryClient.invalidateQueries({queryKey: ['items']});
    }
  })

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
  }

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
      const newItem: Item = {
        id: parseInt(formValues.id),
        name: formValues.name.trim(),
        description: formValues.description?.trim(),
        location: {
          id: parseInt(formValues.location.id),
          state: formValues.location.state.trim(),
          address: formValues.location.address?.trim(),
          phoneNumber: formValues.location.phoneNumber?.toString().trim()
        }
      };
      mutate({newItem});
    }
  }
  const handleCreateNextItem = (e: MouseEvent) => {
    e.preventDefault();
    setReadOnly(false);
    setFormValues(generateFormValues(undefined));
  }


  useEffect(() => {
    if (isError) {
      if (error.cause === 409) {
        setInvalidData((prevState)=>({
          ...prevState,
          id: {error: true, message: 'ID already exists'}
        }));
      }
    }
  }, [isError, error]);

  return (
    <BackgroundCard component="form">
      {/*{!isError || error?.cause === 409 && (*/}
      {/*  <>*/}
      {/*  <FormFields*/}
      {/*    formValues={formValues}*/}
      {/*    invalidData={invalidData}*/}
      {/*    readOnly={readOnly}*/}
      {/*    handleFormChanges={handleChanges}*/}
      {/*  />*/}
      {/*  <SaveButtons*/}
      {/*    readOnly={!readOnly}*/}
      {/*    loading={isPending}*/}
      {/*    handleCreateNextItem={handleCreateNextItem}*/}
      {/*    handleCreateItem={handleCreateItem}*/}
      {/*  />*/}
      {/*  </>*/}
      {/*)}*/}
      {(isError && error?.cause !== 409) ? <BadRequest /> :
        <>
          <FormFields
            formValues={formValues}
            invalidData={invalidData}
            readOnly={readOnly}
            handleFormChanges={handleChanges}
          />
          <SaveButtons
            readOnly={!readOnly}
            loading={isPending}
            handleCreateNextItem={handleCreateNextItem}
            handleCreateItem={handleCreateItem}
          />
        </>
      }
    </BackgroundCard>
  );
}