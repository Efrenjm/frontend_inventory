export type Order = 'asc' | 'desc';
export type SortableColumns = 'id' | 'name' | 'description';
export type TableColumns = 'id' | 'name' | 'description' | 'actions';

export interface Columns {
  id: TableColumns;
  label: string;
  align: "inherit" | "left" | "center" | "right" | "justify" | undefined;
  width: any;
}

export interface TableFields {
  id: number,
  name: string,
  description: string,
}

export interface ModalSettings {
  open: boolean;
  row?: TableFields;
}