'use client';
import CustomTable from "@/components/table/CustomTable";
import Box from "@mui/material/Box";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getItems } from "@/utils/http";
import { TableFields } from "@/components/table/tableTypes";

export default function PopulatedTable() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['items'],
    queryFn: ({signal}) => {
      return getItems({signal});
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



