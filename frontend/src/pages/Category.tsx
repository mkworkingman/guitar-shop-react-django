import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel, Slider, Card, CardMedia, Box, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import theme from '../theme';

import { useQuery, gql } from '@apollo/client';

const useStyles = makeStyles({
  category: {
    display: 'flex',
    padding: theme.spacing(1, 2)
  },
  properties: {
    flex: '0 0 192px',
    marginRight: theme.spacing(2)
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
    gridAutoRows: '250px',
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
    maxWidth: '200px',
    height: 'auto',
    width: '100%',
    flexShrink: 0
  },
  title: {
    width: '100%'
  }
});

const itemsInitial = [
    {
      img: process.env.PUBLIC_URL + '/img1.jpg',
      title: 'FENDER FA-125 DREADNOUGHT WALNUT',
      strings: 6,
      frets: 20,
      brand: 'Fender',
      orientation: 'right',
      price: 185.00,
      discount: 165.00
    },
    {
      img: process.env.PUBLIC_URL + '/img1.jpg',
      title: 'MARTINEZ W - 164 P / N',
      strings: 6,
      frets: 22,
      brand: 'Martinez',
      orientation: 'right',
      price: 150.00
    },
    {
      img: process.env.PUBLIC_URL + '/img1.jpg',
      title: 'Sigma DM12-1ST+',
      strings: 12,
      frets: 20,
      brand: 'Sigma',
      orientation: 'right',
      price: 150.00
    },
    {
      img: process.env.PUBLIC_URL + '/img1.jpg',
      title: 'FENDER Tim Armstrong Hellcat-LH',
      strings: 6,
      frets: 19,
      brand: 'Fender',
      orientation: 'left',
      price: 550.00
    }
  ]

interface ParamTypes {
  name: string;
}

// interface IIndexable<T = any> {
//   [key: string]: T,
// }

// interface IValues {
//   strings: {
//     6: boolean
//     12: boolean,
//     [key: string]: boolean
//   },
//   frets: {
//     19: boolean
//     20: boolean
//     22: boolean,
//     [key: string]: boolean
//   },
//   brand: {
//     Fender: boolean
//     Martinez: boolean
//     Sigma: boolean,
//     [key: string]: boolean
//   },
//   orientation: {
//     left: boolean
//     right: boolean,
//     [key: string]: boolean
//   },
//   price: number[]
// }

interface IValues {
  strings: {
    [key: number]: any
  },
  frets: {
    [key: number]: any
  },
  brand: {
    [key: string]: any
  },
  orientation: {
    [key: string]: any
  },
  price: number[]
}

const Category: React.FC = () => {
  const classes = useStyles();
  const { name } = useParams<ParamTypes>();

  const DISC = gql`
    {
      instrumentListType(inst: "${name}") {
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
  
  const [itemsgql, setItemsgql] = useState<any[]>([]);
  const [category, setCategory] = useState<IValues>({
    strings: {},
    frets: {},
    brand: {},
    orientation: {},
    price: []
  });

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

      console.log(value);

      setItemsgql(instrumentListType);
      setCategory(value);
    }
  }, [loading, data]);
  
  const [items, setItems] = useState([
    {
      title: 'FENDER FA-125 DREADNOUGHT WALNUT',
      strings: 6,
      frets: 20,
      brand: 'Fender',
      orientation: 'right',
      price: 185.00,
      discount: 165.00
    },
    {
      title: 'MARTINEZ W - 164 P / N',
      strings: 6,
      frets: 22,
      brand: 'Martinez',
      orientation: 'right',
      price: 150.00
    },
    {
      title: 'Sigma DM12-1ST+',
      strings: 12,
      frets: 20,
      brand: 'Sigma',
      orientation: 'right',
      price: 150.00
    },
    {
      title: 'FENDER Tim Armstrong Hellcat-LH',
      strings: 6,
      frets: 19,
      brand: 'Fender',
      orientation: 'left',
      price: 550.00
    }
  ]);

  const [value, setValue] = useState<any>({
    strings: {
      6: false,
      12: false
    },
    frets: {
      19: false,
      20: false,
      22: false
    },
    brand: {
      Fender: false,
      Martinez: false,
      Sigma: false
    },
    orientation: {
      left: false,
      right: false
    },
    price: [0, 550]
  });

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [property, propertyName] = e.target.name.split('_');

    setValue({
      ...value,
      [property]: {
        ...value[property],
        [propertyName]: e.target.checked
      }
    });
  };

  const handleChange = (e: any, newValue: number | number[]) => {
    setValue({
      ...value,
      price: newValue as number[]
    });
  };

  useEffect(() => {
    const strings: number[] = [];
    const frets: number[] = [];
    const brands: string[] = [];
    const orientation: string[] = [];

    for (const prop in value.strings) {
      if (value.strings[prop]) strings.push(Number(prop));
    }

    for (const prop in value.frets) {
      if (value.frets[prop]) frets.push(Number(prop));
    }

    for (const prop in value.brand) {
      if (value.brand[prop]) brands.push(prop);
    }

    for (const prop in value.orientation) {
      if (value.orientation[prop]) orientation.push(prop);
    }

    setItems(itemsInitial.filter(item => {
      if (strings.length > 0 && strings.indexOf(item.strings) === -1) return false;
      if (frets.length > 0 && frets.indexOf(item.frets) === -1) return false;
      if (brands.length > 0 && brands.indexOf(item.brand) === -1) return false;
      if (orientation.length > 0 && orientation.indexOf(item.orientation) === -1) return false;

      if (item.discount) {
        if (item.discount < value.price[0] || item.discount > value.price[1]) return false;
      } else {
        if (item.price < value.price[0] || item.price > value.price[1]) return false;
      }
      
      return item;
    }));
  }, [value]);

  if (name === 'acoustic' ||
      name === 'electric' ||
      name === 'electroacoustic' ||
      name === 'bass' ||
      name === 'acousticbass' ||
      name === 'ukulele' ||
      name === 'equipment' ||
      name === 'literature'
  ) {
    return (
      <Paper className={classes.category}>
        <div className={classes.properties}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Strings</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="6"
                labelPlacement="end"
                name="strings_6"
                checked={value.strings[6]}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="12"
                labelPlacement="end"
                name="strings_12"
                checked={value.strings[12]}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Frets</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="19"
                labelPlacement="end"
                name="frets_19"
                checked={value.frets[19]}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="20"
                labelPlacement="end"
                name="frets_20"
                checked={value.frets[20]}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="22"
                labelPlacement="end"
                name="frets_22"
                checked={value.frets[22]}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Brand</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="Fender"
                labelPlacement="end"
                name="brand_Fender"
                checked={value.brand.Fender}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="Martinez"
                labelPlacement="end"
                name="brand_Martinez"
                checked={value.brand.Martinez}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="Sigma"
                labelPlacement="end"
                name="brand_Sigma"
                checked={value.brand.Sigma}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Orientation</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="Left"
                labelPlacement="end"
                name="orientation_left"
                checked={value.orientation.left}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" onChange={checkboxChange} />}
                label="Right"
                labelPlacement="end"
                name="orientation_right"
                checked={value.orientation.right}
              />
            </AccordionDetails>
          </Accordion>

          <Paper className={classes.price}>
            <Typography>Price:</Typography>
            <Slider
              value={value.price}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={550}
              step={10}
            />
            <Typography gutterBottom>Min: {value.price[0]}$</Typography>
            <Typography>Max: {value.price[1]}$</Typography>
          </Paper>
          
        </div>

        <div className={classes.items}>
          {
            items.map((item, i) =>
              <Card className={classes.product} elevation={3} key={i}>
                <CardMedia
                  className={classes.img}
                  image={''}
                  component='img'
                />

                <Box flexGrow='1' display='flex' alignItems='center' width="100%">
                  <Typography gutterBottom variant="body1" align="center" className={classes.title}>
                    {item.title}
                  </Typography>
                </Box>

                <Box mb={0.75}>
                  <Typography>
                    <span>{item.price}$</span>
                    {item.discount && <span> {item.discount}$</span>}
                  </Typography>
                </Box>

                <Button variant="contained" color="primary" size="small">
                  To Card
                </Button>

              </Card>
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