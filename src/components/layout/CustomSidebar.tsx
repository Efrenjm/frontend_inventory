import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

interface CustomSidebarProps {
  width: number;
}

export default function CustomSidebar({width}: CustomSidebarProps) {
  if (!width) {
    width = 240;
  }
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

  const drawer = (
    <div>
      <Toolbar/>
      <Divider/>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{width: {md: drawerWidth}, flexShrink: {md: 0}}}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
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
