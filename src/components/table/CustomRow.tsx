"use client";
import { useRouter } from "next/navigation";
import { TableRow, TableCell, useMediaQuery, Typography } from "@mui/material";

import { TableFields } from "@/components/table/tableTypes";
import dynamic from "next/dynamic";

const AnimatedIcon = dynamic(() => import("@/components/animations/AnimatedIcon"), { ssr: false });

interface CustomRowProps {
  row: TableFields;
  modalHandler: (row: TableFields) => void;
}

export default function CustomRow({ row, modalHandler }: CustomRowProps) {
  const router = useRouter();

  const breakpoints = {
    xs: useMediaQuery((theme: any) => theme.breakpoints.up("xs")),
    sm: useMediaQuery((theme: any) => theme.breakpoints.up("sm")),
    md: useMediaQuery((theme: any) => theme.breakpoints.up("md")),
    lg: useMediaQuery((theme: any) => theme.breakpoints.up("lg")),
    xl: useMediaQuery((theme: any) => theme.breakpoints.up("xl")),
  };
  let iconSize = 32;
  if (breakpoints.lg) {
    iconSize = 32;
  } else if (breakpoints.md) {
    iconSize = 28;
  } else if (breakpoints.sm) {
    iconSize = 28;
  } else if (breakpoints.xs) {
    iconSize = 24;
  }

  return (
    <TableRow
      key={row.id}
      hover
      onClick={() => {
        router.push(`/items/${row.id}`);
      }}
      sx={{
        cursor: "pointer",
        alignItems: "center",
      }}
      data-testid={`custom-row-${row.id}`}
    >
      <TableCell align="center" size="small" sx={{ p: 1 }}>
        <Typography
          color="primary.contrastText"
          fontSize={{ xs: "1rem", sm: "1.25rem", md: "1.5rem", lg: "1.5rem" }}
        >
          {row.id}
        </Typography>
      </TableCell>
      <TableCell align="left" size="small" sx={{ p: 1 }}>
        <Typography
          color="primary.contrastText"
          fontSize={{ xs: "1rem", sm: "1.25rem", md: "1.5rem", lg: "1.5rem" }}
          lineHeight={0.8}
        >
          {row.name}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        size="small"
        sx={{
          display: { xs: "none", sm: "table-cell" },
          p: 1,
        }}
      >
        <Typography
          color="primary.contrastText"
          fontSize={{ xs: "1rem", sm: "1.25rem", md: "1.35rem", lg: "1.5rem" }}
          lineHeight={1}
        >
          {row.description}
        </Typography>
      </TableCell>
      <TableCell size="small" align="center" sx={{ p: 1 }}>
        <AnimatedIcon
          icon="edit"
          size={iconSize}
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/items/${row.id}?edit=true`);
          }}
        />
        <AnimatedIcon
          icon="delete"
          size={iconSize}
          onClick={(event) => {
            event.stopPropagation();
            modalHandler(row);
          }}
        />
      </TableCell>
    </TableRow>
  );
}
