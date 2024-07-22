import { ElementType, ReactNode } from 'react';
import { Paper, SxProps, Box } from "@mui/material";
import NavCardOptions from "@/components/Card/NavCardOptions";

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
        minHeight: '700px',
        // height: '70vh',
        minWidth: '360px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        padding: '40px',
        borderRadius: '20px',
        overflow: 'hidden',
        ...sx
      }}
    >
      <NavCardOptions deletable={deletable}/>
      <Box
        component={component}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: component === 'form' ? 'center' : 'flex-start',
          rowGap: '60px',
          minHeight: '90%',
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
