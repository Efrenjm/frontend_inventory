import { ReactNode } from 'react';
import { Paper, SxProps, Box } from "@mui/material";
import NavCardOptions from "@/components/Card/NavCardOptions";

interface BackgroundCardProps {
  children: ReactNode;
  sx?: SxProps;
  deletable?: boolean;
}
export default function BackgroundCard({children, sx, deletable}: BackgroundCardProps) {
  return (
    <Paper
      component='div'
      sx={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        padding: '40px',
        minHeight: '700px',
        height: '50vh',
        borderRadius: '20px',
        ...sx
      }}
    >
      <NavCardOptions deletable={deletable}/>
      <Box
        component="div"
        height="90%"
      >
        {children}
      </Box>
    </Paper>
  )
}
