'use client';
import { useRouter } from "next/navigation";
import { IconButton, Box, Typography } from "@mui/material";
import { ArrowBack, DeleteForever } from "@mui/icons-material";

interface NavCardOptionsProps {
  title?: string;
  deletable?: boolean;
}

export default function NavCardOptions({deletable, title}: NavCardOptionsProps) {
  const router = useRouter();
  return (
    <Box style={{marginBottom: '40px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <IconButton
        size="medium"
        onClick={() => {
          router.push('/items')
        }}
      >
        <ArrowBack fontSize="large"/>
      </IconButton>
      {title && (
        <Typography variant='h4' >{title}</Typography>
      )}
      {deletable && (
        <IconButton
          size="medium"
        >
          <DeleteForever fontSize="large" color="warning"/>
        </IconButton>
      )}
    </Box>
  )
}