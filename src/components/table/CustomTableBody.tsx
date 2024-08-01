'use client';
import { TableRow, TableBody, TableCell, IconButton, Typography } from "@mui/material";

import { TableFields } from "@/components/table/tableTypes";


import CustomRow from "@/components/table/CustomRow";
import dynamic from 'next/dynamic';

const LoopedAnimation = dynamic(
  () => import('@/components/animations/LoopedAnimation'),
  { ssr: false }
);

interface TableBodyProps {
  rows: TableFields[];
  emptyRows: number;
  modalHandler: (row: TableFields) => void;
  isEmpty: boolean;
}

export default function CustomTableBody({rows, emptyRows, modalHandler, isEmpty}: TableBodyProps) {
  return (
    <TableBody
      // sx={{
      //   height: '50vh'
      // }}
    >
      {!isEmpty ? (
        <>
          {rows.map((row, index) => (
            <CustomRow
              key={row.id}
              index={index}
              row={row}
              modalHandler={modalHandler}
            />
          ))}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={3}/>
            </TableRow>
          )}
        </>
      ) : (
        <TableRow>
          <TableCell colSpan={3} align="center">
            <LoopedAnimation
              icon='warning'
              size={100}
              sx={{
                display:'flex',
                justifyContent:'center',
              }}
            />
            <Typography variant='h6'>
              No items found
            </Typography>
          </TableCell>
        </TableRow>
      )}

    </TableBody>
  )
}