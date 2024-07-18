'use client';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import { Order, TableColumns, TableFields } from "@/components/table/tableTypes";
import { Item } from "./tableTypes";
// import CustomTableRow from "@/components/table/CustomTableRow";
import { useRouter } from "next/navigation";

interface TableBodyProps {
  rows: TableFields[],
  emptyRows: number,
  modalHandler: (row: TableFields) => void
}

export default function CustomTableBody({rows, emptyRows, modalHandler}: TableBodyProps) {
  const router = useRouter();


  return (
    <TableBody>
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
                  //modalHandler &&
                  modalHandler(row);
                }}
              >
                <DeleteIcon/>
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