'use client';
import { useState, useMemo, MouseEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  TableContainer,
  Table, Alert, AlertTitle
} from "@mui/material";

import { ModalSettings, Order, SortableColumns, TableColumns, TableFields } from "@/components/table/tableTypes";
import CustomTableHead from "@/components/table/CustomTableHead";
import CustomTableBody from "@/components/table/CustomTableBody";
import DeleteModal from "@/components/modal/DeleteModal";
import { stableSort, getComparator } from "@/utils/dataManipulation";
import TableFrame from "@/components/table/TableFrame";

interface CustomTableProps {
  rows: TableFields[];
}

export default function CustomTable({rows}: CustomTableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortableColumns>('id');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [modalSettings, setModalSettings] = useState<ModalSettings>({open: false});

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: SortableColumns,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
      {modalSettings.open && <DeleteModal modalSettings={modalSettings} setModalSettings={setModalSettings}/>}

      <TableFrame
        recordNumber={filteredRows.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      >
        <TableContainer >
          <Table
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
      </TableFrame>
    </>
  );
}