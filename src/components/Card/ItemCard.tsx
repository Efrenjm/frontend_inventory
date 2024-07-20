'use client';
import { MouseEvent, ChangeEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ArrowBack, DeleteForever, Save, SaveAlt } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { FormInvalidValues, FormValues, Item } from "@/utils/types";
import { createItem, queryClient } from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import BackgroundCard from "@/components/Card/BackgroundCard";
import Button from "@mui/material/Button";

interface CustomCardProps {
  item?: Item;
}

export default function ItemCard({item}: CustomCardProps) {
  const [isNewItem, setIsNewItem] = useState<boolean>(!item);
  const [readOnly, setReadOnly] = useState<boolean>(!isNewItem);
  const router = useRouter();

  const [invalidData, setInvalidData] = useState<FormInvalidValues>({
    id: false,
    name: false,
    locationId: false,
    locationState: false,
    locationPhoneNumber: false
  });

  const [formValues, setFormValues] = useState<FormValues>({
    id: item && item.id ? ""+item.id : "",
    name: item && item.name ? item.name : "",
    description: item && item.description ? item.description : "",
    location: item && item.location ? {
      id: item.location.id ? ""+item.location.id : "",
      state: item.location.state ? item.location.state : "",
      phoneNumber: item.location.phoneNumber ? item.location.phoneNumber : "",
      address: item.location.address ? item.location.address : ""
    } : {
      id: "",
      state: "",
      phoneNumber: "",
      address: ""
    }
  });

  const [itemCreated, setItemCreated] = useState<boolean>(false);
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: createItem,
    onMutate: ()=>{
      setReadOnly(true);
      setIsNewItem(false);
      setItemCreated(true);
    },
    onSuccess: (data) => {
      setFormValues(data);
      queryClient.invalidateQueries({queryKey: ['items']});
      setItemCreated(true);

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
      locationPhoneNumber: !(formValues.location.phoneNumber.trim() === '' || /^\d+$/.test(formValues.location.phoneNumber.trim()))
    }
    setInvalidData(dataValidation)

    return Object.values(dataValidation).reduce((acc, curr) => acc || curr, false);
  }
  const handleCreateItem = (e: MouseEvent) => {
    e.preventDefault();

    if (!containsInvalidData()) {
      const newItem: Item = {
        ...formValues,
        id: parseInt(formValues.id),
        location: {
          ...formValues.location,
          id: parseInt(formValues.location.id)
        }
      };
      mutate({newItem});
    }
  }

  return (
    <BackgroundCard component="form">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <TextField
            name="id"
            label={isNewItem? "Id*" : "Id"}
            error={invalidData.id}
            value={formValues.id}
            InputProps={{
              readOnly,
              startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
            }}
            variant="standard"
            sx={{width: '15%'}}
            onChange={handleChanges}
          />
          <TextField
            name="name"
            label={isNewItem? "Item*" : "Item"}
            error={invalidData.name}
            value={formValues.name}
            InputProps={{
              readOnly,
              startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
            }}
            variant="standard"
            sx={{width: '75%'}}
            onChange={handleChanges}
          />
        </div>
        <div>
          <TextField
            name="description"
            label="Description"
            value={formValues.description}
            InputProps={{
              readOnly,
              startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
            }}
            variant="standard"
            onChange={handleChanges}
            multiline
            fullWidth
          />
        </div>
        <div>
          <TextField
            name="location.id"
            label="Location id*"
            error={invalidData.locationId}
            value={formValues.location.id}
            InputProps={{
              readOnly,
              startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
            }}
            variant="standard"
            sx={{width: '15%', minWidth: '90px'}}
            onChange={handleChanges}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <TextField
            name="location.state"
            label="State"
            value={formValues.location.state}
            error={invalidData.locationState}
            InputProps={{
              readOnly,
              startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
            }}
            variant="standard"
            sx={{width: '42%'}}
            onChange={handleChanges}
          />
          <TextField
            name="location.phoneNumber"
            label="Phone Number"
            value={formValues.location.phoneNumber}
            error={invalidData.locationPhoneNumber}
            InputProps={{
              readOnly,
              startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
            }}
            variant="standard"
            sx={{width: '42%'}}
            onChange={handleChanges}
          />
        </div>
        <div>
          <TextField
            name="location.address"
            label="Address"
            value={formValues.location.address}
            InputProps={{
              readOnly,
              startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
            }}
            variant="standard"
            onChange={handleChanges}
            multiline
            fullWidth
          />
        </div>
      {/*</Box>*/}
      {isNewItem && (
        <LoadingButton
          variant="contained"
          startIcon={<Save/>}
          sx={{
            padding: '10px 40px'
          }}
          onClick={handleCreateItem}
          loading={isPending}
          loadingPosition="start"
        >
          <span>Save Item</span>
        </LoadingButton>
      )}
      {itemCreated && (
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <Button
            variant="contained"
            startIcon={<Save/>}
            sx={{
              padding: '10px 40px'
            }}
            onClick={()=>router.push('/items')}
          >
            <span>Go back</span>
          </Button>
          <Button
            variant="contained"
            startIcon={<Save/>}
            sx={{
              padding: '10px 40px'
            }}
            onClick={handleCreateItem}
          >
            <span>Create a new one</span>
          </Button>
        </div>
      )}
    </BackgroundCard>
  );
}