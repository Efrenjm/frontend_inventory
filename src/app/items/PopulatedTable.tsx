'use client';
import CustomTable from "@/components/table/CustomTable";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import { TableFields } from "@/components/table/tableTypes";
import TableFrame from "@/components/table/TableFrame";
import { getAllItems } from "@/utils/queries";
import dynamic from "next/dynamic";

const Searching = dynamic(() => import('@/components/animations/Searching'), {ssr: false})

export default function PopulatedTable() {

  const { data, loading, error } = useQuery(getAllItems);

  let content = <></>;

  if (loading || (error && error.message !== "Not found")) {
    content = (
      <TableFrame>
        <Box
          width="100%"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center'
          }}
        >
          <Searching error={!!error}/>
        </Box>
      </TableFrame>
    )
  }


  if (error?.message === "Not found") {
    content = (
      <CustomTable rows={[]} />
    )
  }


  if (data && data.getAllItems) {
    const rows: TableFields[] = data.getAllItems.map((item) => {
      try {
        return {
          id: parseInt(item?.id!),
          name: item?.name!
        };
      } catch (e) {
        return null;
      }
    }).filter((item) => !!item);
    content = <CustomTable rows={rows} />
  }

  return (<>{content}</>)
}
