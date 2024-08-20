import { ChangeEvent, ReactNode, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  TablePagination,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FilterFields } from "@/utils/types";
import { TableFields } from "./tableTypes";

const AnimatedIcon = dynamic(() => import("@/components/animations/AnimatedIcon"), { ssr: false });
const paginationFontSize = { xs: "1.25rem", md: "1.5rem", lg: "1.75rem" };

interface TableFrameProps {
  children: ReactNode;
  recordNumber?: number;
  rows: TableFields[];
  page?: number;
  setPage?: (value: number) => void;
  rowsPerPage?: number;
  setRowsPerPage?: (value: number) => void;
  searchFilter?: FilterFields;
  setSearchFilter?: (value: FilterFields) => void;
}

export default function TableFrame({
  children,
  recordNumber,
  page,
  rows = [],
  setPage,
  rowsPerPage,
  setRowsPerPage,
  searchFilter,
  setSearchFilter,
}: TableFrameProps) {
  const router = useRouter();

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    if (setRowsPerPage) {
      setRowsPerPage(parseInt(event.target.value, 10));
    }
    if (setPage) {
      setPage(0);
    }
  };

  const handleIdFilter = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (setPage) {
      setPage(0);
    }

    if (setSearchFilter) {
      const newId = parseInt(event.target.value, 10);
      const updatedFilterFields: FilterFields = {
        state: [],
        ...searchFilter,
        id: isNaN(newId) ? undefined : newId,
      };
      setSearchFilter(updatedFilterFields);
    }
  };
  const handleNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (setPage) {
      setPage(0);
    }

    if (setSearchFilter) {
      const newName = event.target.value;
      const updatedFilterFields: FilterFields = {
        state: [],
        ...searchFilter,
        name: newName ? "" : newName,
      };
      setSearchFilter(updatedFilterFields);
    }
  };

  const breakpoints = {
    xs: useMediaQuery((theme: any) => theme.breakpoints.up("xs")),
    sm: useMediaQuery((theme: any) => theme.breakpoints.up("sm")),
    md: useMediaQuery((theme: any) => theme.breakpoints.up("md")),
    lg: useMediaQuery((theme: any) => theme.breakpoints.up("lg")),
    xl: useMediaQuery((theme: any) => theme.breakpoints.up("xl")),
  };
  let addIconSize = 36;
  let pagIconSize = "small";
  let textFieldSize: "small" | "medium" = "small";
  if (breakpoints.xl) {
    textFieldSize = "small";
    pagIconSize = "medium";
    addIconSize = 48;
  } else if (breakpoints.lg) {
    textFieldSize = "small";
    pagIconSize = "small";
    addIconSize = 48;
  } else if (breakpoints.md) {
    textFieldSize = "small";
    pagIconSize = "small";
    addIconSize = 48;
  } else if (breakpoints.sm) {
    textFieldSize = "small";
    pagIconSize = "small";
    addIconSize = 36;
  } else if (breakpoints.xs) {
    textFieldSize = "small";
    pagIconSize = "small";
    addIconSize = 32;
  }

  return (
    <Paper
      elevation={1}
      sx={{
        minHeight: { xs: "600px", sm: "610px", md: "680px" },
        height: "85vh",
        maxHeight: { xs: "975px", sm: "1000px", md: "1100px", lg: "1170px" },
        minWidth: "345px",
        width: "auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "20px",
        marginX: { xs: 1, sm: 2, md: 3, lg: 5 },
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          height: "auto",
        }}
      >
        <Grid item xs={12}>
          <Toolbar
            sx={{
              height: "4rem",
              width: "100%",
              flexShrink: 0,
              paddingX: { xs: 1, sm: 2, md: 3 },
              bgcolor: "primary.main",
              borderRadius: "20px 20px 0 0",
              fontPalette: "primary.secondary",
              color: "#fff",
              gap: "10px",
            }}
          >
            <Typography
              fontSize={{ xs: "1.5rem", sm: "1.75rem", md: "2rem", lg: "2.25rem" }}
              sx={{
                flex: "1 1 100%",
                paddingLeft: "10px",
              }}
              variant="h6"
              id="tableTitle"
              component="div"
              lineHeight={1}
            >
              Showing {recordNumber ? recordNumber : 0} items
            </Typography>

            <AnimatedIcon icon={"add"} size={addIconSize} onClick={() => router.push("/newItem")} />
          </Toolbar>
        </Grid>
        <Grid item xs={12} md={3} gridRow="span 2" sx={{ bgcolor: "primary.main", p: 1 }}>
          <TextField
            id="filled-search"
            label="Search by ID"
            type="search"
            size="small"
            variant="filled"
            value={searchFilter?.id}
            onChange={handleIdFilter}
            sx={{
              width: "16em",
              maxWidth: "300px",
              // height: '3rem',
              padding: 0,
              bgcolor: "#fff",
              borderRadius: "50px",
              // ml: 4
            }}
            InputProps={{
              size: textFieldSize,
              sx: {
                paddingX: 2,
                backgroundColor: "transparent",
              },
            }}
            InputLabelProps={{
              sx: {
                pl: 2,
                lineHeight: 0.8,
              },
            }}
          />

          <Autocomplete
            id="name-search"
            freeSolo
            options={rows.map((item) => item.name)}
            sx={{
              width: "16em",
              maxWidth: "300px",
              // height: '3rem',

              bgcolor: "#fff",
              borderRadius: "50px",
              // ml: 4
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by name"
                onChange={handleNameFilter}
                value={searchFilter?.name}
                size="small"
                variant="filled"
                InputProps={{
                  ...params.InputProps,
                  size: textFieldSize,
                  type: "search",
                  sx: {
                    paddingLeft: 8,

                    backgroundColor: "transparent",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    pl: 2,
                    lineHeight: 0.8,
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            overflowY: "auto",
            maxHeight: {
              xs: "calc(100vh - 330px)",
              md: "calc(100vh - 250px)",
            },
          }}
        >
          {children}
        </Grid>
        <Grid item md={3} sx={{ display: { sx: "none" }, bgcolor: "primary.main" }}></Grid>

        <Grid item xs={12} md={9} flex="end" height={"5rem"}>
          {/* @ts-ignore */}
          <TablePagination
            rowsPerPageOptions={[
              { value: 10, label: <Typography fontSize={paginationFontSize}>10</Typography> },
              { value: 25, label: <Typography fontSize={paginationFontSize}>25</Typography> },
              { value: 50, label: <Typography fontSize={paginationFontSize}>50</Typography> },
            ]}
            component="div"
            count={recordNumber ? recordNumber : 0}
            rowsPerPage={rowsPerPage ? rowsPerPage : 10}
            page={page ? page : 0}
            onPageChange={(_event, newPage) => (setPage ? setPage(newPage) : null)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              minHeight: "60px",
              flexShrink: 0,
              width: "100%",
            }}
            labelDisplayedRows={({ from, to, count }) => (
              <Typography component="span" fontSize={paginationFontSize}>
                {`${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`}
              </Typography>
            )}
            labelRowsPerPage={
              <Typography component="span" variant="body1" fontSize={paginationFontSize}>
                Rows per page:
              </Typography>
            }
            slotProps={{
              select: {
                sx: {
                  paddingRight: "10px",
                  marginLeft: "0",
                  marginRight: "5px",
                  fontSize: paginationFontSize,
                },
              },
              actions: {
                previousButton: { size: "small", sx: { padding: 0 } },
                previousButtonIcon: { fontSize: pagIconSize },
                nextButton: { size: "small", sx: { padding: 0 } },
                nextButtonIcon: { fontSize: pagIconSize },
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
