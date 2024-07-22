'use client';
import { IconButton } from "@mui/material";
import { ArrowBack, DeleteForever } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface NavCardOptionsProps {
  deletable?: boolean;
}

export default function NavCardOptions({deletable}: NavCardOptionsProps) {
  const router = useRouter();
  return (
    <div style={{marginBottom: '40px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <IconButton
        size="medium"
        onClick={() => {
          router.push('/items')
        }}
      >
        <ArrowBack fontSize="large"/>
      </IconButton>
      {deletable && (
        <IconButton
          size="medium"
        >
          <DeleteForever fontSize="large" color="warning"/>
        </IconButton>
      )}
    </div>
  )
}