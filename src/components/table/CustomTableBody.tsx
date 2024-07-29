'use client';
import { TableRow, TableBody, TableCell, IconButton } from "@mui/material";

import { TableFields } from "@/components/table/tableTypes";


import CustomRow from "@/components/table/CustomRow";

interface TableBodyProps {
  rows: TableFields[],
  emptyRows: number,
  modalHandler: (row: TableFields) => void
}

export default function CustomTableBody({rows, emptyRows, modalHandler}: TableBodyProps) {
  return (
    <TableBody
      onEmptied={() => console.log('hola mundo')}
    >
      {rows.map((row, index) => (
        <CustomRow key={row.id} index={index} row={row} modalHandler={modalHandler}/>
      ))}
      {emptyRows > 0 && (
        <TableRow>
          <TableCell colSpan={6}/>
        </TableRow>
      )}
    </TableBody>
  )
}