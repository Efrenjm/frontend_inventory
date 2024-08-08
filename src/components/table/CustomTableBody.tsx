'use client';
import { TableRow, TableBody, TableCell, Typography } from "@mui/material";

import { TableFields } from "@/components/table/tableTypes";
import CustomRow from "@/components/table/CustomRow";
import dynamic from 'next/dynamic';

const NotFound = dynamic(
  ()=>import('@/components/animations/NotFound'),
  {ssr:false}
);

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

export default function CustomTableBody({ rows, emptyRows, modalHandler, isEmpty }: TableBodyProps) {
  return (
    <TableBody>
      {!isEmpty ? (
        <>
          {rows.map((row) => (
            <CustomRow
              key={row.id}
              row={row}
              modalHandler={modalHandler}
            />
          ))}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </>
      ) : (
        <TableRow>
          <TableCell colSpan={3} align="center">
             <NotFound title="No items found" message="Click on the plus sign button to create a new one" />
          </TableCell>
        </TableRow>
      )}

    </TableBody>
  )
}