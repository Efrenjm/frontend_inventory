import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import { Order, TableColumns, Columns } from "./tableTypes";


const columns: readonly Columns[] = [
  {
    id: 'id',
    label: 'Id',
    align: 'left',
    width: '20%'
  },
  {
    id: 'name',
    label: 'Item',
    align: 'left',
    width: '60%'
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
    width: '20%'
  }
];

interface TableHeadProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: TableColumns) => void;
  order: Order;
  orderBy: string;
}

export default function CustomTableHead({order, orderBy, onRequestSort}: TableHeadProps) {

  const createSortHandler =
    (property: TableColumns) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns.map(({id, label, align, width}) => (
          <TableCell
            key={id}
            width={width}
            align={align}
            sortDirection={orderBy === id ? order : false}
          >
            {id === 'actions' ? (
              <p style={{cursor: 'default', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none'}}>
                {label}
              </p>
            ) : (
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
              >
                {label}
                {orderBy === id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}