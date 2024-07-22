'use client';
import { useRouter } from "next/navigation";
import { TableRow, TableBody, TableCell, IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";

import { TableFields } from "@/components/table/tableTypes";

interface TableBodyProps {
  rows: TableFields[],
  emptyRows: number,
  modalHandler: (row: TableFields) => void
}

export default function CustomTableBody({rows, emptyRows, modalHandler}: TableBodyProps) {
  const router = useRouter();

  return (
    <TableBody onEmptied={()=>console.log('hola mundo')}>
      {rows.map((row, index) => {
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
              <IconButton
                color="warning"
                onClick={(event) => {
                  event.stopPropagation();
                  modalHandler(row);
                }}
              >
                <DeleteForever/>
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow>
          <TableCell colSpan={6}/>
        </TableRow>
      )}
    </TableBody>
  )
}