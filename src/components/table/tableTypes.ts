export type Order = 'asc' | 'desc';
export type TableColumns = 'id' | 'name' | 'actions';

export interface Columns {
  id: TableColumns;
  label: string;
  align: "inherit" | "left" | "center" | "right" | "justify" | undefined;
  width: string;
}

export interface TableFields {
  id: number,
  name: string,
  actions: string
}

export interface ModalSettings {
  open: boolean;
  row?: TableFields;
}