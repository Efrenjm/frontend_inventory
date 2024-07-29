'use client';
import { forwardRef, ReactElement, Ref, Dispatch, SetStateAction } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { LoadingButton } from "@mui/lab";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface CustomModalProps {
  open: boolean;
  title: string;
  description: string;
  callToAction: string;
  handleAction: () => void;
  callToCancel?: string;
  handleCancel?: () => void;
  loading: boolean;
  disabled?: boolean;
}

export default function ModalTemplate({
                                        open,
                                        title,
                                        description,
                                        callToAction,
                                        handleAction,
                                        callToCancel,
                                        handleCancel,
                                        loading,
                                        disabled
                                      }: CustomModalProps) {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {callToCancel && <Button onClick={handleCancel}>{callToCancel}</Button>}
        {/*<Button onClick={handleCancel}>{callToCancel}</Button>*/}
        <LoadingButton
          variant="contained"
          onClick={handleAction}
          loading={loading}
          loadingPosition="start"
          disabled={disabled}
        >
          <span>{callToAction}</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
