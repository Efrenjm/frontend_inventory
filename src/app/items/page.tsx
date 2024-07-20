'use client';
import CustomTable from "@/app/items/CustomTable";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/utils/http";
import { TableFields } from "@/components/table/tableTypes";
import TableFrame from "@/components/table/TableFrame";
import { Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function App() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: ({signal}) => {
      return getItems({signal});
    },
    staleTime: 5000,
  });

  let content= <></>;

  if (isPending) {
    content =(
      <TableFrame>
        <Box width="100%" >
          {[1, 2, 3, 4, 5].map((key)=>(
            <Skeleton key={key} animation="wave" sx={{margin:'5px', height:'80px'}} variant="rectangular"/>)
          )}
        </Box>
      </TableFrame>
    )
  }
  if (isError) {
    if(error.cause === 404) {
      content = (
        <TableFrame>
          <h3>No items found</h3>
        </TableFrame>
      )
    } else {
      content = (
        <TableFrame>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h3>Ups... Something went wrong</h3>
            <p>Please try again later</p>
          </div>
        </TableFrame>
      )
    }
  }

  if (data) {
    const rows: TableFields[] = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        address: item.location && item.location.address ? item.location.address : "dummy",
        actions: ""
      }
    });
    content = <CustomTable rows={rows}/>
  }
  return (
      <Box
        display="flex"
        justifyContent="center"
      >
        {content}
      </Box>
  );
}



