import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AddRounded,
  CloseRounded,
  RemoveRounded,
  SearchRounded,
  TuneRounded,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

import productsData from '../assets/coffee';
import { useNotification } from '../context/NotificationContext';
import { readJSON, writeJSON } from '../services/storage';

import AddCoffeeDialog from './AddCoffeeDialog';
import CoffeeCardSkeleton from './CoffeeCardSkeleton';
import { useCart } from './CartContext';

const CUSTOM_MENU_KEY = 'cuppacart_custom_menu';
const AVAILABILITY_KEY = 'cuppacart_availability';

const loadProducts = () => {
  const customProducts = readJSON(CUSTOM_MENU_KEY, []);
  return [...productsData, ...(Array.isArray(customProducts) ? customProducts : [])];
};

const Coffee = () => {
  const { addToCart, updateQuantity, cart } = useCart();
  const { showSuccess } = useNotification();
  const [products, setProducts] = useState(loadProducts);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeVendorFilters, setActiveVendorFilters] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [activeStates, setActiveStates] = useState(() => {
    const saved = readJSON(AVAILABILITY_KEY, {});
    return products.reduce(
      (result, product) => ({ ...result, [product.id]: saved[product.id] ?? true }),
      {}
    );
  });

  const vendors = useMemo(() => [...new Set(products.map(product => product.vendor))], [products]);
  const getCartQty = id => cart.find(item => item.id === id)?.quantity || 0;

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter(product => {
      const matchesVendor =
        activeVendorFilters.length === 0 || activeVendorFilters.includes(product.vendor);
      const matchesSearch =
        !normalizedQuery ||
        `${product.title} ${product.description} ${product.vendor}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesVendor && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'popular') return b.itemsSold - a.itemsSold;
      return a.id - b.id;
    });
  }, [activeVendorFilters, products, query, sort]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const toggleVendorFilter = vendor => {
    setActiveVendorFilters(current =>
      current.includes(vendor) ? current.filter(item => item !== vendor) : [...current, vendor]
    );
  };

  const handleAddCoffee = newCoffee => {
    const completeCoffee = { ...newCoffee, image: newCoffee.image || productsData[0].image };
    setProducts(current => [...current, completeCoffee]);
    setActiveStates(current => ({ ...current, [newCoffee.id]: true }));
    const customProducts = readJSON(CUSTOM_MENU_KEY, []);
    writeJSON(CUSTOM_MENU_KEY, [
      ...(Array.isArray(customProducts) ? customProducts : []),
      completeCoffee,
    ]);
    showSuccess(`“${newCoffee.title}” is now on the menu`);
  };

  const toggleAvailability = id => {
    setActiveStates(current => {
      const next = { ...current, [id]: !current[id] };
      writeJSON(AVAILABILITY_KEY, next);
      return next;
    });
  };

  return (
    <Box component="section" id="coffee" sx={{ py: { xs: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'flex-end' }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography
              variant="overline"
              color="secondary.main"
              fontWeight={800}
              letterSpacing=".14em"
            >
              CURATED COLLECTION
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{ fontSize: { xs: '2.5rem', md: '3.7rem' }, mt: 0.5 }}
            >
              Find your new favorite
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 560 }}>
              From bright single origins to smooth café classics, every selection is roasted for a
              distinct experience.
            </Typography>
          </Box>
          <Button variant="outlined" startIcon={<AddRounded />} onClick={() => setOpenDialog(true)}>
            Add menu item
          </Button>
        </Stack>

        <Box
          sx={{
            p: { xs: 2, md: 2.5 },
            mb: 4,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
            <TextField
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search coffee, tasting notes, or roaster"
              aria-label="Search the coffee menu"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
                ),
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setQuery('')} aria-label="Clear search">
                      <CloseRounded fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
            <FormControl sx={{ minWidth: { md: 190 } }}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                label="Sort by"
                value={sort}
                onChange={event => setSort(event.target.value)}
                startAdornment={<TuneRounded sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="popular">Most popular</MenuItem>
                <MenuItem value="price-low">Price: low to high</MenuItem>
                <MenuItem value="price-high">Price: high to low</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {!loading && vendors.length > 0 && (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
              <Chip
                label="All roasters"
                clickable
                color={activeVendorFilters.length === 0 ? 'primary' : 'default'}
                variant={activeVendorFilters.length === 0 ? 'filled' : 'outlined'}
                onClick={() => setActiveVendorFilters([])}
              />
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
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <CoffeeCardSkeleton key={index} />)
            : visibleProducts.map(product => {
                const quantity = getCartQty(product.id);
                const isActive = activeStates[product.id];
                return (
                  <Card
                    key={product.id}
                    id={product.title.toLowerCase().replace(/\s+/g, '-')}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'transform .25s ease, box-shadow .25s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        m: 1.25,
                        mb: 0,
                        overflow: 'hidden',
                        borderRadius: 2.5,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="225"
                        image={product.image}
                        alt={product.title}
                        sx={{
                          objectFit: 'cover',
                          filter: isActive ? 'none' : 'grayscale(1)',
                          opacity: isActive ? 1 : 0.7,
                        }}
                      />
                      <Chip
                        label={product.vendor}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: alpha('#fff', 0.9),
                          color: '#2a1b12',
                          backdropFilter: 'blur(8px)',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                      >
                        <Typography variant="h6" component="h3">
                          {product.title}
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ my: 1 }}>
                        <Rating value={4.8} precision={0.1} size="small" readOnly />
                        <Typography variant="caption" color="text.secondary">
                          ({product.itemsSold + 18})
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.65, mb: 2.5 }}
                      >
                        {product.description}
                      </Typography>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 'auto' }}
                      >
                        {quantity > 0 ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            sx={{ bgcolor: 'action.hover', borderRadius: 99, p: 0.5 }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label={`Remove one ${product.title}`}
                            >
                              <RemoveRounded fontSize="small" />
                            </IconButton>
                            <Typography
                              aria-live="polite"
                              fontWeight={800}
                              sx={{ minWidth: 24, textAlign: 'center' }}
                            >
                              {quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => addToCart(product)}
                              aria-label={`Add one more ${product.title}`}
                            >
                              <AddRounded fontSize="small" />
                            </IconButton>
                          </Stack>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => addToCart(product)}
                            disabled={!isActive}
                          >
                            {isActive ? 'Add to order' : 'Sold out'}
                          </Button>
                        )}
                        <Tooltip title="Menu availability">
                          <Switch
                            size="small"
                            checked={isActive}
                            onChange={() => toggleAvailability(product.id)}
                            inputProps={{ 'aria-label': `${product.title} availability` }}
                          />
                        </Tooltip>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
        </Box>

        {!loading && visibleProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5">No coffees match those filters</Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Try a different search or clear your roaster selection.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setQuery('');
                setActiveVendorFilters([]);
              }}
            >
              Clear filters
            </Button>
          </Box>
        )}

        <AddCoffeeDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onAdd={handleAddCoffee}
          vendors={vendors}
        />
      </Container>
    </Box>
  );
};

export default Coffee;
