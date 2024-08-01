'use client';
import { useRouter } from "next/navigation";
import { TableRow, TableCell } from "@mui/material";

import { TableFields } from "@/components/table/tableTypes";
import dynamic from "next/dynamic";

const AnimatedIcon = dynamic(
  () => import('@/components/animations/AnimatedIcon'),
  { ssr: false }
);

interface CustomRowProps {
  index: number;
  row: TableFields;
  modalHandler: (row: TableFields) => void;
}

export default function CustomRow({index, row, modalHandler}: CustomRowProps) {
  const router = useRouter();
  // const labelId = `enhanced-table-checkbox-${index}`;
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
        <AnimatedIcon
          icon='edit'
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/items/${row.id}?edit=true`);
          }}
        />
        <AnimatedIcon
          icon='delete'
          onClick={(event) => {
            event.stopPropagation();
            modalHandler(row);
          }}
        />
      </TableCell>
    </TableRow>
  );
}
