'use client';
import { useState, createContext } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CustomHeader from '@/components/layout/CustomHeader'
import CustomSidebar from "@/components/layout/CustomSidebar";
import { SnackbarProvider } from 'notistack';
import { body } from '@/theme';

const drawerWidth = 80;

export const TitleContext = createContext({title: "", setTitle: (value: string) => {}});

interface AppFrameProps {
  children: React.ReactNode;
}

export default function AppFrame({ children }: AppFrameProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [title, setTitle] = useState('');

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
    <SnackbarProvider
      maxSnack={3}
      style={{ fontFamily: body.style.fontFamily, fontSize: 22 }}
    >
      <TitleContext.Provider value={{ title, setTitle }}>
        <Box sx={{ display: 'flex' }}>
          <CustomHeader
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <CustomSidebar
            drawerWidth={drawerWidth}
            mobileOpen={mobileOpen}
            handleDrawerClose={handleDrawerClose}
            handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </TitleContext.Provider>
    </SnackbarProvider>
  );
}
