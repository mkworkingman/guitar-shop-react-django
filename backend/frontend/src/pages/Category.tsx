import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel, Slider, Card, CardMedia, Box, Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import theme from '../theme';
import unauthAddedVar from '../index';
import Item from '../components/Item';
import jwt from "jsonwebtoken";

import { useQuery, gql, useMutation } from '@apollo/client';

const useStyles = makeStyles({
  category: {
    display: 'flex',
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  properties: {
    flex: '0 0 192px',
    marginRight: theme.spacing(2),
    height: 'fit-content',
    position: 'sticky',
    top: 88,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  propertiesMobile: {
    position: 'sticky',
    top: 64,
    zIndex: 100,
    marginBottom: 10,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      top: 56
    }
  },
  details: {
    flexDirection: 'column'
  },
  price: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2)
  },
  items: {
    flexGrow: 1,
    justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 210px))',
    gridAutoRows: 'min-content',
    gridGap: theme.spacing(1.5)
  },
  product: {
    flex: '1 1 0px',
    margin: 0,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  img: {
    width: 'auto',
    height: '100%',
    maxHeight: 200,
    flexShrink: 0
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

interface ParamTypes {
  name: string;
}

interface IValues {
  strings: {
    [key: number]: boolean
  },
  frets: {
    [key: number]: boolean
  },
  brand: {
    [key: string]: boolean
  },
  orientation: {
    [key: string]: boolean
  },
  price: number[],
  [key: string]: any
}

const Category: React.FC = () => {
  const classes = useStyles();
  const { name } = useParams<ParamTypes>();

  const INSTRUMENT_LIST_TYPE = gql`
    query instrumentListType($type: String!){
      instrumentListType(inst: $type){
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

  const { loading, data } = useQuery(INSTRUMENT_LIST_TYPE, {
    variables: { type: name }
  });
  
  const [instruments, setInstruments] = useState<any[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [filteredInstruments, setFilteredInstruments] = useState<any[]>([]);
  const [category, setCategory] = useState<IValues>({
    strings: {},
    frets: {},
    brand: {},
    orientation: {},
    price: []
  });

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [property, propertyName] = e.target.name.split('_');

    setCategory({
      ...category,
      [property]: {
        ...category[property],
        [propertyName]: e.target.checked
      }
    });
  };

  const sliderChange = (e: any, newValue: number | number[]) => {
    setCategory({
      ...category,
      price: newValue as number[]
    });
  };

  useEffect(() => {
    if (!loading && data) {
      const { instrumentListType } = data;

      const stringsInitial: number[] = [];
      const fretsInitial: number[] = [];
      const brandInitial: string[] = [];
      const orientationInitial: string[] = [];
      const priceInitial : number[] = [];

      const distinct = (value: any, index: number, self: any) => {
        return self.indexOf(value) === index;
      }

      for (const item of instrumentListType) {
        stringsInitial.push(item.strings);
        fretsInitial.push(item.frets);
        brandInitial.push(item.brand);
        orientationInitial.push(item.orientation);
        priceInitial.push(item.discount || item.price);
      }

      const strings: number[] = stringsInitial.filter(distinct);
      const frets: number[] = fretsInitial.filter(distinct);
      const brand: string[] = brandInitial.filter(distinct);
      const orientation: string[] = orientationInitial.filter(distinct);
      const priceMax = Math.max(...priceInitial);

      const value: IValues = {
        strings: {},
        frets: {},
        brand: {},
        orientation: {},
        price: [0, priceMax]
      };

      for (const key of strings) {
        value.strings[key] = false;
      }

      for (const key of frets) {
        value.frets[key] = false;
      }

      for (const key of brand) {
        value.brand[key] = false;
      }

      for (const key of orientation) {
        value.orientation[key] = false;
      }

      setInstruments(instrumentListType);
      setMaxPrice(priceMax);
      setFilteredInstruments(instrumentListType);
      setCategory(value);
    }
  }, [loading, data]);

  useEffect(() => {
    const strings: number[] = [];
    const frets: number[] = [];
    const brands: string[] = [];
    const orientation: string[] = [];

    for (const prop in category.strings) {
      if (category.strings[prop]) strings.push(Number(prop));
    }

    for (const prop in category.frets) {
      if (category.frets[prop]) frets.push(Number(prop));
    }

    for (const prop in category.brand) {
      if (category.brand[prop]) brands.push(prop);
    }

    for (const prop in category.orientation) {
      if (category.orientation[prop]) orientation.push(prop);
    }

    setFilteredInstruments(
      instruments.filter(item => {
        if (strings.length > 0 && strings.indexOf(item.strings) === -1) return false;
        if (frets.length > 0 && frets.indexOf(item.frets) === -1) return false;
        if (brands.length > 0 && brands.indexOf(item.brand) === -1) return false;
        if (orientation.length > 0 && orientation.indexOf(item.orientation) === -1) return false;

        if (item.discount) {
          if (item.discount < category.price[0] || item.discount > category.price[1]) return false;
        } else {
          if (item.price < category.price[0] || item.price > category.price[1]) return false;
        }
        
        return item;
      })
    );

  }, [category]);

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

  const properties: JSX.Element = (
    <>
      <Accordion disabled={instruments.length === 0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Strings</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {
            Object.entries(category.strings).map(([key, value]) => 
              <FormControlLabel
                key={key}
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label={key}
                labelPlacement="end"
                name={"strings_" + key}
                checked={value}
              />
            )
          }
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={instruments.length === 0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Frets</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {
            Object.entries(category.frets).map(([key, value]) => 
              <FormControlLabel
                key={key}
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label={key}
                labelPlacement="end"
                name={"frets_" + key}
                checked={value}
              />
            )
          }
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={instruments.length === 0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {
            Object.entries(category.brand).map(([key, value]) => 
              <FormControlLabel
                key={key}
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label={key}
                labelPlacement="end"
                name={"brand_" + key}
                checked={value}
              />
            )
          }
        </AccordionDetails>
      </Accordion>

      <Accordion disabled={instruments.length === 0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Orientation</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {
            Object.entries(category.orientation).map(([key, value]) => 
              <FormControlLabel
                key={key}
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label={key}
                labelPlacement="end"
                name={"orientation_" + key}
                checked={value}
              />
            )
          }
        </AccordionDetails>
      </Accordion>

      <Paper className={classes.price}>
        <Typography>Price:</Typography>
        <Slider
          value={category.price}
          onChange={sliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          step={10}
          disabled={instruments.length === 0}
        />
        <Typography gutterBottom>Min: {Boolean(category.price[0]) ? category.price[0] : 0}$</Typography>
        <Typography>Max: {isFinite(category.price[1]) ? category.price[1] : 0}$</Typography>
      </Paper>
    </>
  )

  if (name === 'classic' ||
      name === 'acoustic' ||
      name === 'electric' ||
      name === 'electroacoustic' ||
      name === 'bass' ||
      name === 'acousticbass' ||
      name === 'ukulele' ||
      name === 'balalaika'
  ) {
    return (
      <Paper className={classes.category}>

        <div className={classes.propertiesMobile}>
          <Accordion disabled={instruments.length === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Properties</Typography>
            </AccordionSummary>
            <AccordionDetails style={{flexDirection: 'column'}}>
              {properties}
            </AccordionDetails>
          </Accordion>
        </div>

        <div className={classes.properties}>
          {properties}
        </div>

        <div className={classes.items}>
          {
            filteredInstruments.map(item =>
              <Item
                key={item.id}
                item={item}
                currentUser={currentUser && currentUser.currentUser ? currentUser.currentUser : null}
                loadingChangedAdded={loadingChangedAdded}
                unauthAdded={unauthAdded}
                changeItem={changeItem}
                changeItemUnauth={changeItemUnauth}
              />
            )
          }
        </div>
      </Paper>
    )
  }

  return (
    <Redirect to="/" />
  );
}

export default Category;