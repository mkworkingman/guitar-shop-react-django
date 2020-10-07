import React, { useState, useEffect } from 'react';
import { Typography,  Box, Card, CardMedia, Button, CircularProgress  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';

import { useQuery, gql } from '@apollo/client';

const useStyles = makeStyles({
  item: {
    flex: '1 1 0px',
    margin: theme.spacing(0, 0.75),
    padding: theme.spacing(1),
    maxWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width:735px)': {
      "&:nth-child(4)": {
        display: 'none'
      }
    },
    '@media (max-width:550px)': {
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
    maxWidth: '200px',
    height: 'auto',
    width: '100%',
    flexShrink: 0
  },
  discount: {
    textDecoration: 'line-through',
    fontSize: '0.9rem',
    color: '#d00000'
  },
  rating: {
    margin: theme.spacing(0.75, 0)
  }
});

const Discount: React.FC = () => {
  const classes = useStyles(theme);

  const DISC = gql`
    {
      disc {
        id,
        name,
        instType,
        image,
        strings,
        frets,
        brand,
        orientation,
        price,
        discount
      }
    }
  `;
  const { loading, error, data } = useQuery(DISC);

  const [discountItems, setDiscountItems] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && data) {
      let n = 4;
      const { disc } = data;

      let result = [];
      let len = disc.length;
      let taken = new Array(len);

      if (n > len)
        setDiscountItems(disc);
        
      while (n--) {
        let x = Math.floor(Math.random() * len);
        const test = disc[x in taken ? taken[x] : x];

        result[n] = test;
        taken[x] = --len in taken ? taken[len] : len;
      }

      console.log(result);
      setDiscountItems(result);
    }
  }, [loading, data]);

  return (
    <div>
      <Typography variant="h5">
        Current Discount:
      </Typography>

      <Box display="flex" justifyContent='center' margin={theme.spacing(1.4, 0)}>

        { loading ? <CircularProgress /> :
          discountItems.map(item =>
            <Card className={classes.item} elevation={3} key={item.id}>
              <CardMedia
                className={classes.img}
                image={item.image || process.env.PUBLIC_URL + '/img1.jpg'}
                component='img'
              />

              <Box flexGrow='1' display='flex' alignItems='center' width="100%">
                <Typography gutterBottom variant="body1" align="center">
                  {item.name}
                </Typography>
              </Box>

              <Box mb={0.75}>
                <Typography>
                  <span className={classes.discount}>${item.price}</span> ${item.discount}
                </Typography>
              </Box>

              <Button variant="contained" color="primary" size="small">
                To Card
              </Button>

            </Card>
          )
        }
      </Box>
    </div>
  );
}

export default Discount;