import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.primary.main
  }
}));

const Footer: React.FC = () => {
  const classes = useStyles(theme);

  return (
    <Box component="footer" mt={'auto'} className={classes.footer}>
      <Typography variant="h6" align="center">Copyright 2020 - Maxim Kalinin</Typography>
    </Box>
  );
}

export default Footer;