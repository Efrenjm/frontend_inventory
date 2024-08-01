import { ChangeEvent, ReactNode } from 'react';
import {
  Paper,
  TablePagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AnimatedIcon = dynamic(
  () => import('@/components/animations/AnimatedIcon'),
  { ssr: false }
);


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

  return (
    <Paper
      elevation={1}
      sx={{
        minHeight: '600px',
        height: '85vh',
        maxHeight: '960px',
        minWidth: '360px',
        width: '100%',
        mb: 2,
        overflow: 'hidden',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: '20px',
        paddingX: {xs:'0px', sm:'30px', md:'60px'}
      }}
    >
      <Toolbar
        sx={{
          minHeight: '120px',
          height: '120px',
          maxHeight: '120px',
          pl: {xs: 1, sm: 2},
          pr: {xs: 1, sm: 1},
          width: '100%',
        }}
      >
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: {xs: '1.7rem',sm:'2.2rem', md:'2.5rem'},
            paddingLeft: '10px',
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Showing {recordNumber ? recordNumber : 0} items
        </Typography>
        <TextField
          id="filled-search"
          label="Search items"
          type="search"
          variant="filled"
          size="small"
          value={searchFilter}
          onChange={handleFilter}
          sx={{
            width: '75%',
            maxWidth: '300px',
            // paddingY: '0',
            // fontSize: '1.2rem',
          }}
          InputProps={{
            sx: {
              fontSize: '1.5rem',

            }
          }}
        />
        <Tooltip title="Add a new item">
          <AnimatedIcon
            icon={'add'}
            size={36}
            onClick={() => router.push('/newItem')}
          />
        </Tooltip>
      </Toolbar>
        {children}

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={recordNumber ? recordNumber : 0}
        rowsPerPage={rowsPerPage ? rowsPerPage : 10}
        page={page ? page : 0}
        onPageChange={(_event, newPage) => setPage ? setPage(newPage) : null}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          alignSelf: 'flex-end',
          minHeight: '60px',
        }}
        slotProps={{
          select: {
            sx: {
              paddingRight: '10px',
              marginLeft: '0',
              marginRight: '5px',
            }
          },
          actions: {
            previousButton: {size: 'small', sx:{padding:0}},
            previousButtonIcon: {fontSize: 'small'},
            nextButton: {size: 'small', sx:{padding:0}},
            nextButtonIcon: {fontSize: 'small'},
          }
        }}
      />
    </Paper>
  )
}
