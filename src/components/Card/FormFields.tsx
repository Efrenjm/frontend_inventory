import { ChangeEvent } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { FormInvalidValues, FormValues } from "@/utils/types";
import Box from "@mui/material/Box";

interface FormFieldsProps {
  formValues: FormValues;
  invalidData: FormInvalidValues;
  readOnly: boolean;
  handleFormChanges: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormFields({formValues, invalidData, readOnly, handleFormChanges}: FormFieldsProps) {
  return (
    <Box component='div'
         sx={{
           overflow:'auto',
           display: 'flex',
           flexDirection: 'column',
           rowGap: '50px',
           width: '100%',
         }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <TextField
          name="id"
          label={readOnly ? "Id" : "Id*"}
          value={formValues.id}
          onChange={handleFormChanges}
          error={invalidData.id}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '15%'}}
        />
        <TextField
          name="name"
          label={readOnly ? "Item" : "Item*"}
          value={formValues.name}
          onChange={handleFormChanges}
          error={invalidData.name}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '75%'}}
        />
      </div>
      <div>
        <TextField
          name="description"
          label="Description"
          value={formValues.description}
          onChange={handleFormChanges}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          multiline
          fullWidth
        />
      </div>
      <div>
        <TextField
          name="location.id"
          label={readOnly ? "Location id" : "Location id*"}
          value={formValues.location.id}
          onChange={handleFormChanges}
          error={invalidData.locationId}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '15%', minWidth: '90px'}}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <TextField
          name="location.state"
          label={readOnly ? "State" : "State*"}
          value={formValues.location.state}
          onChange={handleFormChanges}
          error={invalidData.locationState}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '42%'}}
          multiline
        />
        <TextField
          name="location.phoneNumber"
          label="Phone Number"
          value={formValues.location.phoneNumber}
          onChange={handleFormChanges}
          error={invalidData.locationPhoneNumber}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '42%'}}
        />
      </div>
      <div>
        <TextField
          name="location.address"
          label="Address"
          value={formValues.location.address}
          onChange={handleFormChanges}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          multiline
          fullWidth
        />
      </div>
    </Box>
  )
}