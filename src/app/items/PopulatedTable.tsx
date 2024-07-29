'use client';
import CustomTable from "@/components/table/CustomTable";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import { TableFields } from "@/components/table/tableTypes";
import TableFrame from "@/components/table/TableFrame";
import { Skeleton } from "@mui/material";
import { getAllItems } from "@/utils/queries";

export default function PopulatedTable() {

  const {data, loading, error} = useQuery(getAllItems);

  let content = <></>;

  if (loading) {
    content = (
      <TableFrame>
        <Box width="100%">
          {Array(5).map((key) => (
            <Skeleton key={key} animation="wave" sx={{margin: '5px', height: '80px'}} variant="rectangular"/>)
          )}
        </Box>
      </TableFrame>
    )
  }
  if (error) {
    if (error.cause && error.cause.message === "Not found") {
      content = (
        <CustomTable rows={[]} />
        // <TableFrame>
        //   <h3>No items found</h3>
        // </TableFrame>
      )
    } else {
      content = (
        <TableFrame>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>Ups... Something went wrong</h3>
            <p>Please try again later</p>
          </div>
        </TableFrame>
      )
    }
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
    content = <CustomTable rows={rows}/>
  }

  return <>{content}</>;
}



