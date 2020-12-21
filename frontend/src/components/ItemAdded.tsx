import React from 'react';
import { Card, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles({
  card: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  imgWrapper: {
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 80,
      height: 80,
    }
  },
  img: {
    width: 'auto',
    height: '100%',
    maxHeight: 100,
    [theme.breakpoints.down('sm')]: {
      maxHeight: 80,
    }
  },
  itemName: {
    flex: 1,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    }
  },
  amount: {
    width: 100,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 80,
    }
  },
  price: {
    flex: 1,
    textAlign: 'center'
  }
});

const ItemAdded: React.FC<any> = ({item, amount}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.flex}>
        <div className={classes.imgWrapper}>
          <CardMedia
            className={classes.img}
            image={item.image
              ? 'http://127.0.0.1:8000/' + item.image
              : 'http://127.0.0.1:8000/uploads/no_image/not_found.png'}
            component='img'
          />
        </div>
        <Typography className={classes.itemName}>{item.name}</Typography>
      </div>
      <div className={classes.flex}>
        <Typography className={classes.amount}>x{amount}</Typography>
        <Typography className={classes.price}>{(item.discount || item.price) * amount}$</Typography>
      </div>
    </Card>
  )
}

export default ItemAdded;