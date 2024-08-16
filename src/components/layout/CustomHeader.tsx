'use client';
import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { title } from '@/theme';
import { TitleContext } from '@/components/layout/AppFrame';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

interface CustomHeaderProps {
  sx?: React.CSSProperties;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export default function CustomHeader({ sx, drawerWidth, handleDrawerToggle }: CustomHeaderProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {title: headerTitle} = useContext(TitleContext);

  return (
    <AppBar
      // position="fixed"
      sx={{
        height: '100px',
        background: '#f2f2f2',
        boxShadow: 'none',
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` }
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                sm: 'flex',
                md: 'none'
              }
            }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              display: { sm: 'flex', md: 'flex' },
              flexGrow: 1,
              // margin: 'auto',
              fontFamily: title.style.fontFamily,
              fontSize: {xs: '2.5rem', sm:'2.75rem', md:'3rem', lg:'3.25rem'},
              lineHeight: 1.2,
                //{xs: '1.8rem', sm: '2.5rem', md: '3rem'},
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            {headerTitle}
          </Typography>

          <Box
            sx={{
              // position: 'fixed',
              // right: 0,
              // top: 0,
              // padding: '10px'
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile picture" src="/profile.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}