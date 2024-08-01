import { ChangeEvent } from "react";
import { InputAdornment, TextField, Grid } from "@mui/material";
import { FormInvalidValues, FormValues } from "@/utils/types";

interface FormFieldsProps {
  formValues: FormValues;
  invalidData?: FormInvalidValues;
  readOnly: boolean;
  isNew: boolean;
  handleFormChanges?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormFields({ formValues, invalidData, readOnly, isNew, handleFormChanges }: FormFieldsProps) {
  return (
    <Grid container spacing={2} columns={12} >
      <Grid item sm={4}>
        <TextField
          name="id"
          label="Id"
          value={formValues.id}
          onChange={handleFormChanges}
          error={invalidData?.id?.error}
          helperText={invalidData?.id?.error && invalidData?.id?.message}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          fullWidth
        />
      </Grid>
      <Grid item sm={8}>
        <TextField
          name="name"
          label="Item"
          value={formValues.name}
          onChange={handleFormChanges}
          error={invalidData?.name?.error}
          helperText={invalidData?.name?.error && invalidData?.name?.message}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant={readOnly ? "filled" : "standard"}
          fullWidth
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="description"
          label="Description"
          value={formValues.description}
          onChange={handleFormChanges}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant={readOnly ? "filled" : "standard"}
          multiline
          fullWidth
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="location.id"
          label="Location id"
          value={formValues.location.id}
          onChange={handleFormChanges}
          error={invalidData?.locationId?.error}
          helperText={invalidData?.locationId?.error && invalidData?.locationId?.message}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant={readOnly || !isNew ? "filled" : "standard"}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          name="location.state"
          label="State"
          value={formValues.location.state}
          onChange={handleFormChanges}
          error={invalidData?.locationState?.error}
          helperText={invalidData?.locationState?.error && invalidData?.locationState?.message}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          multiline
          fullWidth
        />
      </Grid>
      <Grid item sm={6}>

        <TextField
          name="location.phoneNumber"
          label="Phone Number"
          value={formValues.location.phoneNumber}
          onChange={handleFormChanges}
          error={invalidData?.locationPhoneNumber?.error}
          helperText={invalidData?.locationPhoneNumber?.error && invalidData?.locationPhoneNumber?.message}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          fullWidth
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="location.address"
          label="Address"
          value={formValues.location.address}
          onChange={handleFormChanges}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          multiline
          fullWidth
        />
      </Grid>
    </Grid>
  )
}