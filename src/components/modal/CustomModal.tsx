'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {ModalSettings} from "@/components/table/tableTypes";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomModalProps {
  modalSettings: ModalSettings;
  setModalSettings: React.Dispatch<React.SetStateAction<ModalSettings>>;
}

export default function CustomModal({modalSettings, setModalSettings}: CustomModalProps) {

  const handleClose = () => {
    setModalSettings({open:false});
  };

  return (
    <>
      {modalSettings.row && (
        <Dialog
          open={modalSettings.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`Are you sure you want to delete ${modalSettings.row.name}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Continue</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
