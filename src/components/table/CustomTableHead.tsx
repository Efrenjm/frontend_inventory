import { MouseEvent } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { Order, Columns, SortableColumns } from "./tableTypes";


const columns: readonly Columns[] = [
  {
    id: 'id',
    label: 'Id',
    align: 'left',
    width: '50px'
  },
  {
    id: 'name',
    label: 'Item',
    align: 'left',
    width: 'auto'
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
    width: { xs: '100px', sm: '150px', lg: '200px' }
  }
];

interface TableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: SortableColumns) => void;
  order: Order;
  orderBy: string;
}

export default function CustomTableHead({ order, orderBy, onRequestSort }: TableHeadProps) {

  const createSortHandler =
    (property: SortableColumns) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns.map(({ id, label, align, width }) => (
          <TableCell
            key={id}
            align={align}
            sortDirection={orderBy === id ? order : false}
            sx={{
              width: width
            }}
          >
            {id === 'actions' ? (
              <p style={{ cursor: 'default', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}>
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