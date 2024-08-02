'use client';
import Box from "@mui/material/Box";
import PopulatedTable from "./PopulatedTable";
import { useContext, useEffect } from "react";
import { TitleContext } from "@/components/layout/AppFrame";
import TableFrame from "@/components/table/TableFrame";
import Searching from "@/components/animations/Searching";

export default function App() {
  const {setTitle} = useContext(TitleContext);
  useEffect(() => {
    setTitle('Inventory overview');
  }, [setTitle]);

  return (
    <Box
      display="flex"
      justifyContent="center"
    >
      <PopulatedTable />
    </Box>
  );
}
