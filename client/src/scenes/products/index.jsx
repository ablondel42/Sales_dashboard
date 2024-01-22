/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: '16px' }}
          color={theme.palette.secondary[200]}
          gutterBottom
        >
          Category: {category}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='primary'
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          View details
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>Id: {_id}</Typography>
          <Typography>Supply: {supply}</Typography>
          <Typography>Yearly sales: {stat[0].yearlySalesTotal}</Typography>
          <Typography>
            Yearly sold units: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box margin='1.5rem 2.5rem'>
      <Header title='PRODUCTS' subtitle='See your list of products.' />
      {data || !isLoading ? (
        <Box
          marginTop='20px'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          justifyContent='space-between'
          rowGap='20px'
          columnGap='1.33%'
          sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
        >
          {data.map((product) => {
            return (
              <Product
                key={product._id}
                _id={product._id}
                name={product.name}
                description={product.description}
                price={product.price}
                rating={product.rating}
                category={product.category}
                supply={product.supply}
                stat={product.stat}
              />
            );
          })}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
