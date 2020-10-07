import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel, Slider, Card, CardMedia, Box, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import theme from '../theme';

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
    gridAutoRows: '375px',
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
  },
  rating: {
    margin: theme.spacing(0.75, 0)
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

interface IIndexable<T = any> {
  [key: string]: T,
}

type IValues = IIndexable & {
  strings: {
    6: boolean
    12: boolean,
    [key: string]: boolean
  },
  frets: {
    19: boolean
    20: boolean
    22: boolean,
    [key: string]: boolean
  },
  brand: {
    Fender: boolean
    Martinez: boolean
    Sigma: boolean,
    [key: string]: boolean
  },
  orientation: {
    left: boolean
    right: boolean,
    [key: string]: boolean
  },
  price: number[]
}

const Category: React.FC = () => {
  const classes = useStyles();
  const { name } = useParams<ParamTypes>();

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

  const [value, setValue] = useState<IValues>({
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

                <div className={classes.rating}>
                  <svg
                    className="star1"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.374 6.8715C19.3584 6.82334 19.3285 6.78107 19.2883 6.75027C19.2481 6.71947 19.1996 6.70159 19.149 6.699L12.576 6.3705L10.2335 0.221498C10.1605 0.0269976 9.84 0.0269976 9.7665 0.221498L7.4235 6.3705L0.851 6.699C0.800396 6.70156 0.751767 6.71945 0.711556 6.75028C0.671346 6.78111 0.641452 6.82343 0.625836 6.87163C0.610221 6.91983 0.60962 6.97164 0.624115 7.02019C0.638609 7.06874 0.667514 7.11175 0.707 7.1435L5.8305 11.272L4.1125 17.624C4.085 17.724 4.123 17.8305 4.207 17.8915C4.24804 17.9211 4.29703 17.9376 4.34759 17.9389C4.39816 17.9403 4.44795 17.9263 4.4905 17.899L10 14.301L15.5095 17.899C15.5521 17.9265 15.602 17.9405 15.6527 17.9392C15.7033 17.9379 15.7524 17.9212 15.7935 17.8915C15.8345 17.8618 15.8655 17.8202 15.8823 17.7724C15.8991 17.7246 15.9009 17.6729 15.8875 17.624L14.169 11.272L19.2925 7.1435C19.3321 7.11178 19.3611 7.06877 19.3756 7.02019C19.3902 6.97161 19.3896 6.91975 19.374 6.8715V6.8715Z"
                    />
                  </svg>
                  <svg
                    className="star2"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.374 6.8715C19.3584 6.82334 19.3285 6.78107 19.2883 6.75027C19.2481 6.71947 19.1996 6.70159 19.149 6.699L12.576 6.3705L10.2335 0.221498C10.1605 0.0269976 9.84 0.0269976 9.7665 0.221498L7.4235 6.3705L0.851 6.699C0.800396 6.70156 0.751767 6.71945 0.711556 6.75028C0.671346 6.78111 0.641452 6.82343 0.625836 6.87163C0.610221 6.91983 0.60962 6.97164 0.624115 7.02019C0.638609 7.06874 0.667514 7.11175 0.707 7.1435L5.8305 11.272L4.1125 17.624C4.085 17.724 4.123 17.8305 4.207 17.8915C4.24804 17.9211 4.29703 17.9376 4.34759 17.9389C4.39816 17.9403 4.44795 17.9263 4.4905 17.899L10 14.301L15.5095 17.899C15.5521 17.9265 15.602 17.9405 15.6527 17.9392C15.7033 17.9379 15.7524 17.9212 15.7935 17.8915C15.8345 17.8618 15.8655 17.8202 15.8823 17.7724C15.8991 17.7246 15.9009 17.6729 15.8875 17.624L14.169 11.272L19.2925 7.1435C19.3321 7.11178 19.3611 7.06877 19.3756 7.02019C19.3902 6.97161 19.3896 6.91975 19.374 6.8715V6.8715Z"
                    />
                  </svg>
                  <svg
                    className="star3"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.374 6.8715C19.3584 6.82334 19.3285 6.78107 19.2883 6.75027C19.2481 6.71947 19.1996 6.70159 19.149 6.699L12.576 6.3705L10.2335 0.221498C10.1605 0.0269976 9.84 0.0269976 9.7665 0.221498L7.4235 6.3705L0.851 6.699C0.800396 6.70156 0.751767 6.71945 0.711556 6.75028C0.671346 6.78111 0.641452 6.82343 0.625836 6.87163C0.610221 6.91983 0.60962 6.97164 0.624115 7.02019C0.638609 7.06874 0.667514 7.11175 0.707 7.1435L5.8305 11.272L4.1125 17.624C4.085 17.724 4.123 17.8305 4.207 17.8915C4.24804 17.9211 4.29703 17.9376 4.34759 17.9389C4.39816 17.9403 4.44795 17.9263 4.4905 17.899L10 14.301L15.5095 17.899C15.5521 17.9265 15.602 17.9405 15.6527 17.9392C15.7033 17.9379 15.7524 17.9212 15.7935 17.8915C15.8345 17.8618 15.8655 17.8202 15.8823 17.7724C15.8991 17.7246 15.9009 17.6729 15.8875 17.624L14.169 11.272L19.2925 7.1435C19.3321 7.11178 19.3611 7.06877 19.3756 7.02019C19.3902 6.97161 19.3896 6.91975 19.374 6.8715V6.8715Z"
                    />
                  </svg>
                  <svg
                    className="star4"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.374 6.8715C19.3584 6.82334 19.3285 6.78107 19.2883 6.75027C19.2481 6.71947 19.1996 6.70159 19.149 6.699L12.576 6.3705L10.2335 0.221498C10.1605 0.0269976 9.84 0.0269976 9.7665 0.221498L7.4235 6.3705L0.851 6.699C0.800396 6.70156 0.751767 6.71945 0.711556 6.75028C0.671346 6.78111 0.641452 6.82343 0.625836 6.87163C0.610221 6.91983 0.60962 6.97164 0.624115 7.02019C0.638609 7.06874 0.667514 7.11175 0.707 7.1435L5.8305 11.272L4.1125 17.624C4.085 17.724 4.123 17.8305 4.207 17.8915C4.24804 17.9211 4.29703 17.9376 4.34759 17.9389C4.39816 17.9403 4.44795 17.9263 4.4905 17.899L10 14.301L15.5095 17.899C15.5521 17.9265 15.602 17.9405 15.6527 17.9392C15.7033 17.9379 15.7524 17.9212 15.7935 17.8915C15.8345 17.8618 15.8655 17.8202 15.8823 17.7724C15.8991 17.7246 15.9009 17.6729 15.8875 17.624L14.169 11.272L19.2925 7.1435C19.3321 7.11178 19.3611 7.06877 19.3756 7.02019C19.3902 6.97161 19.3896 6.91975 19.374 6.8715V6.8715Z"
                    />
                  </svg>
                  <svg
                    className="star5"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.374 6.8715C19.3584 6.82334 19.3285 6.78107 19.2883 6.75027C19.2481 6.71947 19.1996 6.70159 19.149 6.699L12.576 6.3705L10.2335 0.221498C10.1605 0.0269976 9.84 0.0269976 9.7665 0.221498L7.4235 6.3705L0.851 6.699C0.800396 6.70156 0.751767 6.71945 0.711556 6.75028C0.671346 6.78111 0.641452 6.82343 0.625836 6.87163C0.610221 6.91983 0.60962 6.97164 0.624115 7.02019C0.638609 7.06874 0.667514 7.11175 0.707 7.1435L5.8305 11.272L4.1125 17.624C4.085 17.724 4.123 17.8305 4.207 17.8915C4.24804 17.9211 4.29703 17.9376 4.34759 17.9389C4.39816 17.9403 4.44795 17.9263 4.4905 17.899L10 14.301L15.5095 17.899C15.5521 17.9265 15.602 17.9405 15.6527 17.9392C15.7033 17.9379 15.7524 17.9212 15.7935 17.8915C15.8345 17.8618 15.8655 17.8202 15.8823 17.7724C15.8991 17.7246 15.9009 17.6729 15.8875 17.624L14.169 11.272L19.2925 7.1435C19.3321 7.11178 19.3611 7.06877 19.3756 7.02019C19.3902 6.97161 19.3896 6.91975 19.374 6.8715V6.8715Z"
                    />
                  </svg>
                </div>

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