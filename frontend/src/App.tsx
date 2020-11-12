import React from 'react';
import { Box, Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from './theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from "./pages/Index";
import InfoText from "./pages/InfoText";
import Category from './pages/Category';

import { gql, useQuery } from '@apollo/client';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.light,
  },
  offset: theme.mixins.toolbar
});

const App: React.FC = () => {
  const classes = useStyles();

  const CURRENT_USER = gql`{
    currentUser {
      id,
      username,
      email
    }
  }`;

  useQuery(CURRENT_USER);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>

          <Header />
          <div className={classes.offset} />

          <Box my={2} component={Container} maxWidth="950px !important">

            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/category/:name" component={Category} />
              <Route exact path="/info/:text" component={InfoText} />
              <Route path="/" render={() => <Redirect to="/" />} />
            </Switch>
            
          </Box>

          <Footer />

        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
