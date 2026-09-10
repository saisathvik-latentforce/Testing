import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Switch,
  Rating,
  Stack,
  Fab,
  Grid,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'motion/react';

import productsData from '../assets/coffee';
import { useNotification } from '../context/NotificationContext';

import { useCart } from './CartContext';
import AddCoffeeDialog from './AddCoffeeDialog';
import CoffeeCardSkeleton from './CoffeeCardSkeleton';

const MotionCard = motion(Card);

const Coffee = () => {
  const { addToCart, updateQuantity, cart } = useCart();
  const { showSuccess } = useNotification();
  const getCartQty = id => cart.find(item => item.id === id)?.quantity || 0;

  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeVendorFilters, setActiveVendorFilters] = useState([]);

  const vendors = [...new Set(products.map(p => p.vendor))];
  const visibleProducts =
    activeVendorFilters.length === 0
      ? products
      : products.filter(p => activeVendorFilters.includes(p.vendor));

  const toggleVendorFilter = vendor => {
    setActiveVendorFilters(prev =>
      prev.includes(vendor) ? prev.filter(v => v !== vendor) : [...prev, vendor]
    );
  };

  const [activeStates, setActiveStates] = useState(
    productsData.reduce((acc, p) => {
      acc[p.id] = true;
      return acc;
    }, {})
  );

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleToggle = id => {
    setActiveStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddCoffee = newCoffee => {
    setProducts(prev => [...prev, newCoffee]);
    setActiveStates(prev => ({ ...prev, [newCoffee.id]: true }));
    showSuccess(`"${newCoffee.title}" added to the menu!`);
  };

  return (
    <Box sx={{ my: '5rem' }} id="coffee">
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        Featured Coffees
      </Typography>

      {!loading && vendors.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: 'wrap', justifyContent: 'center', px: 3 }}
        >
          {vendors.map(vendor => (
            <Chip
              key={vendor}
              label={vendor}
              clickable
              color={activeVendorFilters.includes(vendor) ? 'primary' : 'default'}
              variant={activeVendorFilters.includes(vendor) ? 'filled' : 'outlined'}
              onClick={() => toggleVendorFilter(vendor)}
            />
          ))}
        </Stack>
      )}

      <Grid container spacing={3} sx={{ padding: 3, justifyContent: 'center' }}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`skel-${i}`}>
                <CoffeeCardSkeleton />
              </Grid>
            ))
          : visibleProducts.map(product => {
              const isActive = activeStates[product.id];
              return (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <MotionCard
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layoutId={String(product.id)}
                    sx={{
                      maxWidth: 345,
                      textAlign: 'center',
                      padding: 2,
                      border: '2px solid transparent',
                      transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: t => `0 16px 36px -12px ${t.palette.primary.main}66`,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={product.image}
                      alt={product.title}
                      sx={{ borderRadius: 1 }}
                    />
                    <CardContent sx={{ minHeight: 200 }}>
                      <Typography variant="h6">{product.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>

                      <Box
                        sx={{
                          minHeight: 70,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {isActive && (
                          <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Typography variant="h6" color="primary">
                              ${product.price.toFixed(2)}
                            </Typography>
                            {getCartQty(product.id) > 0 ? (
                              <Stack direction="row" alignItems="center" spacing={0.5}>
                                <IconButton
                                  size="small"
                                  color="secondary"
                                  aria-label={`Remove one ${product.title}`}
                                  onClick={() =>
                                    updateQuantity(product.id, getCartQty(product.id) - 1)
                                  }
                                  sx={{ minWidth: 36, minHeight: 36 }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography
                                  variant="body1"
                                  aria-live="polite"
                                  sx={{ minWidth: 24, textAlign: 'center', fontWeight: 'bold' }}
                                >
                                  {getCartQty(product.id)}
                                </Typography>
                                <IconButton
                                  size="small"
                                  color="secondary"
                                  aria-label={`Add one more ${product.title}`}
                                  onClick={() => addToCart(product)}
                                  sx={{ minWidth: 36, minHeight: 36 }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            ) : (
                              <IconButton
                                color="secondary"
                                aria-label={`Add ${product.title} to cart`}
                                onClick={() => addToCart(product)}
                                sx={{
                                  border: '1px solid currentColor',
                                  borderRadius: 1,
                                  minWidth: 44,
                                  minHeight: 44,
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            )}
                          </Stack>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack direction="row" spacing={1} useFlexGap justifyContent="center">
                          <Chip size="small" label={product.vendor} variant="outlined" color="primary" />
                          <Chip
                            size="small"
                            label={isActive ? 'Active' : 'Out of Stock'}
                            color={isActive ? 'success' : 'default'}
                          />
                          <Rating defaultValue={4} size="small" readOnly />
                        </Stack>
                        <Box sx={{ flexGrow: 1 }} />
                        <Switch
                          checked={isActive}
                          onChange={() => handleToggle(product.id)}
                          inputProps={{ 'aria-label': `${product.title} availability toggle` }}
                        />
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>
              );
            })}
      </Grid>

      <Fab
        color="primary"
        aria-label="Add new coffee item"
        onClick={() => setOpenDialog(true)}
        size="medium"
        component={motion.button}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.9 }}
        sx={{ position: 'fixed', bottom: { xs: 80, sm: 32 }, right: 32 }}
      >
        <AddIcon />
      </Fab>

      <AddCoffeeDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddCoffee}
        vendors={vendors}
      />
    </Box>
  );
};

export default Coffee;
