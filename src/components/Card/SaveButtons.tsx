'use client';
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { AddBox, ArrowBackIosNew, Save } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Hidden } from "@mui/material";
import Typography from "@mui/material/Typography";


interface SaveButtonsProps {
  readOnly : boolean;
  setReadOnly: (value: boolean) => void;
  loading: boolean;
  handleCreateItem: (e: MouseEvent) => void;
}

export default function SaveButtons({readOnly, setReadOnly, loading, handleCreateItem}: SaveButtonsProps) {
  const router = useRouter();
  return (
    <>
      {readOnly ? (
        <LoadingButton
          variant="contained"
          startIcon={<Save/>}
          sx={{
            padding: '10px 40px'
          }}
          onClick={handleCreateItem}
          loading={loading}
          loadingPosition="start"
        >
          <span>Save Item</span>
        </LoadingButton>
      ) : (
        <Box display='flex' sx={{width:'100%', alignContent:'space-evenly', justifyContent:'space-evenly'}}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIosNew/>}
            sx={{
              padding: '10px 40px'
            }}
            onClick={() => router.push('/items')}
          >
            {/*<ArrowBackIosNew/>*/}
            <Hidden smDown>
              <span>Go back</span>
            </Hidden>
          </Button>
          <Button
            variant="contained"
            startIcon={<AddBox/>}
            sx={{
              padding: '10px 40px'
            }}
            onClick={() => setReadOnly(false)}
          >
            {/*<AddBox/>*/}
            <Hidden smDown>
              <span>Create a new item</span>
            </Hidden>
          </Button>
        </Box>
      )}
    </>
  );
}