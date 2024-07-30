'use client';
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { AddBox, ArrowBackIosNew, Save } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface SaveButtonsProps {
  isEditable: boolean;
  isLoading: boolean;
  isNew: boolean;
  handleSaveItem: (e: MouseEvent) => void;
  handleCreateNextItem?: (e: MouseEvent) => void;
}

export default function SaveButtons({isEditable, isNew, isLoading, handleSaveItem, handleCreateNextItem}: SaveButtonsProps) {
  const router = useRouter();

  return (
    <>
      {isEditable ? (
        <Box display='flex' justifyContent='center'>
          <LoadingButton
            variant="contained"
            startIcon={<Save/>}
            sx={{
              padding: '10px 60px'
            }}
            onClick={handleSaveItem}
            loading={isLoading}
            loadingPosition="start"
          >
            <span>Save Item</span>
          </LoadingButton>
        </Box>
      ) : (
        <Box display='flex' sx={{width: '100%', alignContent: 'space-evenly', justifyContent: 'space-evenly'}}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIosNew/>}
            sx={{
              padding: '10px 40px'
            }}
            onClick={() => router.push('/items')}
          >
            <Typography sx={{
              display: {xs:'none', sm: 'none', md: 'block'},

            }}>
              Go back
            </Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<AddBox/>}
            sx={{
              padding: '10px 40px'
            }}
            onClick={handleCreateNextItem}
          >
            <Typography sx={{
              display: {xs:'none', sm: 'none', md: 'block'},
            }}>
              Add another
            </Typography>
          </Button>
        </Box>
      )}
    </>
  );
}