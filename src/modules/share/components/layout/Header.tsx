'use client';

import { signOut } from 'next-auth/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useTheme } from '@mui/material';

const Header = ({ user }: { user?: any }) => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            THPT Hùng Vương
          </Typography>
          {user ? (
            <>
              <Typography>{user?.email}</Typography>
              <Button color="inherit" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/sign_in">
              <Typography color="error">Login</Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
