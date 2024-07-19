'use client';
import {forwardRef, ReactElement, Ref, Dispatch, SetStateAction} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ModalSettings } from "@/components/table/tableTypes";
import { useMutation } from "@tanstack/react-query";
import { deleteItem, queryClient } from "@/utils/http";
import { Item } from "@/utils/types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomModalProps {
  modalSettings: ModalSettings;
  setModalSettings: Dispatch<SetStateAction<ModalSettings>>;
}

export default function CustomModal({modalSettings, setModalSettings}: CustomModalProps) {

  const handleClose = () => {
    setModalSettings({open: false});
  };

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: deleteItem,
    onMutate: async ({id}) => {
      await queryClient.cancelQueries({queryKey: ['items']});

      const previousItems = queryClient.getQueryData<Item[]>(['items']);

      if (previousItems) {
        queryClient.setQueryData(['items'], (oldData: Item[]) => {
            return oldData.filter(item => item.id !== id);
          }
        );
      }

      return { previousItems };
    },
    onError: (err, {id}, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['items'], context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['items']});
    }
  });

  const handleDelete = (id: number) => {
    mutate({id});
    handleClose();
  }

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
          <DialogTitle>
            {!isPending ? `Are you sure you want to delete ${modalSettings.row.name}?` :
              'Deleting...'
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {!isPending ? 'This action cannot be undone.' :
                'Please wait...'
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleDelete(modalSettings.row!.id)}>Continue</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
