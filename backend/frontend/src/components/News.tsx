import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  newsImage: {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/img1.jpg'})`,
    backgroundPositionX: '20%',
    height: '100%'
  }
});

const News: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.newsImage}>
      <Typography variant="h5">
        News
      </Typography>
    </Box>
  )
}

export default News;