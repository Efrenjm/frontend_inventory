'use client';
import { useState, useMemo, MouseEvent, ChangeEvent } from "react";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TablePagination,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Tooltip, InputAdornment
} from "@mui/material";
import { AddCircleOutlined, Search } from "@mui/icons-material";

import { Item } from "@/utils/types"
import { ModalSettings } from "./tableTypes";
import { Order, TableColumns, TableFields } from "./tableTypes";

import CustomTableHead from "@/components/table/CustomTableHead";
import CustomTableBody from "@/components/table/CustomTableBody";
import CustomModal from "@/components/modal/CustomModal";
import { getItems } from "@/utils/http";
import { stableSort, getComparator } from "@/utils/dataManipulation";
import Icon from "@mui/material/Icon";

const data: Item[] = getItems();

const rows: TableFields[] = data.map((item) => {
  return {
    id: item.id,
    name: item.name,
    address: item.location && item.location.address ? item.location.address : "dummy",
    actions: ""
  }
});

export default function CustomTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<TableColumns>('name');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [modalSettings, setModalSettings] = useState<ModalSettings>({open: false});

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: TableColumns,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows: TableFields[] = rows.filter((row) => {
    return searchFilter === '' || row.name.toLowerCase().includes(searchFilter.toLowerCase())
  });

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPage(0);
    setSearchFilter(event.target.value);
  }

  const visibleRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const modalHandler = (row: TableFields) => {
    setModalSettings({row, open: true});
  }
  return (
    <>
      <CustomModal modalSettings={modalSettings} setModalSettings={setModalSettings}/>
      <Box sx={{width: '90%', minWidth: '360px'}}>
        <Paper elevation={12} sx={{width: '100%', mb: 2, overflow: 'hidden'}}>
          <Toolbar
            sx={{
              height: '100px',
              pl: {sm: 2},
              pr: {xs: 1, sm: 1},
            }}
          >
            <Typography
              sx={{flex: '1 1 100%'}}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Showing {filteredRows.length} items
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
              // InputProps={{
              //   startAdornment: <InputAdornment position="start"><Icon><Search/></Icon></InputAdornment>,
              // }}
            />
            <Tooltip title="Add a new item">
              <IconButton>
                <AddCircleOutlined/>
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer sx={{height: 425}}>
            <Table
              // sx={{ minWidth: 300 }}
              aria-labelledby="tableTitle"
              stickyHeader
            >
              <CustomTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <CustomTableBody
                rows={visibleRows}
                emptyRows={emptyRows}
                modalHandler={modalHandler}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}