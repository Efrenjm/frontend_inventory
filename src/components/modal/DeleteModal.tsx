'use client';
import { useState, Dispatch, SetStateAction, useCallback } from 'react';

import { ModalSettings } from "@/components/table/tableTypes";
import ModalTemplate, { CustomModalProps } from "@/components/modal/ModalTemplate";
import { useMutation } from '@apollo/client';
import { deleteItem, getAllItems } from "@/utils/queries";
import { useSnackbar } from 'notistack';

interface DeleteModalProps {
  modalSettings: ModalSettings;
  setModalSettings: Dispatch<SetStateAction<ModalSettings>>;
}

export default function DeleteModal({ setModalSettings, modalSettings }: DeleteModalProps) {
  const [deleteMutation, { data, loading, error }] = useMutation(deleteItem, {
    refetchQueries: [
      { query: getAllItems }
    ],
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleClose = useCallback(() => {
    setModalSettings({ open: false });
  }, [setModalSettings]);

  const handleDelete = (id: number) => {
    setModalSettings({ open: false });
    deleteMutation({
      variables: { id: id.toString() },
      onError: (_error) => {
        enqueueSnackbar('An error occurred. Please try again later.', { variant: 'error' });
      },
      onCompleted: (_data, options) => {
        enqueueSnackbar(`Item with id ${options?.variables?.id} deleted successfully.`, { variant: 'success' });
      }
    });
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
