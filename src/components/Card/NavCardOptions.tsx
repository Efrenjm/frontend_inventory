'use client';
import { useRouter } from "next/navigation";
import { Box, Typography, Toolbar, SxProps } from "@mui/material";
import dynamic from "next/dynamic";


const AnimatedIcon = dynamic(
  () => import('@/components/animations/AnimatedIcon'),
  { ssr: false }
);

interface NavCardOptionsProps {
  title?: string;
  deletable?: boolean;
  sx: SxProps;
}

export default function NavCardOptions({ deletable, title, sx }: NavCardOptionsProps) {
  const router = useRouter();
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        ...sx
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
      </Box>
    </Toolbar>
  )
}