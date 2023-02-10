import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import logo from '../../../assets/congreso_logo.png'

const Navbar = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (    
    <Box sx={{ flexGrow: 1 }}>      
      <AppBar sx={{ backgroundColor:'var(--color-bg)' }} position="static">
        <Toolbar>     
          <Box
            component={'img'}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height:'50px' }}
            alt={'Congreso de colombia'}
            src={logo}
          />              
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Motor de leyes
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar