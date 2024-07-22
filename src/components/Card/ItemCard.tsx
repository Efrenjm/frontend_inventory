'use client';
import { MouseEvent, ChangeEvent } from "react";
import { useState } from "react";

import { FormInvalidValues, FormValues, Item } from "@/utils/types";
import { createItem, queryClient } from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import BackgroundCard from "@/components/Card/BackgroundCard";
import SaveButtons from "@/components/Card/SaveButtons";
import FormFields from "@/components/Card/FormFields";

function generateFormValues(item: Item | undefined): FormValues {
  return {
    id: item?.id?.toString().trim() ?? "",
    name: item?.name.trim() ?? "",
    description: item?.description?.trim() ?? "",
    location: {
      id: item?.location?.id?.toString().trim() ?? "",
      state: item?.location?.state?.trim() ?? "",
      phoneNumber: item?.location?.phoneNumber?.toString()?.trim() ?? "",
      address: item?.location?.address?.trim() ?? ""
    }
  }
}

interface CustomCardProps {
  item?: Item;
  isNewItem?: boolean;
}

export default function ItemCard({item, isNewItem}: CustomCardProps) {
  const [readOnly, setReadOnly] = useState<boolean>(!!item);
  const [formValues, setFormValues] = useState<FormValues>(generateFormValues(item));

  const [invalidData, setInvalidData] = useState<FormInvalidValues>({
    id: false,
    name: false,
    locationId: false,
    locationState: false,
    locationPhoneNumber: false
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
      }))
    } else {
      setFormValues((prevItem) => ({
        ...prevItem,
        [name]: value
      }));
    }
  }

  const containsInvalidData = () => {
    const dataValidation = {
      id: (!/^\d+$/.test(formValues.id.trim()) || parseInt(formValues.id.trim()) <= 0),
      name: formValues.name.trim() === "",
      locationId: (!/^\d+$/.test(formValues.location.id.trim()) || parseInt(formValues.location.id.trim()) <= 0),
      locationState: formValues.location.state.trim() === "",
      locationPhoneNumber: !(formValues.location.phoneNumber?.toString().trim() === '' || /^\d+$/.test(formValues.location.phoneNumber?.toString().trim()))
    }
    setInvalidData(dataValidation)

    return Object.values(dataValidation).reduce((acc, curr) => acc || curr, false);
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

  return (
    <BackgroundCard component="form">
      <FormFields
        formValues={formValues}
        invalidData={invalidData}
        readOnly={readOnly}
        handleFormChanges={handleChanges}
      />
      {isNewItem &&
				<SaveButtons
					readOnly={!readOnly}
					setReadOnly={setReadOnly}
					loading={isPending}
					handleCreateItem={handleCreateItem}
				/>
      }
    </BackgroundCard>
  );
}