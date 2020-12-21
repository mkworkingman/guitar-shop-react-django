import React from 'react';
import { Typography, Card, CardMedia, Box, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

const useStyles = makeStyles({
  product: {
    flex: '1 1 0px',
    margin: 0,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  productDiscount: {
    margin: theme.spacing(0, 0.75),
    '@media (max-width:735px)': {
      "&:nth-child(3)": {
        display: 'none'
      }
    },
    '@media (max-width:460px)': {
      "&:nth-child(2)": {
        display: 'none'
      }
    }
  },
  img: {
    width: 'auto',
    height: '100%',
    maxHeight: 200,
    flexShrink: 0,
    userSelect: 'none'
  },
  title: {
    width: '100%',
    margin: `${theme.spacing(2)}px 0`
  },
  discount: {
    textDecoration: 'line-through',
    fontSize: '0.9rem',
    color: '#d00000'
  },
});

const Item: React.FC<any> = ({item, currentUser, loadingChangedAdded, unauthAdded, changeItem, changeItemUnauth, discount}) => {
  const classes = useStyles();

  return (
    <Card className={discount ? `${classes.product} ${classes.productDiscount}` : classes.product} elevation={3}>
      <CardMedia
        className={classes.img}
        image={item.image
          ? 'http://127.0.0.1:8000/' + item.image
          : 'http://127.0.0.1:8000/uploads/no_image/not_found.png'}
        component='img'
      />

      <Box flexGrow='1' display='flex' alignItems='center' width="100%">
        <Typography gutterBottom variant="body1" align="center" className={classes.title}>
          {item.name}
        </Typography>
      </Box>

      <Box mb={0.75}>
        <Typography>
          <span className={item.discount && classes.discount}>{item.price}$</span>
          {item.discount && <span> {item.discount}$</span>}
        </Typography>
      </Box>

      {currentUser
        ? JSON.parse(currentUser.added)[item.id]
          ? <ButtonGroup color="primary" variant="contained" size="small">
            <Button onClick={() => changeItem(item.id, false)} disabled={loadingChangedAdded}>-</Button>
            <Button disabled={loadingChangedAdded}>{JSON.parse(currentUser.added)[item.id]}</Button>
            <Button onClick={() => changeItem(item.id, true)} disabled={loadingChangedAdded}>+</Button>
          </ButtonGroup>
          : <Button variant="contained" color="primary" size="small" onClick={() => changeItem(item.id, true)} disabled={loadingChangedAdded}>
            To Card
          </Button>
        : unauthAdded[item.id]
          ? <ButtonGroup color="primary" variant="contained" size="small">
            <Button onClick={() => changeItemUnauth(item.id, false)} disabled={loadingChangedAdded}>-</Button>
            <Button disabled={loadingChangedAdded}>{unauthAdded[item.id]}</Button>
            <Button onClick={() => changeItemUnauth(item.id, true)} disabled={loadingChangedAdded}>+</Button>
          </ButtonGroup>
          : <Button variant="contained" color="primary" size="small" onClick={() => changeItemUnauth(item.id, true)}>
            To Card
          </Button>
      }

    </Card>
  )
}

export default Item;