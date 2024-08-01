export type Order = 'asc' | 'desc';
export type SortableColumns = 'id' | 'name';
export type TableColumns = 'id' | 'name' | 'actions';

export interface Columns {
  id: TableColumns;
  label: string;
  align: "inherit" | "left" | "center" | "right" | "justify" | undefined;
  width: any;
}

export interface TableFields {
  id: number,
  name: string,
}

export interface ModalSettings {
  open: boolean;
  row?: TableFields;
}