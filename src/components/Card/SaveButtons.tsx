'use client';
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { AddBox, ArrowBackIosNew, Save } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Hidden } from "@mui/material";

interface SaveButtonsProps {
  readOnly : boolean;
  loading: boolean;
  handleCreateNextItem: (e: MouseEvent) => void;
  handleCreateItem: (e: MouseEvent) => void;
}

export default function SaveButtons({readOnly, handleCreateNextItem, loading, handleCreateItem}: SaveButtonsProps) {
  const router = useRouter();
  return (
    <>
      {readOnly ? (
        <Box display='flex' justifyContent='center'>

          <LoadingButton
            variant="contained"
            startIcon={<Save/>}
            sx={{
              padding: '10px 60px'
            }}
            onClick={handleCreateItem}
            loading={loading}
            loadingPosition="start"
          >
            <span>Save Item</span>
          </LoadingButton>
        </Box>
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
            onClick={handleCreateNextItem}
          >
            <Hidden smDown>
              <span>Create a new item</span>
            </Hidden>
          </Button>
        </Box>
      )}
    </>
  );
}