import { ChangeEvent, ReactNode, useEffect } from 'react';
import {
  Box,
  Paper,
  TablePagination,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AnimatedIcon = dynamic(
  () => import('@/components/animations/AnimatedIcon'),
  { ssr: false }
);
const paginationFontSize = {xs: '1.25rem', md:'1.5rem', lg:'1.75rem'};

interface TableFrameProps {
  children: ReactNode;
  recordNumber?: number;
  page?: number;
  setPage?: (value: number) => void;
  rowsPerPage?: number;
  setRowsPerPage?: (value: number) => void;
  searchFilter?: string;
  setSearchFilter?: (value: string) => void;
}

export default function TableFrame({
  children,
  recordNumber,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  searchFilter,
  setSearchFilter
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

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (setPage) {
      setPage(0);
    }
    if (setSearchFilter) {
      setSearchFilter(event.target.value);
    }
  }

  const breakpoints = {
    xs: useMediaQuery((theme:any)=>theme.breakpoints.up('xs')),
    sm: useMediaQuery((theme:any)=>theme.breakpoints.up('sm')),
    md: useMediaQuery((theme:any)=>theme.breakpoints.up('md')),
    lg: useMediaQuery((theme:any)=>theme.breakpoints.up('lg')),
    xl: useMediaQuery((theme:any)=>theme.breakpoints.up('xl')),
  }
  let addIconSize = 36;
  let pagIconSize = 'small';
  let textFieldSize: "small" | "medium" = 'small';
  if (breakpoints.xl) {
    textFieldSize = 'small'
    pagIconSize = 'medium'
    addIconSize = 48;
  } else if (breakpoints.lg) {
    textFieldSize = 'small'
    pagIconSize = 'small'
    addIconSize = 48;
  } else if (breakpoints.md) {
    textFieldSize = 'small'
    pagIconSize = 'small'
    addIconSize = 48;
  } else if (breakpoints.sm) {
    textFieldSize = 'small'
    pagIconSize = 'small'
    addIconSize = 36;
  } else if (breakpoints.xs) {
    textFieldSize = 'small'
    pagIconSize = 'small'
    addIconSize = 32;
  }

  return (
    <Paper
      elevation={1}
      sx={{
        minHeight: {xs: '600px',sm: '610px', md:'680px'},
        height: '85vh',
        maxHeight: {xs: '975px', sm: '1000px', md: '1100px', lg: '1170px' },
        minWidth: '345px',
        width: 'auto',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '20px',
        marginX: {xs: 1, sm: 3, md: 5, lg: 8},
      }}
    >
      <Toolbar
        sx={{
          height: '6rem',
          width: '100%',
          flexShrink: 0,
          paddingX: {xs: 1, sm:2, md:3},
          bgcolor: 'primary.main',
          borderRadius: '20px 20px 0 0',
          fontPalette: 'primary.secondary',
          color: '#fff',
          gap: '10px',
        }}
      >
        <Typography
          fontSize={{xs: '1.5rem', sm:'1.75rem', md:'2rem', lg:'2.25rem'}}
          sx={{
            flex: '1 1 100%',
            paddingLeft: '10px',
          }}
          variant="h6"
          id="tableTitle"
          component="div"
          lineHeight={1}
        >
          Showing {recordNumber ? recordNumber : 0} items
        </Typography>
        <TextField
          id="filled-search"
          label="Search items"
          type="search"
          variant="filled"
          value={searchFilter}
          onChange={handleFilter}
          sx={{
            width: '100%',
            maxWidth: '300px',
            // height: '3rem',
            padding:0,
            bgcolor: '#fff',
            borderRadius: '50px',
            // ml: 4
          }}
          InputProps={{
            size: textFieldSize,
            sx: {
              paddingX: 2,
              backgroundColor: 'transparent',
            }
          }}
          InputLabelProps={{
            sx: {
              pl: 2,
              lineHeight:0.8,
            }
          }}
        />
        <AnimatedIcon
          icon={'add'}
          size={addIconSize}
          onClick={() => router.push('/newItem')}
        />
      </Toolbar>
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          overflowY: 'auto',
          height:'auto'
        }}
      >
      {children}
      </Box>
      {/* @ts-ignore */}
      <TablePagination
        rowsPerPageOptions={[
          {value: 10, label: <Typography fontSize={paginationFontSize}>10</Typography>},
          {value: 25, label: <Typography fontSize={paginationFontSize}>25</Typography>},
          {value: 50, label: <Typography fontSize={paginationFontSize}>50</Typography>}
        ]}
        component="div"
        count={recordNumber ? recordNumber : 0}
        rowsPerPage={rowsPerPage ? rowsPerPage : 10}
        page={page ? page : 0}
        onPageChange={(_event, newPage) => setPage ? setPage(newPage) : null}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          alignSelf: 'flex-end',
          minHeight: '60px',
          flexShrink: 0,
          width: '100%',
        }}
        labelDisplayedRows={({ from, to, count }) => (
          <Typography
            component='span'
            fontSize={paginationFontSize}>
            {`${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`}
          </Typography>
        )}
        labelRowsPerPage={
          <Typography
            component='span'
            variant='body1'
            fontSize={paginationFontSize}
          >
            Rows per page:
          </Typography>
        }
        slotProps={{
          select: {
            sx: {
              paddingRight: '10px',
              marginLeft: '0',
              marginRight: '5px',
              fontSize:paginationFontSize
            },
          },
          actions: {
            previousButton: { size: 'small', sx: { padding: 0 } },
            previousButtonIcon: { fontSize: pagIconSize },
            nextButton: { size: 'small', sx: { padding: 0 } },
            nextButtonIcon: { fontSize: pagIconSize },
          }
        }}
      />
    </Paper>
  )
}
