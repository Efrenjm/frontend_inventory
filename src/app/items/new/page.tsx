import { Paper } from "@mui/material";

import ItemCard from "@/components/Card/ItemCard";


export default function NewItemPage() {
  return (
    <Paper
      component='div'
      sx={{width: '90%', alignItems: 'center', margin: 'auto', padding: '40px'}}
    >
      <ItemCard />
    </Paper>
  );
}