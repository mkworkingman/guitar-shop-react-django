import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, Badge, AppBar, Toolbar, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  mobileView: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  view: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  appbar: {
    display: 'block'
  },
  toolbar: {
    maxWidth: '950px',
    margin: '0 auto'
  },
  wide: {
    flexGrow: 1
  },
  logo: {
    color: '#ffffff',
    textDecoration: 'none'
  }
});

const Header: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navbarButtonsMobile: JSX.Element = (
    <div className={classes.mobileView}>
      <IconButton
        color="inherit"
        onClick={handleClick}
      >
        <MenuOpenRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
      >
        <div>
          <MenuItem key="login" onClick={handleClose}>
            Login
          </MenuItem>
          <MenuItem key="register" onClick={handleClose}>
            Register
          </MenuItem>
          <MenuItem key="cart" onClick={handleClose}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
  
  const navbarButtons: JSX.Element = (
    <div className={classes.view}>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Register</Button>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </div>
  );

  return (
    <AppBar position="fixed" className={classes.appbar} >
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logo}>
          <Typography variant="h6">
            Music Shop
          </Typography>
        </Link>
        <div className={classes.wide}></div>
        {navbarButtonsMobile}
        {navbarButtons}
      </Toolbar>
    </AppBar>
  );
}

export default Header;