'use client';
import { forwardRef, useState, useEffect, ReactElement, Ref, Dispatch, SetStateAction, useCallback } from 'react';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ModalSettings } from "@/components/table/tableTypes";
// import { useMutation } from "@tanstack/react-query";
// import { deleteItem, queryClient } from "@/utils/http";
import { Item } from "@/utils/types";
import ModalTemplate, { CustomModalProps } from "@/components/modal/ModalTemplate";
import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { deleteItem } from "@/utils/queries";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeleteModalProps {
  modalSettings: ModalSettings;
  setModalSettings: Dispatch<SetStateAction<ModalSettings>>;
}

export default function DeleteModal({setModalSettings, modalSettings}: DeleteModalProps) {
  const [mutateFunction, {data, loading, error}] = useMutation(deleteItem);

  const handleClose = useCallback(() => {
    setModalSettings({open: false});
  }, [setModalSettings]);

  const handleDelete = (id: number) => {
    mutateFunction({variables: {id: id.toString()}});
  }

  const [modalProps, setModalProps] = useState<CustomModalProps>({
    open: modalSettings.open,
    title: `Are you sure you want to delete ${modalSettings.row!.name}?`,
    description: 'This action cannot be undone.',
    callToAction: 'Delete',
    handleAction: () => handleDelete(modalSettings.row!.id),
    callToCancel: 'Cancel',
    handleCancel: () => handleClose(),
    loading: false
  });

  useEffect(() => {
    if (loading) {
      setModalProps((prevModalProps) => ({
        ...prevModalProps,
        title: 'Deleting...',
        description: 'Please wait...',
        callToAction: 'Deleting',
        loading: true
      }))
    } else if (data) {
      setModalProps((prevModalProps) => ({
        ...prevModalProps,
        title: 'Deleted',
        description: `${modalSettings.row!.name} has been deleted successfully.`,
        disabled: false,
        loading: false,
        callToCancel: undefined,
        callToAction: 'Close',
        handleAction: handleClose
      }));
    } else if (error) {
      if (error.message === "Not found") {
        setModalProps((prevModalProps) => ({
          ...prevModalProps,
          title: 'An error occurred',
          loading: false,
          description: "The selected item doesn't exist.",
          callToAction: 'Close',
          handleAction: handleClose,
          callToCancel: undefined
        }))
      } else {
        setModalProps((prevModalProps) => ({
          ...prevModalProps,
          title: 'An error occurred',
          loading: false,
          description: "The request couldn't be completed. Please try again later.",
          disabled: false,
          callToCancel: 'Cancel',
          callToAction: 'Delete'
        }))
      }
    }
  }, [error, handleClose, data, modalSettings, loading]);

  return (
    <>
      {modalSettings.row && (
        <ModalTemplate
          {...modalProps}
        />
      )}
    </>
  );
}
