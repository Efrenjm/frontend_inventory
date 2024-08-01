'use client';
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { AddBox, ArrowBackIosNew, Save } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import AnimatedIcon from "../animations/AnimatedIcon";
import AnimatedButton from "../animations/AnimatedButton";

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
          <AnimatedButton
            isLoading={isLoading}
            onClick={handleSaveItem}
            text={"Save item"}
            icon={"save"}
          />
        </Box>
      ) : (
        <Box display='flex' sx={{width: '100%', alignContent: 'space-evenly', justifyContent: 'space-evenly'}}>
          <AnimatedButton
            onClick={()=>router.push('/items')}
            text="Go back"
            icon="back_white"
            iconSize={28}
            typeProps={{
              display: {xs:'none', sm: 'none', md: 'block'},
            }}
          />
          <AnimatedButton
            onClick={handleCreateNextItem}
            text={"Add another"}
            icon={"add_white"}
            iconSize={28}
            typeProps={{
              display: {xs:'none', sm: 'none', md: 'block'},
            }}
          />
          {/* <Button
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
          </Button> */}
        </Box>
      )}
    </>
  );
}