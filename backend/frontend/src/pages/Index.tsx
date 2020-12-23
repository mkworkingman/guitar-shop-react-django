import React from 'react';
import theme from '../theme';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Catalogue from '../components/Catalogue';
import News from '../components/News';
import Info from '../components/Info';
import Discount from '../components/Discount';

const useStyles = makeStyles({
  paper: {
    padding: theme.spacing(1, 2),
  },
  news: {
    height: 296,
    overflow: 'auto'
  },
  item: {
    "&:nth-child(1)": {
      order: 1,
      [theme.breakpoints.down('xs')]: {
        order: 2
      }
    },
    "&:nth-child(2)": {
      order: 2,
      [theme.breakpoints.down('xs')]: {
        order: 1
      }
    },
    "&:nth-child(3)": {
      order: 3
    },
    "&:nth-child(4)": {
      order: 4
    }
  }
});

const Index: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>

      <Grid item className={classes.item} xs={12} sm={4}>
        <Paper className={classes.paper} elevation={3}>
          <Catalogue />
        </Paper>
      </Grid>

      <Grid item className={classes.item} xs={12} sm={8}>
        <Paper className={`${classes.news}`} elevation={3}>
          <News />
        </Paper>
      </Grid>

      <Grid item className={classes.item} xs={12}>
        <Paper className={classes.paper} elevation={3}>
          <Info />
        </Paper>
      </Grid>

      <Grid item className={classes.item} xs={12}>
        <Paper className={classes.paper} elevation={3}>
          <Discount />
        </Paper>
      </Grid>

    </Grid>
  );
}

export default Index;