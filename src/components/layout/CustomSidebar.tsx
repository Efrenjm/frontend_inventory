// import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { iconMapper } from '@/components/animations/AnimatedIcon';

const AnimatedIcon = dynamic(
  () => import('@/components/animations/AnimatedIcon'),
  { ssr: false }
);


interface CustomSidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

export default function CustomSidebar({drawerWidth, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose}: CustomSidebarProps) {
  if (!drawerWidth) {
    drawerWidth = 80;
  }

  const drawer = (
    <div>
      <Toolbar/>
      <List>
        {['home', 'document', 'bookmarks', 'barChart', 'clock', 'location', 'money'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton>
              <AnimatedIcon icon={text as keyof (typeof iconMapper)} size={36} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: {md: drawerWidth},
        height: '100vh',
        flexShrink: {md: 0}
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        PaperProps={{
          sx:{bgcolor:'primary.main'}
        }}
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {sm: 'block', md: 'none'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
      >
        {drawer}
        <Typography
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '10px'
          }}
          variant='caption'><a href="https://lordicon.com/">Icons by Lordicon.com</a></Typography>
      </Drawer>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx:{bgcolor:'primary.main'}
        }}
        sx={{
          display: {xs: 'none', md: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
        }}
        open
      >
        {drawer}
        <Typography
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '10px'
          }}
          variant='caption'><a href="https://lordicon.com/">Icons by Lordicon.com</a></Typography>
      </Drawer>
    </Box>
  );
}
