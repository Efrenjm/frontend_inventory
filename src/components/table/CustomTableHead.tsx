import { MouseEvent } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Box,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { Order, Columns, SortableColumns } from "./tableTypes";
import { title } from "@/theme";

const columns: readonly Columns[] = [
  {
    id: "id",
    label: "Id",
    align: "left",
    width: "50px",
  },
  {
    id: "name",
    label: "Item",
    align: "left",
    width: "auto",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
    width: "auto",
  },
  {
    id: "actions",
    label: "Actions",
    align: "center",
    width: { xs: "100px", sm: "150px", lg: "200px" },
  },
];

const headerFontSize = { xs: "1rem", sm: "1.25rem", md: "1.35rem", lg: "1.5rem" };

interface TableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: SortableColumns) => void;
  order: Order;
  orderBy: string;
}

export default function CustomTableHead({ order, orderBy, onRequestSort }: TableHeadProps) {
  const createSortHandler = (property: SortableColumns) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const upSmallView = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  return (
    <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
      <TableRow>
        {columns.map(({ id, label, align, width }) => {
          if (!upSmallView && id === "description") {
            return;
          }
          return (
            <TableCell
              key={id}
              align={align}
              sortDirection={orderBy === id ? order : false}
              sx={{
                bgcolor: "primary.dark",
                color: "primary.contrastText",
                width: width,
                borderBottom: "3px solid #C89B3C",
              }}
            >
              {id === "actions" ? (
                <Typography
                  style={{
                    cursor: "default",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                  }}
                  fontFamily={title.style.fontFamily}
                  fontSize={headerFontSize}
                  fontWeight={700}
                  color="primary.contrastText"
                  textTransform="uppercase"
                >
                  {label}
                </Typography>
              ) : (
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : "asc"}
                  onClick={createSortHandler(id)}
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      color: "#F0E6D2 !important",
                    },
                  }}
                >
                  <Typography
                    fontFamily={title.style.fontFamily}
                    fontSize={headerFontSize}
                    fontWeight={700}
                    color="primary.contrastText"
                    textTransform="uppercase"
                  >
                    {label}
                  </Typography>
                  {orderBy === id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
