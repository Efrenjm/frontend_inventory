import { ElementType, ReactNode } from 'react';
import { Paper, SxProps, Box } from "@mui/material";
import NavCardOptions from "@/components/Card/NavCardOptions";
import { LoadingButton } from "@mui/lab";
import { Save } from "@mui/icons-material";

interface BackgroundCardProps {
  children?: ReactNode;
  sx?: SxProps;
  deletable?: boolean;
  component: ElementType;
}
export default function BackgroundCard({children, sx, deletable, component}: BackgroundCardProps) {
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
        component={component}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: component==='form' ? 'center' : 'flex-start',
          rowGap: '60px',
          height: '90%',
          width: '90%',
          paddingBottom: '50px'
        }}
      >
        {children}
      </Box>
    </Paper>
  )
}
