'use client';
import { useState, useEffect, useMemo, MouseEvent } from "react";
import { TableContainer, Table } from "@mui/material";

import { ModalSettings, Order, SortableColumns, TableFields } from "@/components/table/tableTypes";
import CustomTableHead from "@/components/table/CustomTableHead";
import CustomTableBody from "@/components/table/CustomTableBody";
import DeleteModal from "@/components/modal/DeleteModal";
import { stableSort, getComparator } from "@/utils/dataManipulation";
import TableFrame from "@/components/table/TableFrame";

interface CustomTableProps {
  rows: TableFields[];
}

export default function CustomTable({ rows }: CustomTableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortableColumns>('id');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [modalSettings, setModalSettings] = useState<ModalSettings>({ open: false });

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


  useEffect(() => {
    if (page > 0 && filteredRows.length <= page * rowsPerPage) {
      setPage(prev => Math.max(0, prev - 1));
    }
  }, [filteredRows, page, rowsPerPage]);

  const visibleRows = useMemo(
    () => {
      return stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
    },
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const modalHandler = (row: TableFields) => {
    setModalSettings({ row, open: true });
  }

  return (
    <>
      {modalSettings.open && <DeleteModal modalSettings={modalSettings} setModalSettings={setModalSettings} />}

      <TableFrame
        recordNumber={filteredRows.length}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      >
        <TableContainer
          sx={{
            flex: '1 1 auto',
            overflow: 'auto',
            maxHeight: '760px'
          }}
        >
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
              isEmpty={filteredRows.length === 0}
            />
          </Table>
        </TableContainer>
      </TableFrame>
    </>
  );
}