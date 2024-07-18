'use client';
import CustomTable from "@/components/table/CustomTable";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/utils/http";
import { TableFields } from "@/components/table/tableTypes";

export default function App() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['items', {state: undefined}],
    queryFn: ({signal, queryKey}) => {
      const params = queryKey[1] as Object;
      return getItems({signal, ...params});
    },
    staleTime: 5000,
  });

  let content= <></>;

  if (isPending) {
    content = <div>Loading...</div>
  }

  if (isError) {
    content = <div>
        <div>Error: {error.message}</div>
      </div>
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
    <>
      <Box
        display="flex"
        justifyContent="center"
      >
        {content}
      </Box>
    </>
  );
}



