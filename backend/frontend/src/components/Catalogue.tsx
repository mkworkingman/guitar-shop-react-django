import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles({
  itemList: {
    padding: theme.spacing(0.5, 0)
  },
  itemTitle: {
    fontWeight: 500,
    height: '30px',
    padding: 0,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  }
});

interface CatalogueLink {
  url: string;
  text: string;
}

const links: CatalogueLink[] = [
  { url: 'classic', text: 'Classic' },
  { url: 'acoustic', text: 'Acoustic' },
  { url: 'electric', text: 'Electric' },
  { url: 'electroacoustic', text: 'Electro Acoustic' },
  { url: 'bass', text: 'Bass' },
  { url: 'acousticbass', text: 'Acoustic Bass' },
  { url: 'ukulele', text: 'Ukulele' },
  { url: 'balalaika', text: 'Balalaika' }
];

const linksLen = links.length;

const Catalogue: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" align="center">
        Catalogue:
      </Typography>
      
      <List component="div" className={classes.itemList}>
        {links.map((link, i) => <ListItem key={link.url} className={classes.itemTitle} button divider={i !== linksLen - 1} component={Link} to={`/category/${link.url}`}>
          <ListItemText primary={link.text} />
        </ListItem>)}
      </List>
    </div>
  );
}

export default Catalogue;
