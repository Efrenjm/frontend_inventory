'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import CustomHeader from '@/components/layout/CustomHeader'
import CustomSidebar from "@/components/layout/CustomSidebar";

const drawerWidth = 240;


interface AppFrameProps {
  children: React.ReactNode;
}

export default function AppFrame({children}: AppFrameProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{display: 'flex'}}>
      <CustomHeader drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}/>
      <CustomSidebar
        width={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />
      <Box
        component="main"
        sx={{flexGrow: 1, p: 3, width: {md: `calc(100% - ${drawerWidth}px)`}}}
      >
        <Toolbar/>
        {children}
      </Box>
    </Box>
  );
}
