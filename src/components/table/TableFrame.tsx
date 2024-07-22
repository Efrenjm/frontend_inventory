import { ChangeEvent, ReactNode } from 'react';
import {
  IconButton,
  Paper,
  TablePagination,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { AddCircleOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";


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
        minWidth: '360px',
        width: '90%',
        mb: 2,
        overflow: 'hidden',
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:'20px',
        paddingX: '60px'
      }}
    >
      <Toolbar
        sx={{
          height: '100px',
          pl: {sm: 2},
          pr: {xs: 1, sm: 1},
          width: '100%',
        }}
      >
        <Typography
          sx={{flex: '1 1 100%'}}
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
          sx={{width: '75%', maxWidth: '300px'}}
        />
        <Tooltip title="Add a new item">
          <IconButton onClick={() => router.push('/newItem')}>
            <AddCircleOutlined/>
          </IconButton>
        </Tooltip>
      </Toolbar>
      {children}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={recordNumber ? recordNumber : 0}
        rowsPerPage={rowsPerPage ? rowsPerPage : 5}
        page={page ? page : 0}
        onPageChange={(_event, newPage) => setPage ? setPage(newPage) : null}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{alignSelf:'flex-end'}}
      />
    </Paper>
  )
}
