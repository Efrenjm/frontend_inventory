'use client';
import { useRouter } from "next/navigation";
import { IconButton, Box, Typography, Toolbar } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import dynamic from "next/dynamic";


const AnimatedIcon = dynamic(
  () => import('@/components/animations/AnimatedIcon'),
  { ssr: false }
);

interface NavCardOptionsProps {
  title?: string;
  deletable?: boolean;
}

export default function NavCardOptions({ deletable, title }: NavCardOptionsProps) {
  const router = useRouter();
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      }}
      >
        <AnimatedIcon
          icon='back'
          onClick={() => { router.push('/items') }}
          size={30}
        />
        {title && (
          <Typography variant='h4'>{title}</Typography>
        )}
        {deletable && (
          <IconButton
            size="medium"
          >
            <DeleteForever fontSize="large" color="warning" />
          </IconButton>
        )}
      </Box>
    </Toolbar>
  )
}