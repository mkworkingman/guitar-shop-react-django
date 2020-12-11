import React, { useState, useEffect } from 'react';
import { Button, IconButton, Menu, MenuItem, Badge, AppBar, Toolbar, Typography, Dialog, Box, DialogContentText, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { gql, useMutation, useApolloClient, useQuery } from '@apollo/client';

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
      display: 'flex',
      alignItems: 'center'
    }
  },
  appbar: {
    display: 'block',
    zIndex: 20
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
  password: string,
  errors: {
    login: null | string[],
    password: null | string[]
  }
}

interface IRegister {
  username: string,
  email: string,
  password: string,
  password2: string,
  errors: {
    username: null | string[],
    email: null | string[],
    password: null | string[],
    password2: null | string[],
  }
}

const Header: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialoge, setOpenDialoge] = useState<boolean | string>(false);
  const [login, setLogin] = useState<ILogin>({
    login: '',
    password: '',
    errors: {
      login: null,
      password: null
    }
  });
  const [register, setRegister] = useState<IRegister>({
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {
      username: null,
      email: null,
      password: null,
      password2: null,
    }
  });

  const client = useApolloClient();

  const IS_LOGGED_IN = gql`
    query unauthAdded {
      unauthAdded @client
    }
  `;

  const {data: {unauthAdded}} = useQuery<any>(IS_LOGGED_IN);

  const CURRENT_USER = gql`{
    currentUser {
      id,
      username,
      email,
      added
    }
  }`;

  const { loading: loadingCurrentUser, data: currentUser } = useQuery(CURRENT_USER);

  useEffect(() => {
    setOpenDialoge(false);
  }, [currentUser])

  const LOGIN_USER = gql`
    mutation loginUser($login: String!, $password: String!){
      loginUser(login: $login, password: $password){
        token,
        errors
      }
    }
  `;

  const [logged, {loading, data}] = useMutation(LOGIN_USER);

  const REGISTER_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!, $password2: String!){
      createUser(username: $username, email: $email, password: $password, password2: $password2){
        errors
      }
    }
  `;

  const [registered, {loading: registerLoading, data: registerData}] = useMutation(REGISTER_USER);

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin({
      ...login,
      [e.currentTarget.name]: e.currentTarget.value
    })
  };

  const handleRegister = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRegister({
      ...register,
      [e.currentTarget.name]: e.currentTarget.value
    })
  };

  const tryAuth = () => {
    if (openDialoge === 'login') {
      logged({ 
        variables: { 
          login: login.login,
          password: login.password
        },
        update: (cache, {data}) => {
          if (data.loginUser.token) {
            jwt.verify(data.loginUser.token, "myTestKey!noiceone", (err: any, decoded: any) => {
              if (err) {
                console.log(err);
              } else {
                cache.writeQuery({
                  query: CURRENT_USER,
                  data: {currentUser: {id: decoded.id, username: decoded.username, email: decoded.email, added: decoded.added}}
                });
              }
            });
          }
        }
      });
    } else {
      registered({ 
        variables: { 
          username: register.username,
          email: register.email,
          password: register.password,
          password2: register.password2
        }
      });
    }
  }

  const logout = () => {
    setAnchorEl(null)
    localStorage.removeItem('auth_token');
    client.writeQuery({
      query: CURRENT_USER,
      data: {currentUser: null}
    });
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      tryAuth();
    }
  }

  useEffect(() => {
    if (data) {
      if (data.loginUser.errors) {
        setLogin({
          ...login,
          errors: data.loginUser.errors
        });
      } else {
        setLogin({
          login: '',
          password: '',
          errors: {
            login: null,
            password: null
          }
        });

        jwt.verify(data.loginUser.token, "myTestKey!noiceone", (err: any) => {
          if (err) {
            console.log(err);
          } else {
            localStorage.setItem('auth_token', data.loginUser.token);
          }
        });
      }
    }
  }, [data])

  useEffect(() => {
    if (registerData) {
      if (registerData.createUser.errors) {
        setRegister({
          ...register,
          errors: registerData.createUser.errors
        });
      } else {
        setRegister({
          username: '',
          email: '',
          password: '',
          password2: '',
          errors: {
            username: null,
            email: null,
            password: null,
            password2: null,
          }
        });
        setOpenDialoge('login');
      }
    }
  }, [registerData]);

  const badgeValue: number = !loadingCurrentUser ? (currentUser && currentUser.currentUser
    ? Object.values(JSON.parse(currentUser.currentUser.added)).reduce<any>((a: any, b: any) => a + b, 0)
    : Object.values(unauthAdded).reduce<any>((a: any, b: any) => a + b, 0)
  ) : 0

  const navbarButtonsMobile: JSX.Element = (
    <div className={classes.mobileView}>
      {loadingCurrentUser
        ? <CircularProgress color="secondary" />
        : <IconButton
          color="inherit"
          onClick={e => setAnchorEl(e.currentTarget)}
        >
          <MenuOpenRoundedIcon />
        </IconButton>
      }
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        keepMounted
        style={{zIndex: 9999}}
      >
        <div>
          {!loadingCurrentUser &&
            (currentUser.currentUser
              ? <MenuItem onClick={logout}>Logout</MenuItem>
              : <>
              <MenuItem onClick={() => {
                setOpenDialoge('login')
                setAnchorEl(null)
              }}>
                Login
              </MenuItem>
              <MenuItem onClick={() => {
                setOpenDialoge('register')
                setAnchorEl(null)
              }}>
                Register
              </MenuItem>
              </>)
          }
          <MenuItem key="cart" onClick={() => {
            setOpenDialoge('cart')
            setAnchorEl(null)
          }}>
            <Badge badgeContent={badgeValue} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
  
  const navbarButtons: JSX.Element = (
    <div className={classes.view}>
      {!loadingCurrentUser ?
        currentUser.currentUser ?
          <>
            <Typography>Hello, {currentUser.currentUser.username}!</Typography>
            <Button color="inherit" name="login" onClick={logout}>Logout</Button>
          </> :
          <>
            <Button color="inherit" onClick={() => setOpenDialoge('login')}>Login</Button>
            <Button color="inherit" onClick={() => setOpenDialoge('register')}>Register</Button>
          </> :
        <CircularProgress color="secondary" />
      }

      <IconButton color="inherit" name="cart" onClick={() => setOpenDialoge('cart')}>
        <Badge
          badgeContent={badgeValue}
          color="secondary">
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

      <Dialog open={openDialoge === 'login'} onClose={() => setOpenDialoge(false)} fullWidth={true} maxWidth="xs" aria-labelledby="form-dialog-title">
        <Box
          display={loading || registerLoading ? "block" : "none"}
          width="100%"
          height="100%"
          position="absolute"
          bgcolor="secondary.light"
          zIndex={2}>
        </Box>
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="login"
            label="Login"
            fullWidth
            value={login.login}
            onKeyDown={onKeyDown}
            onChange={handleLogin}
            multiline
            error={!!login.errors.login && login.errors.login.length > 0}
          />
          {login.errors.login && login.errors.login.map((error, i) => 
            <DialogContentText key={i} color="error" variant="subtitle2" >{error}</DialogContentText>
          )}
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={login.password}
            onKeyDown={onKeyDown}
            onChange={handleLogin}
            error={!!login.errors.password && login.errors.password.length > 0}
          />
          {login.errors.password && login.errors.password.map((error, i) => 
            <DialogContentText key={i} color="error" variant="subtitle2" >{error}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setOpenDialoge('register')} color="primary" disabled={loading}>
            Register Now
          </Button>
          <Button size="small" onClick={tryAuth} color="primary" disabled={loading}>
            Log In
          </Button>
          <Button size="small" onClick={() => setOpenDialoge(false)} color="primary" disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialoge === 'register'} onClose={() => setOpenDialoge(false)} fullWidth={true} maxWidth="xs" aria-labelledby="form-dialog-title">
        <Box
          display={loading || registerLoading ? "block" : "none"}
          width="100%"
          height="100%"
          position="absolute"
          bgcolor="secondary.light"
          zIndex={2}>
        </Box>
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            fullWidth
            value={register.username}
            onChange={handleRegister}
            onKeyDown={onKeyDown}
            multiline
            error={!!register.errors.username && register.errors.username.length > 0}
          />
          {register.errors.username && register.errors.username.map((error, i) => 
            <DialogContentText key={i} color="error" variant="subtitle2" >{error}</DialogContentText>
          )}
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={register.email}
            onChange={handleRegister}
            onKeyDown={onKeyDown}
            multiline
            error={!!register.errors.email && register.errors.email.length > 0}
          />
          {register.errors.email && register.errors.email.map((error, i) => 
            <DialogContentText key={i} color="error" variant="subtitle2" >{error}</DialogContentText>
          )}
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={register.password}
            onChange={handleRegister}
            onKeyDown={onKeyDown}
            error={!!register.errors.password && register.errors.password.length > 0}
          />
          {register.errors.password && register.errors.password.map((error, i) => 
            <DialogContentText key={i} color="error" variant="subtitle2" >{error}</DialogContentText>
          )}
          <TextField
            margin="dense"
            name="password2"
            label="Confirm Password"
            type="password"
            fullWidth
            value={register.password2}
            onChange={handleRegister}
            onKeyDown={onKeyDown}
            error={!!register.errors.password2 && register.errors.password2.length > 0}
          />
          {register.errors.password2 && register.errors.password2.map((error, i) => 
            <DialogContentText key={i} color="error" variant="subtitle2" >{error}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setOpenDialoge('login')} color="primary" disabled={registerLoading}>
            Log In Now
          </Button>
          <Button size="small" onClick={tryAuth} color="primary" disabled={registerLoading}>
            Register
          </Button>
          <Button size="small" onClick={() => setOpenDialoge(false)} color="primary" disabled={registerLoading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialoge === 'cart'} onClose={() => setOpenDialoge(false)} aria-labelledby="form-dialog-title">
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
          <Button onClick={() => setOpenDialoge(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpenDialoge(false)} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Header;