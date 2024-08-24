"use client";
import { TableRow, TableBody, TableCell, Typography, useMediaQuery } from "@mui/material";

import { TableFields } from "@/components/table/tableTypes";
import CustomRow from "@/components/table/CustomRow";
import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("@/components/animations/NotFound"), { ssr: false });

const LoopedAnimation = dynamic(() => import("@/components/animations/LoopedAnimation"), {
  ssr: false,
});

interface TableBodyProps {
  rows: TableFields[];
  emptyRows: number;
  modalHandler: (row: TableFields) => void;
  isEmpty: boolean;
}

export default function CustomTableBody({
  rows,
  emptyRows,
  modalHandler,
  isEmpty,
}: TableBodyProps) {
  const breakpoints = {
    xs: useMediaQuery((theme: any) => theme.breakpoints.up("xs")),
    sm: useMediaQuery((theme: any) => theme.breakpoints.up("sm")),
    md: useMediaQuery((theme: any) => theme.breakpoints.up("md")),
    lg: useMediaQuery((theme: any) => theme.breakpoints.up("lg")),
    xl: useMediaQuery((theme: any) => theme.breakpoints.up("xl")),
  };
  let colspan = 4;
  let iconSize = 180;
  if (breakpoints.lg) {
    iconSize = 180;
  } else if (breakpoints.md) {
    iconSize = 160;
  } else if (breakpoints.sm) {
    iconSize = 140;
    colspan = 4;
  } else if (breakpoints.xs) {
    iconSize = 120;
    colspan = 3;
  }

  return (
    <TableBody>
      {!isEmpty ? (
        <>
          {rows.map((row) => (
            <CustomRow key={row.id} row={row} modalHandler={modalHandler} />
          ))}
          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={colspan} />
            </TableRow>
          )}
        </>
      ) : (
        <TableRow>
          <TableCell colSpan={colspan} align="center" sx={{ border: "none" }}>
            <NotFound
              title="No items found"
              message="Click on the plus sign button to create a new one"
              size={iconSize}
            />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
