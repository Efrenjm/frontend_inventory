import { MouseEvent } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel, Box, useMediaQuery, Typography } from "@mui/material";
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
    id: 'description',
    label: 'Description',
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

const headerFontSize = {xs: '1.25rem', sm:'1.5rem', md:'1.75rem', lg:'2rem'};

interface TableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: SortableColumns) => void;
  order: Order;
  orderBy: string;
}

export default function CustomTableHead({ order, orderBy, onRequestSort }: TableHeadProps) {

  const createSortHandler = (property: SortableColumns) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
  };

  const upSmallView= useMediaQuery((theme:any)=>theme.breakpoints.up('sm'));
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ id, label, align, width }) => {
          if(!upSmallView && id === 'description') {
            return
          }
          return (
            <TableCell
              key={id}
              align={align}
              sortDirection={orderBy === id ? order : false}
              sx={{
                width: width
              }}
            >
              {id === 'actions' ? (
                <Typography
                  style={{ cursor: 'default', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}
                  fontSize={headerFontSize}
                >
                  {label}
                </Typography>
              ) : (
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : 'asc'}
                  onClick={createSortHandler(id)}
                >
                  <Typography
                    fontSize={headerFontSize}
                  >
                  {label}
                  </Typography>
                  {orderBy === id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  );
}