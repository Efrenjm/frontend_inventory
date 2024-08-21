import { ChangeEvent, ReactNode, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
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
      const newId = event.target.value;
      const updatedFilterFields: FilterFields = {
        state: [],
        ...searchFilter,
        id: newId ?? "",
      };
      console.log("Search filter ID:" + updatedFilterFields?.id);

      setSearchFilter(updatedFilterFields);
    }
  };
  const handleNameFilter = (newName: string) => {
    if (setPage) {
      setPage(0);
    }
    if (setSearchFilter) {
      const updatedFilterFields: FilterFields = {
        state: [],
        ...searchFilter,
        name: newName ?? "",
      };
      console.log("Search filter Name:" + updatedFilterFields?.name);
      setSearchFilter(updatedFilterFields);
    }
  };
  const handleStateFilter = (states: string[]) => {
    if (setPage) {
      setPage(0);
    }
    if (setSearchFilter) {
      const updatedFilterFields: FilterFields = {
        ...searchFilter,
        state: states,
      };
      console.log("Search filter Name:" + updatedFilterFields?.state);
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
    <Grid
      display="grid"
      sx={{
        gridTemplateRows: { xs: "auto auto 1fr auto", md: "auto 1fr auto" },
        gridTemplateColumns: "3fr 9fr",
        justifyContent: "space-beetween",
        alignContent: "space-beetween",
        minHeight: { xs: "600px" },
        height: "70vh",
        maxHeight: { xs: "975px", sm: "1000px", md: "1100px", lg: "1170px" },
        minWidth: "345px",
        width: "auto",
        overflow: "hidden",
        borderRadius: "20px",
        marginX: { xs: 1, sm: 2, md: 3, lg: 5 },

        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      <Grid item gridColumn="span 2">
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
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-start"
        direction={{
          xs: "row",
          md: "column",
        }}
        item
        sx={{
          gridRow: { xs: "span 1", md: "span 2" },
          gridColumn: { xs: "span 2", md: "span 1" },
          bgcolor: "primary.main",
          p: 1,
        }}
        gap={2}
      >
        <TextField
          id="filled-search"
          label="Search by ID"
          type="search"
          size="small"
          variant="filled"
          value={searchFilter?.id}
          onChange={handleIdFilter}
          sx={{
            width: { xs: "15%", md: "100%" },
            minWidth: "180px",
            padding: 0,
            bgcolor: "#fff",
            borderRadius: "10px",
            // ml: 4
          }}
          InputProps={{
            size: textFieldSize,
            sx: {
              paddingX: 2,
              backgroundColor: "transparent",
              borderRadius: "15px",
            },
            endAdornment: false,
          }}
          InputLabelProps={{
            sx: {
              pl: 2,
              lineHeight: 0.8,
              overflow: "visible",
            },
          }}
        />

        <Autocomplete
          id="name-search"
          freeSolo
          options={Array.from(new Set(rows.map((item) => item.name)))}
          clearOnEscape={false}
          sx={{
            width: { md: "100%" },
            minWidth: "180px",
            paddingLeft: 0,
            bgcolor: "#fff",
            borderRadius: "10px",
            // ml: 4
          }}
          onInputChange={(event, newInputValue) => {
            handleNameFilter(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by name"
              value={searchFilter?.name}
              size="small"
              variant="filled"
              sx={{ paddingLeft: 2 }}
              InputProps={{
                ...params.InputProps,
                size: textFieldSize,
                sx: {
                  paddingLeft: 4,
                  backgroundColor: "transparent",
                },
              }}
              InputLabelProps={{
                sx: {
                  pl: 2,
                  lineHeight: 0.8,
                  overflow: "visible",
                },
              }}
            />
          )}
        />

        <Autocomplete
          id="states-filter"
          multiple
          options={Array.from(new Set(rows.map((item) => item.state)))}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            );
          }}
          sx={{
            width: { md: "100%" },
            minWidth: "200px",
            paddingLeft: 0,
            bgcolor: "#fff",
            borderRadius: "10px",
            // ml: 4
          }}
          onChange={(event, value) => {
            handleStateFilter(value);
          }}
          value={searchFilter?.state || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by state"
              size="small"
              variant="filled"
              sx={{ paddingLeft: 2 }}
              InputProps={{
                ...params.InputProps,
                size: textFieldSize,
                sx: {
                  paddingLeft: 4,
                  backgroundColor: "transparent",
                },
              }}
              InputLabelProps={{
                sx: {
                  pl: 2,
                  lineHeight: 0.8,
                  overflow: "visible",
                },
              }}
            />
          )}
        />
      </Grid>

      <Grid item overflow="auto" sx={{ gridColumn: { xs: "span 2", md: "span 1" } }}>
        {children}
      </Grid>

      <Grid
        item
        sx={{
          bgcolor: "background.paper",
          gridColumn: { xs: "span 2", md: "span 1" },
        }}
      >
        {/* <Grid item xs={12} md={9} flex="end" height={"5rem"}> */}
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
  );
}
