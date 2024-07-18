import { Box, InputAdornment, TextField } from "@mui/material";
import { Item } from "@/utils/types"

interface CustomCardProps {
  item?: Item;
}

export default function ItemCard({item}: CustomCardProps) {
  const readOnly = !!item;
  return (
    <>
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        rowGap: '60px',
        width: '90%'
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <TextField
          label="Id"
          defaultValue={item ? item.id: ""}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '15%'}}
        />
        <TextField
          label="Item"
          defaultValue={item ? item.name : ""}
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
          label="Description"
          defaultValue={item ? item.description : ""}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Location id"
          defaultValue={item && item.location ? item.location.id : ""}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '15%'}}
        />
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <TextField
          label="State"
          defaultValue={item && item.location ? item.location.state : ""}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
          }}
          variant="standard"
          sx={{width: '42%'}}
        />
        <TextField
          label="Phone Number"
          defaultValue={item && item.location ? item.location.phoneNumber : ""}
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
          label="Address"
          defaultValue={item && item.location ? item.location.address : ""}
          InputProps={{
            readOnly,
            startAdornment: readOnly && <InputAdornment position="start">&nbsp;</InputAdornment>
        }}
          variant="standard"
          fullWidth
        />
      </div>
    </Box>
    </>
  );
}