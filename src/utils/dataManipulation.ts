// import {Order} from "@/components/table/tableTypes";

import { FormValues, Item } from "@/utils/types";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function generateFormValues(item: Item | undefined): FormValues {
  return {
    id: item?.id?.toString().trim() ?? "",
    name: item?.name.trim() ?? "",
    description: item?.description?.trim() ?? "",
    location: {
      id: item?.location?.id?.toString().trim() ?? "",
      state: item?.location?.state?.trim() ?? "",
      phoneNumber: item?.location?.phoneNumber?.toString()?.trim() ?? "",
      address: item?.location?.address?.trim() ?? ""
    }
  }
}