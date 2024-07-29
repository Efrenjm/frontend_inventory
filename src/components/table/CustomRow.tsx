'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { TableRow, TableBody, TableCell, IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { Player } from '@lordicon/react';

import { TableFields } from "@/components/table/tableTypes";
import trashIcon from '../../../public/icons/trash-bin.json';
import editIcon from '../../../public/icons/edit.json';

interface CustomRowProps {
  index: number;
  row: TableFields;
  modalHandler: (row: TableFields) => void;
}

export default function CustomRow({index, row, modalHandler}: CustomRowProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const trashRef = useRef<Player>(null);
  const editRef = useRef<Player>(null);

  const labelId = `enhanced-table-checkbox-${index}`;
  return (
    <TableRow
      key={row.id}
      hover
      onClick={() => {
        router.push(`/items/${row.id}`)
      }}
      sx={{cursor: 'pointer'}}
    >
      <TableCell align="left">
        {row.id}
      </TableCell>
      <TableCell align="left">
        {row.name}
      </TableCell>
      <TableCell align="center">
        {isMounted && (
          <>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/items/${row.id}`);
              }}
              onMouseEnter={() => editRef.current?.playFromBeginning()}
            >
              <Player
                ref={editRef}
                icon={editIcon}
              />
            </IconButton>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                modalHandler(row);
              }}
              onMouseEnter={() => trashRef.current?.playFromBeginning()}
            >
              <Player
                ref={trashRef}
                icon={trashIcon}
              />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
