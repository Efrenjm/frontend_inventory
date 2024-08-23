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
const sxGridItem = {
  bgcolor: "primary.dark",
  border: "3px solid ",
  borderImage: "linear-gradient(#C89B3C, #785A28) 1",
  m: 0,
};
const sxInputProps = { color: "primary.contrastText" };
const sxInputLabelProps = {
  pl: 0,
  lineHeight: 0.8,
  overflow: "visible",
  //fontSize: fontSizes,
  color: "primary.contrastText",
  '&[data-shrink="true"]': {
    color: "rgba(240, 230, 210,0.7)", //primary.contrastText
  },
};
export default function FormFields({
  formValues,
  invalidData,
  readOnly,
  isNew,
  handleFormChanges,
}: FormFieldsProps) {
  return (
    <Grid container spacing={2} columns={12}>
      <Grid item sm={4} sx={sxGridItem}>
        <TextField
          name="id"
          label="Id"
          type="number"
          data-testid="form-fields"
          value={formValues.id}
          onChange={handleFormChanges}
          error={invalidData?.id?.error}
          helperText={invalidData?.id?.error && invalidData?.id?.message}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>,
            sx: sxInputProps,
          }}
          InputLabelProps={{ sx: sxInputLabelProps }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          required={isNew}
          fullWidth
        />
      </Grid>
      <Grid item sm={8} sx={sxGridItem}>
        <TextField
          name="name"
          label="Item"
          data-testid="form-fields"
          value={formValues.name}
          onChange={handleFormChanges}
          error={invalidData?.name?.error}
          helperText={invalidData?.name?.error && invalidData?.name?.message}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>,
            sx: sxInputProps,
          }}
          InputLabelProps={{ sx: sxInputLabelProps }}
          variant={readOnly ? "filled" : "standard"}
          required={isNew || !readOnly}
          inputProps={{ maxLength: 50 }}
          fullWidth
        />
      </Grid>
      <Grid item sm={12} sx={sxGridItem}>
        <TextField
          name="description"
          label="Description"
          data-testid="form-fields"
          value={formValues.description}
          onChange={handleFormChanges}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>,
            sx: sxInputProps,
          }}
          InputLabelProps={{ sx: sxInputLabelProps }}
          variant={readOnly ? "filled" : "standard"}
          inputProps={{ maxLength: 200 }}
          multiline
          fullWidth
        />
      </Grid>
      <Grid item sm={12} sx={sxGridItem}>
        <TextField
          name="location.id"
          label="Location id"
          type="number"
          data-testid="form-fields"
          value={formValues.location.id}
          onChange={handleFormChanges}
          error={invalidData?.locationId?.error}
          helperText={invalidData?.locationId?.error && invalidData?.locationId?.message}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>,
            sx: sxInputProps,
          }}
          InputLabelProps={{ sx: sxInputLabelProps }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          required={isNew}
        />
      </Grid>
      <Grid item sm={6} sx={sxGridItem}>
        <TextField
          name="location.state"
          label="State"
          data-testid="form-fields"
          value={formValues.location.state}
          onChange={handleFormChanges}
          error={invalidData?.locationState?.error}
          helperText={invalidData?.locationState?.error && invalidData?.locationState?.message}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>,
            sx: sxInputProps,
          }}
          InputLabelProps={{ sx: sxInputLabelProps }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          inputProps={{ maxLength: 20 }}
          multiline
          fullWidth
          required={isNew}
        />
      </Grid>
      <Grid item sm={6} sx={sxGridItem}>
        <TextField
          name="location.phoneNumber"
          label="Phone Number"
          data-testid="form-fields"
          value={formValues.location.phoneNumber}
          onChange={handleFormChanges}
          error={invalidData?.locationPhoneNumber?.error}
          helperText={
            invalidData?.locationPhoneNumber?.error && invalidData?.locationPhoneNumber?.message
          }
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>,
            sx: sxInputProps,
          }}
          InputLabelProps={{ sx: sxInputLabelProps }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          inputProps={{ maxLength: 10 }}
          fullWidth
        />
      </Grid>
      <Grid item sm={12} sx={sxGridItem}>
        <TextField
          name="location.address"
          label="Address"
          data-testid="form-fields"
          value={formValues.location.address}
          onChange={handleFormChanges}
          InputProps={{
            readOnly: readOnly || !isNew,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>,
            sx: sxInputProps,
          }}
          InputLabelProps={{ sx: sxInputLabelProps }}
          variant={readOnly || !isNew ? "filled" : "standard"}
          inputProps={{ maxLength: 200 }}
          multiline
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
