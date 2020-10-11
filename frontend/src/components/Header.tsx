import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, Badge, AppBar, Toolbar, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
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

interface ILogin {
  login: string
  password: string
}

interface IRegister {
  username: string,
  email: string,
  password: string,
  password2: string
}


const Header: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialoge, setOpenDialoge] = useState<boolean | string>(false);
  const [login, setLogin] = useState<ILogin>({
    login: '',
    password: ''
  })
  const [register, setRegister] = useState<IRegister>({
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialoge = (e: React.MouseEvent<HTMLButtonElement>)=> {
    setOpenDialoge(e.currentTarget.name);
  };

  const handleCloseDialoge = () => {
    setOpenDialoge(false);
  };

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.currentTarget.name]: e.currentTarget.value
    })
  };

  const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...register,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

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
      <Button color="inherit" name="login" onClick={handleOpenDialoge}>Login</Button>
      <Button color="inherit" name="register" onClick={handleOpenDialoge}>Register</Button>
      <IconButton color="inherit" name="cart" onClick={handleOpenDialoge}>
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

      <Dialog open={openDialoge === 'login'} onClose={handleCloseDialoge} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="login"
            label="Login"
            fullWidth
            value={login.login}
            onChange={handleLogin}
            multiline
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={login.password}
            onChange={handleLogin}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialoge} color="primary">
            Log In
          </Button>
          <Button onClick={handleCloseDialoge} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialoge === 'register'} onClose={handleCloseDialoge} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            fullWidth
            value={register.username}
            onChange={handleRegister}
            multiline
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={register.email}
            onChange={handleRegister}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={register.password}
            onChange={handleRegister}
          />
          <TextField
            margin="dense"
            name="password2"
            label="Confirm Password"
            type="password"
            fullWidth
            value={register.password2}
            onChange={handleRegister}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialoge} color="primary">
            Register
          </Button>
          <Button onClick={handleCloseDialoge} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialoge === 'cart'} onClose={handleCloseDialoge} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialoge} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialoge} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Header;