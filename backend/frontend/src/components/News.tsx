import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles({
  newsImage: {
    backgroundImage: `url(${process.env.PUBLIC_URL + 'uploads/news/img1.jpg'})`,
    backgroundPositionX: '20%',
    height: '100%'
  },
  title: {
    margin: theme.spacing(1, 2),
    position: 'absolute'
  }
});

const News: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.newsImage}>
      <Typography className={classes.title} variant="h5">
        News:
      </Typography>
    </Box>
  )
}

export default News;