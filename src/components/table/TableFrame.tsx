import { ChangeEvent, ReactNode, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  ListItem,
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
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";
import { title } from "@/theme";

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

  const handleFilterChange = (field: keyof FilterFields, value: string | string[]) => {
    if (setPage) setPage(0);
    if (setSearchFilter) {
      setSearchFilter({ state: [], ...searchFilter, [field]: value });
      console.log(`Search filter ${field}:`, value);
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
  const fontSizes = { xs: "1rem", sm: "1.25rem", md: "1.25rem", lg: "1.5rem" };
  const commonInputProps = {
    sx: {
      paddingX: 1,
      backgroundColor: "transparent",
      height: { xs: "2.5rem", sm: "3rem", md: "3.5rem", lg: "auto" },
      color: "primary.contrastText",
    },
  };
  const inputLabelProps = {
    pl: 0,
    lineHeight: 0.8,
    overflow: "visible",
    fontSize: fontSizes,
    color: "primary.contrastText",
    '&[data-shrink="true"]': {
      color: "rgba(240, 230, 210,0.7)", //primary.contrastText
    },
  };
  return (
    <Grid
      display="grid"
      height="75vh"
      sx={{
        gridTemplateRows: { xs: "auto auto 1fr auto", md: "auto 1fr auto" },
        gridTemplateColumns: { xs: "3fr minmax(0, 9fr)", lg: "300px 1fr" },
        justifyContent: "space-beetween",
        alignContent: "space-beetween",
        minHeight: { xs: "600px" },
        //height: "70vh",
        maxHeight: { xs: "975px", sm: "1000px", md: "1100px", lg: "1170px" },
        minWidth: "345px",
        width: "auto",
        overflow: "hidden",
        borderRadius: "20px",
        marginX: { xs: 1, sm: 2, md: 3, lg: 5 },
        boxShadow: "0px 4px 10px rgba( 10, 200, 185, 0.3)",
        bgcolor: "primary.dark",
      }}
    >
      <Grid item gridColumn="span 2">
        <Toolbar
          sx={{
            height: "4rem",
            width: "100%",
            flexShrink: 1,
            paddingX: { xs: 1, sm: 2, md: 3 },
            bgcolor: "primary.dark",
            borderRadius: "20px 20px 0 0",
            fontPalette: "primary.secondary",
            color: "#fff",
            gap: "10px",
          }}
        >
          <Typography
            fontSize={{ xs: "1.5rem", sm: "1.75rem", md: "2rem", lg: "2.25rem" }}
            fontFamily={title.style.fontFamily}
            fontWeight="700"
            color="primary.contrastText"
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
          bgcolor: "primary.dark",
          p: { xs: 1, md: 2 },
        }}
        gap={2}
      >
        <TextField
          id="filled-search"
          label="Filter by ID"
          size="small"
          type="number"
          variant="filled"
          value={searchFilter?.id}
          onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
          onChange={(event) => {
            handleFilterChange("id", event.target.value);
          }}
          sx={{
            width: { xs: "15%", md: "100%" },
            minWidth: "180px",
            padding: 0,
            bgcolor: "primary.dark",
            border: "3px solid ",
            borderImage: "linear-gradient(#C89B3C, #785A28) 1",
            "& .MuiAutocomplete-clearIndicator": { color: "primary.light" },
            "& .MuiAutocomplete-clearIndicator:hover": { color: "red" },
          }}
          InputProps={{
            ...commonInputProps,
            size: textFieldSize,
            endAdornment: (
              <>
                {searchFilter?.id !== "" && (
                  <IconButton
                    onClick={() => handleFilterChange("id", "")}
                    sx={{ color: "primary.light" }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </>
            ),
          }}
          InputLabelProps={{
            sx: inputLabelProps,
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
            bgcolor: "primary.dark",
            // ml: 4
            "& .MuiAutocomplete-clearIndicator": { color: "primary.light" },
            "& .MuiAutocomplete-clearIndicator:hover": { color: "red" },
          }}
          slotProps={{
            paper: {
              sx: {
                bgcolor: "primary.dark",
                color: "primary.light",
                "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
                  bgcolor: "#091428",
                },
              },
            },
          }}
          onInputChange={(event, newInputValue) => {
            handleFilterChange("name", newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by name"
              value={searchFilter?.name}
              variant="filled"
              sx={{
                paddingLeft: 1,
                border: "3px solid ",
                borderImage: "linear-gradient(#C89B3C, #785A28) 1",
              }}
              InputProps={{
                ...params.InputProps,
                size: textFieldSize,
                ...commonInputProps,
              }}
              InputLabelProps={{
                sx: inputLabelProps,
              }}
            />
          )}
        />

        <Autocomplete
          id="states-filter"
          multiple
          options={Array.from(new Set(rows.map((item) => item.state)))}
          disableCloseOnSelect
          size="small"
          getOptionLabel={(option) => option}
          sx={{
            width: { md: "100%" },
            minWidth: "200px",
            paddingLeft: 0,
            fontSize: "5",
            bgcolor: "primary.dark",
            color: "primmary.contrastText",
            // ml: 4
            "& .MuiAutocomplete-clearIndicator": { color: "primary.light" },
            "& .MuiAutocomplete-clearIndicator:hover": { color: "red" },
            "& .MuiAutocomplete-popupIndicator": { color: "primary.light" },
          }}
          //for the list item
          slotProps={{
            paper: {
              sx: {
                "& .MuiAutocomplete-listbox": {
                  "& .MuiAutocomplete-option[aria-selected='true']": {
                    bgcolor: "#0A323C",
                    "&.Mui-focused": {
                      bgcolor: "#005A82",
                    },
                  },
                },
                "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
                  bgcolor: "#091428",
                },
              },
            },
          }}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <ListItem
                key={key}
                {...optionProps}
                sx={{
                  fontSize: fontSizes,
                  bgcolor: "primary.dark",
                  color: "primary.light",
                }}
              >
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                  sx={{
                    color: "primary.light",
                    "&.Mui-checked": {
                      color: "primary.light",
                    },
                    "&.MuiCheckbox-indeterminate": {
                      color: "primary.light",
                    },
                  }}
                />

                {option}
              </ListItem>
            );
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="filled"
                label={option}
                {...getTagProps({ index })}
                sx={{
                  backgroundColor: "#1E282D",
                  color: "primary.light",
                  "& .MuiChip-deleteIcon": {
                    color: "primary.light", // Esto sobrescribirá el estilo predeterminado
                  },
                  "& .MuiChip-deleteIcon:hover": {
                    color: "red", // Esto cambiará el color cuando se haga hover
                  },
                }}
              />
            ))
          }
          onChange={(event, value) => {
            handleFilterChange("state", value);
          }}
          value={searchFilter?.state || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by state"
              size="small"
              variant="filled"
              sx={{
                paddingLeft: 0,
                border: "3px solid ",
                borderImage: "linear-gradient(#C89B3C, #785A28) 1",
              }}
              InputProps={{
                ...params.InputProps,

                size: textFieldSize,
                sx: { ...commonInputProps.sx, height: "auto" },
              }}
              InputLabelProps={{
                sx: inputLabelProps,
              }}
            />
          )}
        />
      </Grid>

      <Grid
        item
        bgcolor="primary.dark"
        overflow="auto"
        sx={{ gridColumn: { xs: "span 2", md: "span 1" } }}
      >
        {children}
      </Grid>

      <Grid
        item
        bgcolor="primary.dark"
        color="primary.contrastText"
        borderTop="3px solid #C89B3C"
        sx={{
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
            color: "primary.contrastText",
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
