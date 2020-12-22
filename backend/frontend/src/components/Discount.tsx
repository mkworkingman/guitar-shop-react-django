import React, { useState, useEffect } from 'react';
import { Typography,  Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';
import { useQuery, gql, useMutation } from '@apollo/client';
import jwt from "jsonwebtoken";
import unauthAddedVar from '../index';
import Item from '../components/Item';

const useStyles = makeStyles({
  item: {
    flex: '1 1 0px',
    margin: theme.spacing(0, 0.75),
    padding: theme.spacing(1),
    maxWidth: 240,
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
    width: 'auto',
    height: '100%',
    maxHeight: 200,
    flexShrink: 0
  },
  discount: {
    textDecoration: 'line-through',
    fontSize: '0.9rem',
    color: '#d00000'
  },
  rating: {
    margin: theme.spacing(0.75, 0)
  },
  title: {
    width: '100%'
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
  const { loading, data } = useQuery(DISC);

  const CURRENT_USER = gql`{
    currentUser {
      id,
      username,
      email,
      added
    }
  }`;

  const { data: currentUser } = useQuery(CURRENT_USER);

  const CHANGE_ADDED = gql`
    mutation changeAdded($itemId: String!, $increment: Boolean!){
      changeAdded(itemId: $itemId, increment: $increment){
        token
      }
    }
  `;

  const [changeAdded, {loading: loadingChangedAdded, data: changedAdded}] = useMutation(CHANGE_ADDED);

  useEffect(() => {
    if (changedAdded) {
      localStorage.setItem('auth_token', changedAdded.changeAdded.token);
    }
  }, [changedAdded]);

  const changeItem = (id: string, increment: boolean) => {
    changeAdded({
      variables: {
        itemId: id,
        increment
      },
      update: (cache, {data}) => {
        cache.writeQuery({
          query: CURRENT_USER,
          data: {currentUser: {added: data}}
        });
      }
    })
  };

  const IS_LOGGED_IN = gql`
    query unauthAdded {
      unauthAdded @client
    }
  `;

  const {data: {unauthAdded}} = useQuery<any>(IS_LOGGED_IN);

  const changeItemUnauth = (id: string, increment: boolean) => {
    if (increment) {
      if (unauthAdded.hasOwnProperty(id)) {
        unauthAddedVar({...unauthAdded, [id]: unauthAdded[id] + 1});
      } else {
        unauthAddedVar({...unauthAdded, [id]: 1});
      }
    } else {
      if (unauthAdded[id] === 1) {
        const { [id]: remove, ...newUnauthAdded } = unauthAdded;
        unauthAddedVar(newUnauthAdded);
      } else {
        unauthAddedVar({...unauthAdded, [id]: unauthAdded[id] - 1});
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('unauth_added', jwt.sign(unauthAdded, 'myTestKey!noiceone'));
  }, [unauthAdded]);

  return (
    <div>
      <Typography variant="h5">
        Current Discount:
      </Typography>

      <Box display="flex" justifyContent='center' margin={theme.spacing(1.4, 0)}>

        { loading ? <CircularProgress /> :
          data.disc.slice(0, 3).map((item: any) =>
            <Item
              key={item.id}
              discount={true}
              item={item}
              currentUser={currentUser && currentUser.currentUser ? currentUser.currentUser : null}
              loadingChangedAdded={loadingChangedAdded}
              unauthAdded={unauthAdded}
              changeItem={changeItem}
              changeItemUnauth={changeItemUnauth}
            />
          )
        }
      </Box>
    </div>
  );
}

export default Discount;